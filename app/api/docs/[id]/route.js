import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const docsDir = path.join(process.cwd(), 'docs');

// Fail fast if the admin password is missing
if (!process.env.DOCS_ADMIN_PASSWORD) {
  console.error('DOCS_ADMIN_PASSWORD not set');
  process.exit(1);
}

const PASSWORD = process.env.DOCS_ADMIN_PASSWORD;

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
  const { id } = params;
  const { password, content, title, date } = await req.json();
  if (password !== PASSWORD) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const safeContent = sanitize(content || '');
  const doc = { id, title, date, content: safeContent };
  fs.writeFileSync(path.join(docsDir, `${id}.json`), JSON.stringify(doc, null, 2));
  return NextResponse.json({ success: true, doc });
}
