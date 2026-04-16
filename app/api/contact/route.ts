import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, type, message, to } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: 실제 이메일 발송 연동 (Resend, SendGrid 등)
    // 현재는 요청을 받아서 로그만 남기고 성공 응답
    console.log("[Contact Inquiry]", { name, company, email, type, message, to });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
