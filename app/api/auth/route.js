import { NextResponse } from 'next/server';

// Fail fast if the admin password is missing
if (!process.env.DOCS_ADMIN_PASSWORD) {
  console.error('DOCS_ADMIN_PASSWORD not set');
  process.exit(1);
}

const PASSWORD = process.env.DOCS_ADMIN_PASSWORD;

export async function POST(req) {
  const { password } = await req.json();
  if (password === PASSWORD) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
