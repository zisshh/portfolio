import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const docsDir = path.join(process.cwd(), 'docs');

export async function GET() {
  const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.json'));
  const docs = files.map(f => JSON.parse(fs.readFileSync(path.join(docsDir, f), 'utf8')));
  return NextResponse.json(docs);
}
