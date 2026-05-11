import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
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

  // Auto-discover the first available audience so configuration stays minimal.
  const { data: audiencesResponse, error: audiencesError } = await resend.audiences.list();
  if (audiencesError) {
    console.error("[subscribe] Resend audiences.list error:", audiencesError);
    return NextResponse.json({ success: false, error: "Unable to list Resend audiences" }, { status: 502 });
  }

  const audienceCandidates =
    Array.isArray(audiencesResponse)
      ? audiencesResponse
      : Array.isArray((audiencesResponse as { data?: unknown })?.data)
        ? ((audiencesResponse as { data: unknown[] }).data)
        : [];

  const firstAudience = audienceCandidates[0] as { id?: string } | undefined;
  const audienceId = firstAudience?.id;

  if (!audienceId) {
    console.error("[subscribe] Missing RESEND_AUDIENCE_ID");
    return NextResponse.json({ success: false, error: "Missing RESEND_AUDIENCE_ID" }, { status: 503 });
  }

  try {
    await resend.contacts.create({
      audienceId,
      email: normalizedEmail,
      unsubscribed: false,
    });
    console.log("Newsletter saved to Resend Audience:", normalizedEmail);
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
