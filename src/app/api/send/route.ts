import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

// Basic, pragmatic email validation.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || "No subject");
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <contact@vankudre.com>",
      to: ["harshalvankudre@gmail.com"],
      replyTo: email,
      subject: subject || `New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="background: #FFE500; padding: 20px; border: 3px solid #000; margin-bottom: 20px;">
            New Contact Form Submission
          </h2>
          <div style="border: 3px solid #000; padding: 20px; background: #fff;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <hr style="border: 1px solid #000; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
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
