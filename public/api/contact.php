<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$configPaths = [
    dirname(__DIR__, 3) . '/mail-config.php',
    dirname(__DIR__, 2) . '/mail-config.php',
];

foreach ($configPaths as $configPath) {
    if (is_readable($configPath)) {
        require_once $configPath;
        break;
    }
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function config_value(string $constant, string $envName, string $default = ''): string
{
    if (defined($constant)) {
        $value = constant($constant);
        return is_scalar($value) ? trim((string) $value) : $default;
    }

    $value = getenv($envName);
    return $value === false ? $default : trim($value);
}

function config_bool(string $constant, string $envName, bool $default = false): bool
{
    $value = strtolower(config_value($constant, $envName, $default ? 'true' : 'false'));

    return in_array($value, ['1', 'true', 'yes', 'on'], true);
}

function debug_enabled(): bool
{
    return config_bool('CONTACT_FORM_DEBUG', 'CONTACT_FORM_DEBUG', false);
}

function trim_string($value, int $maxLength = 5000): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = trim($value);

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

function sanitize_header(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function encode_header(string $value): string
{
    $value = sanitize_header($value);

    if ($value === '') {
        return '';
    }

    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function mailbox(string $name, string $email): string
{
    $name = sanitize_header($name);
    $email = sanitize_header($email);

    if ($name === '') {
        return '<' . $email . '>';
    }

    return encode_header($name) . ' <' . $email . '>';
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function normalize_crlf(string $value): string
{
    return (string) preg_replace("/\r\n|\r|\n/", "\r\n", $value);
}

function dot_stuff(string $value): string
{
    return (string) preg_replace('/^\./m', '..', normalize_crlf($value));
}

function smtp_read($socket): string
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;

        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }

    return $response;
}

function smtp_expect($socket, array $codes, string $context): string
{
    $response = smtp_read($socket);
    $code = (int) substr($response, 0, 3);

    if (!in_array($code, $codes, true)) {
        throw new RuntimeException($context . ' SMTP response: ' . trim($response));
    }

    return $response;
}

function smtp_command($socket, string $command, array $codes, string $context): string
{
    fwrite($socket, $command . "\r\n");

    return smtp_expect($socket, $codes, $context);
}

function smtp_send_mail(
    string $host,
    int $port,
    bool $secure,
    bool $startTls,
    string $username,
    string $password,
    string $fromEmail,
    string $toEmail,
    string $message
): void {
    $scheme = $secure ? 'ssl' : 'tcp';
    $socket = stream_socket_client(
        $scheme . '://' . $host . ':' . $port,
        $errno,
        $errstr,
        20,
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        throw new RuntimeException('Could not connect to SMTP server: ' . $errstr . ' (' . $errno . ')');
    }

    stream_set_timeout($socket, 20);

    try {
        $serverName = $_SERVER['SERVER_NAME'] ?? 'localhost';
        $ehloName = preg_replace('/[^a-zA-Z0-9.-]/', '', $serverName) ?: 'localhost';

        smtp_expect($socket, [220], 'SMTP server did not send a greeting.');
        smtp_command($socket, 'EHLO ' . $ehloName, [250], 'SMTP EHLO failed.');

        if ($startTls) {
            smtp_command($socket, 'STARTTLS', [220], 'SMTP STARTTLS failed.');

            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('SMTP TLS negotiation failed.');
            }

            smtp_command($socket, 'EHLO ' . $ehloName, [250], 'SMTP EHLO after TLS failed.');
        }

        smtp_command($socket, 'AUTH LOGIN', [334], 'SMTP auth initialization failed.');
        smtp_command($socket, base64_encode($username), [334], 'SMTP username rejected.');
        smtp_command($socket, base64_encode($password), [235], 'SMTP password rejected.');
        smtp_command($socket, 'MAIL FROM:<' . $fromEmail . '>', [250], 'SMTP sender rejected.');
        smtp_command($socket, 'RCPT TO:<' . $toEmail . '>', [250, 251], 'SMTP recipient rejected.');
        smtp_command($socket, 'DATA', [354], 'SMTP DATA command failed.');
        fwrite($socket, dot_stuff($message) . "\r\n.\r\n");
        smtp_expect($socket, [250], 'SMTP message body rejected.');
        fwrite($socket, "QUIT\r\n");
    } finally {
        fclose($socket);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    respond(204, []);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    respond(200, ['message' => 'Contact endpoint is running.']);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

function request_body(): array
{
    if (!empty($_POST)) {
        return $_POST;
    }

    $rawBody = (string) file_get_contents('php://input');
    $jsonBody = json_decode($rawBody, true);

    if (is_array($jsonBody)) {
        return $jsonBody;
    }

    $parsedBody = [];
    parse_str($rawBody, $parsedBody);

    return is_array($parsedBody) ? $parsedBody : [];
}

$body = request_body();

if ($body === []) {
    respond(400, ['error' => 'Invalid request payload.']);
}

$fullName = trim_string($body['fullName'] ?? '', 160);
$company = trim_string($body['company'] ?? '', 160);
$email = trim_string($body['email'] ?? '', 254);
$service = trim_string($body['service'] ?? '', 160);
$message = trim_string($body['message'] ?? '', 5000);

if ($fullName === '' || $email === '' || $message === '') {
    respond(400, ['error' => 'Name, email, and message are required.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['error' => 'Please provide a valid email address.']);
}

$smtpHost = config_value('SMTP_HOST', 'SMTP_HOST');
$smtpPort = (int) config_value('SMTP_PORT', 'SMTP_PORT', '465');
$smtpSecure = config_bool('SMTP_SECURE', 'SMTP_SECURE', $smtpPort === 465);
$smtpStartTls = config_bool('SMTP_STARTTLS', 'SMTP_STARTTLS', !$smtpSecure && $smtpPort === 587);
$smtpUser = config_value('SMTP_USER', 'SMTP_USER');
$smtpPass = config_value('SMTP_PASS', 'SMTP_PASS');
$toEmail = config_value('CONTACT_FORM_TO_EMAIL', 'CONTACT_FORM_TO_EMAIL', $smtpUser);
$fromEmail = config_value('CONTACT_FORM_FROM_EMAIL', 'CONTACT_FORM_FROM_EMAIL', $smtpUser);

if (
    $smtpHost === '' ||
    $smtpUser === '' ||
    $smtpPass === '' ||
    !filter_var($toEmail, FILTER_VALIDATE_EMAIL) ||
    !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)
) {
    $payload = ['error' => 'Contact form is not configured yet.'];

    if (debug_enabled()) {
        $payload['debug'] = [
            'smtp_host_present' => $smtpHost !== '',
            'smtp_user_present' => $smtpUser !== '',
            'smtp_pass_present' => $smtpPass !== '',
            'to_email_valid' => filter_var($toEmail, FILTER_VALIDATE_EMAIL) !== false,
            'from_email_valid' => filter_var($fromEmail, FILTER_VALIDATE_EMAIL) !== false,
            'config_paths' => $configPaths,
        ];
    }

    respond(500, $payload);
}

$serviceLabel = $service !== '' ? $service : 'General Inquiry';
$subject = 'Website Contact - ' . $serviceLabel;
$submittedAt = (new DateTimeImmutable('now', new DateTimeZone('Europe/Istanbul')))
    ->format('d M Y H:i T');
$text = implode("\n", [
    'Name: ' . $fullName,
    'Company / Vessel: ' . ($company !== '' ? $company : '-'),
    'Email: ' . $email,
    'Service: ' . $serviceLabel,
    '',
    'Message:',
    $message,
]);
$html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>' .
    escape_html($subject) .
    '</title></head><body style="margin:0;padding:0;background:#eef4f8;font-family:Arial,Helvetica,sans-serif;color:#10263f;">' .
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#eef4f8;margin:0;padding:28px 12px;"><tr><td align="center">' .
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #d8e3ec;border-radius:8px;overflow:hidden;">' .
    '<tr><td style="background:#0b2e49;padding:28px 32px;color:#ffffff;">' .
    '<p style="margin:0 0 10px;color:#9fc6df;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Website Contact Form</p>' .
    '<h1 style="margin:0;font-size:24px;line-height:1.3;">' . escape_html($serviceLabel) . '</h1>' .
    '<p style="margin:12px 0 0;color:#d6e6f0;font-size:14px;line-height:1.6;">Submitted ' . escape_html($submittedAt) . '</p>' .
    '</td></tr><tr><td style="padding:28px 32px;">' .
    '<p><strong>Name:</strong> ' . escape_html($fullName) . '</p>' .
    '<p><strong>Email:</strong> <a href="mailto:' . escape_html($email) . '">' . escape_html($email) . '</a></p>' .
    '<p><strong>Company / Vessel:</strong> ' . escape_html($company !== '' ? $company : '-') . '</p>' .
    '<p><strong>Service:</strong> ' . escape_html($serviceLabel) . '</p>' .
    '<hr style="border:0;border-top:1px solid #d8e3ec;margin:24px 0;">' .
    '<p style="margin:0 0 12px;color:#587089;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Message</p>' .
    '<div style="border:2px solid #0b2e49;border-radius:8px;padding:20px 22px;font-size:16px;line-height:1.7;">' .
    nl2br(escape_html($message), false) .
    '</div></td></tr></table></td></tr></table></body></html>';
$boundary = 'celestial-' . bin2hex(random_bytes(16));
$headers = [
    'Date: ' . date(DATE_RFC2822),
    'From: ' . mailbox('Celestial Website', $fromEmail),
    'To: ' . mailbox('Celestial Agency Desk', $toEmail),
    'Reply-To: ' . mailbox($fullName, $email),
    'Subject: ' . encode_header($subject),
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'X-Mailer: Celestial Contact Form',
];
$emailMessage = implode("\r\n", $headers) .
    "\r\n\r\n--" . $boundary .
    "\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n" .
    normalize_crlf($text) .
    "\r\n--" . $boundary .
    "\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n" .
    normalize_crlf($html) .
    "\r\n--" . $boundary . "--";

try {
    smtp_send_mail(
        $smtpHost,
        $smtpPort,
        $smtpSecure,
        $smtpStartTls,
        $smtpUser,
        $smtpPass,
        $fromEmail,
        $toEmail,
        $emailMessage
    );
} catch (Throwable $exception) {
    error_log('Celestial contact form mail failed: ' . $exception->getMessage());

    $payload = ['error' => 'Message could not be sent. Please try again.'];

    if (debug_enabled()) {
        $payload['debug'] = [
            'message' => $exception->getMessage(),
            'smtp_host' => $smtpHost,
            'smtp_port' => $smtpPort,
            'smtp_secure' => $smtpSecure,
            'smtp_starttls' => $smtpStartTls,
            'from_email' => $fromEmail,
            'to_email' => $toEmail,
        ];
    }

    respond(500, $payload);
}

respond(200, ['message' => 'Your message has been sent successfully.']);
