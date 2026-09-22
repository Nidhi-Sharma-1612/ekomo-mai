import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

let cachedTransport: Transporter | null = null;

/** Lazily constructed so builds/pages that never send mail don't require the env vars. */
function getTransport(): Transporter {
  if (cachedTransport) return cachedTransport;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !port || !user || !pass) {
    throw new Error(
      "Missing SMTP_HOST, SMTP_PORT, SMTP_USER, or SMTP_PASSWORD environment variable. Add them to .env.local."
    );
  }

  cachedTransport = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
  return cachedTransport;
}

export async function sendContactInquiry(fields: {
  name: string;
  email: string;
  property?: string;
  dates?: string;
  message: string;
}) {
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  if (!to) {
    throw new Error("Missing CONTACT_TO_EMAIL (or SMTP_USER) environment variable. Add it to .env.local.");
  }

  const transport = getTransport();

  await transport.sendMail({
    from: `"LahainaOceanfrontRentals Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: `"${fields.name}" <${fields.email}>`,
    subject: `New inquiry from ${fields.name}${fields.property ? ` — ${fields.property}` : ""}`,
    text: [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Property: ${fields.property || "Not specified"}`,
      `Preferred dates: ${fields.dates || "Not specified"}`,
      "",
      "Message:",
      fields.message,
    ].join("\n"),
    html: `
      <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
      <p><strong>Property:</strong> ${escapeHtml(fields.property || "Not specified")}</p>
      <p><strong>Preferred dates:</strong> ${escapeHtml(fields.dates || "Not specified")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(fields.message).replace(/\n/g, "<br />")}</p>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
