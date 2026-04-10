import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function devSavePlugin(): Plugin {
  return {
    name: 'dev-save-data',
    configureServer(server) {
      server.middlewares.use('/__api/save-data', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }
        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const filePath = path.resolve(__dirname, 'src/data.ts');
            const current = fs.readFileSync(filePath, 'utf-8');
            const typesSection = current.split('\nexport const DATA')[0];
            const output = `${typesSection}\nexport const DATA: DataStructure = ${JSON.stringify(data, null, 2)};\n`;
            fs.writeFileSync(filePath, output, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devSavePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
