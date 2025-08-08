import { NextResponse } from 'next/server';

const PASSWORD = process.env.DOCS_PASSWORD || 'changeme';

export async function POST(req) {
  const { password } = await req.json();
  if (password === PASSWORD) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
