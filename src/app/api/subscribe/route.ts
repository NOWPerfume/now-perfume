import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const FALLBACK_EMAIL = "doriel@nowperfume.com";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, source, lang, perfume } = body as {
    email?: string;
    source?: string;
    lang?: string;
    perfume?: string;
  };

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Strategy 1: Add to Resend Audience (if RESEND_AUDIENCE_ID is set)
  if (AUDIENCE_ID) {
    try {
      await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email: normalizedEmail,
        unsubscribed: false,
      });
    } catch (err: unknown) {
      // If contact already exists, that's fine — treat as success
      const message = err instanceof Error ? err.message : String(err);
      if (!message.toLowerCase().includes("already exists") && !message.toLowerCase().includes("duplicate")) {
        console.error("[subscribe] Resend audience error:", err);
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
      }
    }
  } else {
    // Strategy 2: Fallback — send a notification email
    try {
      await resend.emails.send({
        from: "NOW Perfume <onboarding@resend.dev>",
        to: FALLBACK_EMAIL,
        subject: `Nouvelle inscription newsletter — ${source ?? "site"}`,
        html: `<p>Un nouvel email s'est inscrit via <strong>${source ?? "site"}</strong>.</p>
               <p><strong>Email :</strong> ${normalizedEmail}</p>
               ${lang ? `<p><strong>Langue :</strong> ${lang}</p>` : ""}
               ${perfume ? `<p><strong>Parfum :</strong> ${perfume}</p>` : ""}`,
      });
    } catch (err) {
      console.error("[subscribe] Resend fallback email error:", err);
      return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
