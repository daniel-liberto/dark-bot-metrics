import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const port = process.env.PORT || 8080;

const server = createServer((req, res) => {
  const indexHtml = readFileSync(join(__dirname, 'dist', 'index.html'), 'utf8');
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(indexHtml);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 