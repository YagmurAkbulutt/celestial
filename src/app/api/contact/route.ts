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

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
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
