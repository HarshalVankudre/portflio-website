import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

// Basic, pragmatic email validation.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_TO_EMAIL = "harshalvankudre@gmail.com";
const DEFAULT_FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

// Email-safe font stacks for the Cinematic Noir templates.
const MONO_STACK =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Courier New', monospace";
const SANS_STACK =
  "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const SERIF_STACK = "Georgia, 'Times New Roman', serif";

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

  const invalid = NextResponse.json(
    { error: "Invalid input. Please check the form and try again." },
    { status: 400 }
  );

  try {
    let body: Record<string, unknown>;
    try {
      body = (await request.json()) ?? {};
    } catch {
      return invalid;
    }
    const { name, email, subject, message, company } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return invalid;
    }
    if (subject !== undefined && typeof subject !== "string") {
      return invalid;
    }
    if (company !== undefined && typeof company !== "string") {
      return invalid;
    }

    // Honeypot: the form hides this field, so any value means a bot.
    // Silently pretend success so the bot learns nothing.
    if (typeof company === "string" && company.length > 0) {
      return NextResponse.json({ success: true });
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
    if (!process.env.RESEND_FROM_EMAIL) {
      console.warn(
        "RESEND_FROM_EMAIL is not set — falling back to onboarding@resend.dev. " +
          "Deliverability is degraded; configure a verified sender domain in Resend."
      );
    }
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
        <div style="background: #060607; padding: 40px 16px;">
          <div style="max-width: 600px; margin: 0 auto;">
            <p style="margin: 0 0 16px; font-family: ${MONO_STACK}; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #CEFF00;">
              New inquiry &mdash; portfolio
            </p>
            <div style="background: #0c0c0e; border: 1px solid rgba(234,232,227,0.16); padding: 28px;">
              <p style="margin: 0 0 24px; font-family: ${SERIF_STACK}; font-size: 26px; line-height: 1.25; color: #EAE8E3;">
                ${safeSubject}
              </p>
              <p style="margin: 0 0 4px; font-family: ${MONO_STACK}; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #98968F;">
                From
              </p>
              <p style="margin: 0 0 20px; font-family: ${SANS_STACK}; font-size: 15px; line-height: 1.5; color: #EAE8E3;">
                ${safeName} &lt;${safeEmail}&gt;
              </p>
              <p style="margin: 0 0 4px; font-family: ${MONO_STACK}; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #98968F;">
                Message
              </p>
              <p style="white-space: pre-wrap; margin: 0; font-family: ${SANS_STACK}; font-size: 15px; line-height: 1.7; color: #EAE8E3;">
                ${safeMessage}
              </p>
            </div>
            <p style="margin: 16px 0 0; font-family: ${MONO_STACK}; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #98968F;">
              Reply to this email to answer directly
            </p>
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

    // Auto-reply to the visitor. Fire-and-forget: a failure here must
    // never turn an already-delivered notification into an error.
    try {
      const autoReply = await resend.emails.send({
        from: fromEmail,
        to: [email],
        replyTo: toEmail,
        subject: "Got your message — Harshal Vankudre",
        html: `
          <div style="background: #060607; padding: 40px 16px;">
            <div style="max-width: 600px; margin: 0 auto;">
              <p style="margin: 0 0 16px; font-family: ${MONO_STACK}; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #CEFF00;">
                Message received
              </p>
              <div style="background: #0c0c0e; border: 1px solid rgba(234,232,227,0.16); padding: 28px;">
                <p style="margin: 0 0 20px; font-family: ${SERIF_STACK}; font-size: 26px; line-height: 1.25; color: #EAE8E3;">
                  Thanks for reaching out.
                </p>
                <p style="margin: 0 0 16px; font-family: ${SANS_STACK}; font-size: 15px; line-height: 1.7; color: #EAE8E3;">
                  Your message &ldquo;${safeSubject}&rdquo; just landed in my inbox.
                  I usually reply within a day.
                </p>
                <p style="margin: 0; font-family: ${SANS_STACK}; font-size: 15px; line-height: 1.7; color: #98968F;">
                  If anything urgent comes up in the meantime, just reply to this email.
                </p>
              </div>
              <p style="margin: 16px 0 0; font-family: ${MONO_STACK}; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #98968F;">
                Harshal Vankudre
              </p>
            </div>
          </div>
        `,
      });
      if (autoReply.error) {
        console.warn("Auto-reply send failed:", autoReply.error);
      }
    } catch (autoReplyError) {
      console.warn("Auto-reply send failed:", autoReplyError);
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
