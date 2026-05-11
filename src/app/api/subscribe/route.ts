import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.VERCEL_ENV === "production") {
      console.error("RESEND_API_KEY missing in production");
    }
    console.error("[subscribe] Missing RESEND_API_KEY");
    return NextResponse.json({ success: false, error: "Missing RESEND_API_KEY" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email } = body as { email?: string };

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const resend = new Resend(apiKey);

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.error("[subscribe] Missing RESEND_AUDIENCE_ID");
    return NextResponse.json({ success: false, error: "Missing RESEND_AUDIENCE_ID" }, { status: 503 });
  }

  try {
    await resend.contacts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      email: normalizedEmail,
      unsubscribed: false,
    });
    console.log("Added to audience:", normalizedEmail);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    // Contact already exists — treat as success
    if (message.toLowerCase().includes("already exists") || message.toLowerCase().includes("duplicate")) {
      console.log("Newsletter contact already exists in Resend Audience:", normalizedEmail);
      return NextResponse.json({ success: true });
    }
    console.error("[subscribe] Resend contacts.create error:", err);
    return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
