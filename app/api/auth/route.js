import { NextResponse } from 'next/server';
import { getDocsPassword } from '../../lib/env.server';

export async function POST(req) {
  const { password } = await req.json();
  const secret = getDocsPassword();
  if (secret === '__UNSET__') {
    return NextResponse.json(
      {
        ok: false,
        code: 'E_ENV',
        message: 'DOCS_ADMIN_PASSWORD not configured on server.',
      },
      { status: 500 }
    );
  }
  if (password === secret) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
