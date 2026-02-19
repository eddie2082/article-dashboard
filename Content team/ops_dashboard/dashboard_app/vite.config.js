import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs/promises';
import path from 'node:path';

const statePath = path.resolve(__dirname, '../state.json');

function stateJsonMiddleware() {
  const serveState = async (_req, res) => {
    try {
      const raw = await fs.readFile(statePath, 'utf-8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(raw);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'Failed to read ../state.json', detail: String(error) }));
    }
  };

  return {
    name: 'serve-parent-state-json',
    configureServer(server) {
      server.middlewares.use('/state.json', serveState);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/state.json', serveState);
    }
  };
}

export default defineConfig({
  plugins: [react(), stateJsonMiddleware()]
});
