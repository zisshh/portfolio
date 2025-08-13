import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDocsPassword } from '../../../lib/env.server';

const docsDir = path.join(process.cwd(), 'docs');

function sanitize(str) {
  return str.replace(/<script.*?>.*?<\/script>/gi, '');
}

export async function GET(req, { params }) {
  const { id } = params;
  const filePath = path.join(docsDir, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const doc = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return NextResponse.json(doc);
}

export async function POST(req, { params }) {
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
  const { id } = params;
  const { password, content, title, date } = await req.json();
  if (password !== secret) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const safeContent = sanitize(content || '');
  const doc = { id, title, date, content: safeContent };
  fs.writeFileSync(path.join(docsDir, `${id}.json`), JSON.stringify(doc, null, 2));
  return NextResponse.json({ success: true, doc });
}
