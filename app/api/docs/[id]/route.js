import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const docsDir = path.join(process.cwd(), 'docs');
const PASSWORD = process.env.DOCS_PASSWORD || 'changeme';

function sanitize(str) {
  return str.replace(/<script.*?>.*?<\/script>/gi, '');
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
