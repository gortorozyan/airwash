import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

function cleanValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = cleanValue(payload.name);
  const phone = cleanValue(payload.phone);
  const email = cleanValue(payload.email);
  const message = cleanValue(payload.message);

  if (!name || !phone || !message) {
    return NextResponse.json({ message: "Required fields are missing." }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const mailTo = process.env.CONTACT_EMAIL_TO ?? "airwash.armenia@gmail.com";

  if (!smtpUser || !smtpPass) {
    return NextResponse.json({ message: "Email service is not configured." }, { status: 500 });
  }

  const lines = [
    `\u0531\u0576\u0578\u0582\u0576: ${name}`,
    `\u0540\u0565\u057c\u0561\u056d\u0578\u057d: ${phone}`,
    `\u0537\u056c. \u0583\u0578\u057d\u057f\u0568: ${email || "-"}`,
    "",
    "\u0540\u0561\u0572\u0578\u0580\u0564\u0561\u0563\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576:",
    message
  ];

  const transporter = nodemailer.createTransport({
    auth: {
      pass: smtpPass,
      user: smtpUser
    },
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465
  });

  try {
    await transporter.sendMail({
      from: `"AirWash Website" <${smtpUser}>`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #101A24;">
          <p><strong>\u0531\u0576\u0578\u0582\u0576:</strong> ${escapeHtml(name)}</p>
          <p><strong>\u0540\u0565\u057c\u0561\u056d\u0578\u057d:</strong> ${escapeHtml(phone)}</p>
          <p><strong>\u0537\u056c. \u0583\u0578\u057d\u057f\u0568:</strong> ${escapeHtml(email || "-")}</p>
          <p><strong>\u0540\u0561\u0572\u0578\u0580\u0564\u0561\u0563\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
      replyTo: email || undefined,
      subject: "AirWash contact request",
      text: lines.join("\n"),
      to: mailTo
    });
  } catch {
    return NextResponse.json({ message: "Email could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ message: "Email sent." });
}
