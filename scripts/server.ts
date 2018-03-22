/** a very simple http static-file server */

import { createServer } from 'http';
import { parse } from 'url';
import { join, resolve } from 'path';
import { existsSync, readFileSync, statSync } from 'fs';

const publicDir = resolve('public');

const server = createServer((req, res) => {
  const url = parse(req.url);
  let path = join(publicDir, url.pathname);

  if (existsSync(path)) {
    if (statSync(path).isDirectory()) {
      path = join(path, 'index.html');
    }

    res.end(readFileSync(path));
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

export function startServer(port: number) {
  server.listen(port);

  console.log('Server listening on http://localhost:' + port);
}

export function stopServer() {
  server.close();

  console.log('Server stopped.');
}
