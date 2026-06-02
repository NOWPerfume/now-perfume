import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  if (!process.env.BREVO_API_KEY) {
    console.error("[subscribe] Missing BREVO_API_KEY");
    return NextResponse.json({ success: false, error: "Missing BREVO_API_KEY" }, { status: 503 });
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

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: normalizedEmail,
      listIds: [3],
      updateEnabled: true,
    }),
  });

  // 201 = created, 204 = already exists (with updateEnabled)
  if (res.status === 201 || res.status === 204) {
    return NextResponse.json({ success: true });
  }

  // Brevo returns 400 with "Contact already exist" when contact exists without updateEnabled
  if (res.status === 400) {
    const data = (await res.json()) as { message?: string; code?: string };
    const msg = (data.message ?? "").toLowerCase();
    if (msg.includes("already exist") || msg.includes("duplicate") || data.code === "duplicate_parameter") {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }
    console.error("[subscribe] Brevo 400 error:", data);
    return NextResponse.json({ success: false, error: data.message ?? "Bad request" }, { status: 400 });
  }

  const errorData = (await res.json().catch(() => ({}))) as { message?: string };
  console.error("[subscribe] Brevo error:", res.status, errorData);
  return NextResponse.json({ success: false, error: errorData.message ?? "Failed to subscribe" }, { status: 500 });
}
