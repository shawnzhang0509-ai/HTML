import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const workbenchPath = path.join(rootDir, 'scene-workbench.json');

function sceneWorkbenchPlugin() {
  return {
    name: 'scene-workbench-api',
    configureServer(server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/api/scene-workbench') return next();

        if (req.method === 'GET') {
          if (!fs.existsSync(workbenchPath)) {
            res.statusCode = 404;
            res.end();
            return;
          }
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(fs.readFileSync(workbenchPath));
          return;
        }

        if (req.method === 'PUT' || req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (c: Buffer) => chunks.push(c));
          req.on('end', () => {
            fs.writeFileSync(workbenchPath, Buffer.concat(chunks));
            res.setHeader('Content-Type', 'text/plain');
            res.end('ok');
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sceneWorkbenchPlugin()],
  resolve: {
    alias: { '@': path.resolve(rootDir, '.') },
  },
});
