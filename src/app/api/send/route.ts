import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

// Basic, pragmatic email validation.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_TO_EMAIL = "harshalvankudre@gmail.com";
const DEFAULT_FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { ok, retryAfter } = rateLimit(`send:${ip}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const { name, email, subject, message } = await request.json();

    const invalid = NextResponse.json(
      { error: "Invalid input. Please check the form and try again." },
      { status: 400 }
    );

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      (subject !== undefined && typeof subject !== "string")
    ) {
      return invalid;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      return invalid;
    }

    if (!EMAIL_REGEX.test(email)) {
      return invalid;
    }

    if (
      name.length > 100 ||
      email.length > 200 ||
      (subject !== undefined && subject.length > 150) ||
      message.length > 5000
    ) {
      return invalid;
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please email me directly at harshalvankudre@gmail.com.",
          code: "missing_resend_key",
        },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL || DEFAULT_TO_EMAIL;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || "No subject");
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: subject || `New message from ${name}`,
      html: `
        <div style="font-family: 'IBM Plex Mono', 'Courier New', monospace; max-width: 600px; margin: 0 auto; background: #0a0b0d; padding: 24px; color: #e8e6e2;">
          <p style="margin: 0 0 16px; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #ff5c00; border-bottom: 1px solid rgba(232,230,226,0.16); padding-bottom: 12px;">
            MSG // New Contact Form Submission
          </p>
          <div style="border: 1px solid rgba(232,230,226,0.16); padding: 20px; background: #101216;">
            <p style="margin: 0 0 8px;"><strong style="color: #9ba0a6;">Name:</strong> ${safeName}</p>
            <p style="margin: 0 0 8px;"><strong style="color: #9ba0a6;">Email:</strong> ${safeEmail}</p>
            <p style="margin: 0;"><strong style="color: #9ba0a6;">Subject:</strong> ${safeSubject}</p>
            <hr style="border: none; border-top: 1px solid rgba(232,230,226,0.16); margin: 20px 0;" />
            <p style="margin: 0 0 8px;"><strong style="color: #9ba0a6;">Message:</strong></p>
            <p style="white-space: pre-wrap; margin: 0;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error sending email:", error);
      return NextResponse.json(
        {
          error:
            "Email service could not send this message. Please email me directly at harshalvankudre@gmail.com.",
          code: "resend_send_failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
