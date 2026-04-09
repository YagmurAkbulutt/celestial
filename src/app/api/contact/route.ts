import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { contactFormRecipientEmail } from "@/lib/contact";

export const runtime = "nodejs";

type ContactRequestBody = {
  fullName?: string;
  company?: string;
  email?: string;
  service?: string;
  message?: string;
};

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function formatHtmlMessage(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const fullName = normalizeValue(body.fullName);
  const company = normalizeValue(body.company);
  const email = normalizeValue(body.email);
  const service = normalizeValue(body.service);
  const message = normalizeValue(body.message);

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const smtpSecure =
    process.env.SMTP_SECURE === undefined
      ? smtpPort === 465
      : process.env.SMTP_SECURE === "true";

  if (!smtpHost || !smtpUser || !smtpPass) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const toEmail = process.env.CONTACT_FORM_TO_EMAIL ?? contactFormRecipientEmail;
  const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL ?? smtpUser;
  const subject = service
    ? `Website Contact - ${service}`
    : "Website Contact - General Inquiry";

  const text = [
    `Name: ${fullName}`,
    `Company / Vessel: ${company || "-"}`,
    `Email: ${email}`,
    `Service: ${service || "General Inquiry"}`,
    "",
    "Message:",
    message,
  ].join("\n");
  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Istanbul",
  }).format(new Date());
  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(subject)}</title>
      </head>
      <body style="margin:0; padding:0; background:#eef4f8; font-family:Arial, Helvetica, sans-serif; color:#10263f;">
        <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
          New message from ${escapeHtml(fullName)} via the Celestial Ship Agency contact form.
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%; background:#eef4f8; margin:0; padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%; max-width:640px; background:#ffffff; border:1px solid #d8e3ec; border-radius:8px; overflow:hidden; box-shadow:0 16px 36px rgba(16,38,63,0.12);">
                <tr>
                  <td style="background:#0b2e49; padding:28px 32px;">
                    <p style="margin:0 0 10px; color:#9fc6df; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">
                      Website Contact Form
                    </p>
                    <h1 style="margin:0; color:#ffffff; font-size:24px; line-height:1.3; font-weight:700;">
                      ${escapeHtml(service || "General Inquiry")}
                    </h1>
                    <p style="margin:12px 0 0; color:#d6e6f0; font-size:14px; line-height:1.6;">
                      Submitted ${escapeHtml(submittedAt)} Turkey time
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 8px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%; border-collapse:separate; border-spacing:0 12px;">
                      <tr>
                        <td style="width:34%; padding:14px 16px; background:#f4f8fb; border:1px solid #d8e3ec; border-right:0; border-radius:8px 0 0 8px; color:#587089; font-size:12px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase;">
                          Name
                        </td>
                        <td style="padding:14px 16px; background:#f4f8fb; border:1px solid #d8e3ec; border-left:0; border-radius:0 8px 8px 0; color:#10263f; font-size:15px; font-weight:700;">
                          ${escapeHtml(fullName)}
                        </td>
                      </tr>
                      <tr>
                        <td style="width:34%; padding:14px 16px; background:#f4f8fb; border:1px solid #d8e3ec; border-right:0; border-radius:8px 0 0 8px; color:#587089; font-size:12px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase;">
                          Email
                        </td>
                        <td style="padding:14px 16px; background:#f4f8fb; border:1px solid #d8e3ec; border-left:0; border-radius:0 8px 8px 0; color:#10263f; font-size:15px; font-weight:700;">
                          <a href="mailto:${escapeHtml(email)}" style="color:#0b6ea8; text-decoration:none;">${escapeHtml(email)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:34%; padding:14px 16px; background:#f4f8fb; border:1px solid #d8e3ec; border-right:0; border-radius:8px 0 0 8px; color:#587089; font-size:12px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase;">
                          Company / Vessel
                        </td>
                        <td style="padding:14px 16px; background:#f4f8fb; border:1px solid #d8e3ec; border-left:0; border-radius:0 8px 8px 0; color:#10263f; font-size:15px; font-weight:700;">
                          ${escapeHtml(company || "-")}
                        </td>
                      </tr>
                      <tr>
                        <td style="width:34%; padding:14px 16px; background:#f4f8fb; border:1px solid #d8e3ec; border-right:0; border-radius:8px 0 0 8px; color:#587089; font-size:12px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase;">
                          Service
                        </td>
                        <td style="padding:14px 16px; background:#f4f8fb; border:1px solid #d8e3ec; border-left:0; border-radius:0 8px 8px 0; color:#10263f; font-size:15px; font-weight:700;">
                          ${escapeHtml(service || "General Inquiry")}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 32px 32px;">
                    <p style="margin:0 0 12px; color:#587089; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">
                      Message
                    </p>
                    <div style="background:#ffffff; border:2px solid #0b2e49; border-radius:8px; padding:20px 22px; color:#10263f; font-size:16px; line-height:1.7; font-weight:500; white-space:normal;">
                      ${formatHtmlMessage(message)}
                    </div>
                    <p style="margin:20px 0 0; color:#587089; font-size:13px; line-height:1.6;">
                      Reply directly to this email to contact ${escapeHtml(fullName)}.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch {
    return NextResponse.json(
      { error: "Message could not be sent. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Your message has been sent successfully.",
  });
}
