import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("RESEND_AUDIENCE_ID:", process.env.RESEND_AUDIENCE_ID);

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
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { email } = body as { email?: string };

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  console.log("Trying to add contact:", normalizedEmail);

  const resend = new Resend(apiKey);

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.error("[subscribe] Missing RESEND_AUDIENCE_ID");
    return NextResponse.json({ success: false, error: "Missing RESEND_AUDIENCE_ID" }, { status: 503 });
  }

  try {
    const { data, error } = await resend.contacts.create({
      audienceId,
      email: normalizedEmail,
      unsubscribed: false,
    });

    if (error) {
      const message = JSON.stringify(error).toLowerCase();
      // Contact already exists — treat as success
      if (message.includes("already exists") || message.includes("duplicate")) {
        console.log("Newsletter contact already exists in Resend Audience:", normalizedEmail);
        return NextResponse.json({ success: true });
      }

      if (
        (message.includes("audience") && message.includes("not found")) ||
        message.includes("invalid audience") ||
        message.includes("invalid audience_id")
      ) {
        console.error("Resend subscribe error:", error);
        console.error("[subscribe] Invalid RESEND_AUDIENCE_ID");
        return NextResponse.json({ success: false, error: "Invalid RESEND_AUDIENCE_ID" }, { status: 500 });
      }

      if (
        message.includes("restricted") ||
        message.includes("only send emails") ||
        message.includes("unauthorized") ||
        message.includes("forbidden")
      ) {
        console.error("Resend subscribe error:", error);
        console.error("[subscribe] RESEND_API_KEY lacks Contacts/Audience permissions");
        return NextResponse.json({ success: false, error: "RESEND_API_KEY lacks Contacts permissions" }, { status: 500 });
      }

      console.error("Resend subscribe error:", error);
      return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
    }

    if (!data) {
      console.error("[subscribe] Resend contacts.create returned no data");
      return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
    }

    console.log("Added to audience:", normalizedEmail);
  } catch (err) {
    const message = err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
    // Contact already exists — treat as success
    if (message.includes("already exists") || message.includes("duplicate")) {
      console.log("Newsletter contact already exists in Resend Audience:", normalizedEmail);
      return NextResponse.json({ success: true });
    }

    if (
      (message.includes("audience") && message.includes("not found")) ||
      message.includes("invalid audience") ||
      message.includes("invalid audience_id")
    ) {
      console.error("Resend subscribe error:", err);
      console.error("[subscribe] Invalid RESEND_AUDIENCE_ID");
      return NextResponse.json({ success: false, error: "Invalid RESEND_AUDIENCE_ID" }, { status: 500 });
    }

    if (
      message.includes("restricted") ||
      message.includes("only send emails") ||
      message.includes("unauthorized") ||
      message.includes("forbidden")
    ) {
      console.error("Resend subscribe error:", err);
      console.error("[subscribe] RESEND_API_KEY lacks Contacts/Audience permissions");
      return NextResponse.json({ success: false, error: "RESEND_API_KEY lacks Contacts permissions" }, { status: 500 });
    }

    console.error("Resend subscribe error:", err);
    return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
