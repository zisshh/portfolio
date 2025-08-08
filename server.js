const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.DOCS_PASSWORD || 'changeme';
const docsDir = path.join(__dirname, 'docs');

function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function sanitize(str) {
  return str.replace(/<script.*?>.*?<\/script>/gi, '');
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET' && pathname === '/api/docs') {
    const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.json'));
    const docs = files.map(f => JSON.parse(fs.readFileSync(path.join(docsDir, f), 'utf8')));
    return sendJSON(res, 200, docs);
  }

  if (req.method === 'POST' && pathname === '/api/auth') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { password } = JSON.parse(body || '{}');
      if (password === PASSWORD) return sendJSON(res, 200, { success: true });
      sendJSON(res, 401, { success: false });
    });
    return;
  }

  const docMatch = pathname.match(/^\/api\/docs\/([^\/]+)$/);
  if (docMatch && req.method === 'POST') {
    const id = docMatch[1];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { password, content, title, date } = JSON.parse(body || '{}');
      if (password !== PASSWORD) return sendJSON(res, 401, { success: false });
      const safeContent = sanitize(content || '');
      const doc = { id, title, date, content: safeContent };
      fs.writeFileSync(path.join(docsDir, `${id}.json`), JSON.stringify(doc, null, 2));
      sendJSON(res, 200, { success: true, doc });
    });
    return;
  }

  if (req.method === 'GET' && pathname === '/download-cv') {
    const cvPath = path.join(__dirname, 'public', 'cv.pdf');
    if (fs.existsSync(cvPath)) {
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="cv.pdf"'
      });
      fs.createReadStream(cvPath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('CV not found');
    }
    return;
  }

  // static files
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  if (filePath.indexOf(__dirname) !== 0) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf'
  };
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': map[ext] || 'text/plain' });
      res.end(data);
    }
  });
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
