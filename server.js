const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const hostname = '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';

console.log('Starting Next.js server...');
console.log('Port:', port);
console.log('Hostname:', hostname);
console.log('Development mode:', dev);
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

console.log('Preparing Next.js app...');

app.prepare().then(() => {
  console.log('Next.js app prepared successfully');

  createServer(async (req, res) => {
    try {
      console.log(`Incoming request: ${req.method} ${req.url}`);
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
      console.log(`Request handled: ${req.method} ${req.url}`);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
