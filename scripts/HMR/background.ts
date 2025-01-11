import type { Plugin } from 'vite';
import { WebSocketServer } from 'ws';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { bgUpdatePort, __DEV__ } from '../../const';

const hotReloadBackground = (): Plugin => {
  let wss: WebSocketServer | null = null;
  // init ws server
  const initWsServer = () => {
    wss = new WebSocketServer({ port: bgUpdatePort });

    wss.on('connection', function connection(ws) {
      // heart-beat monitor
      ws.send('heartbeatMonitor');
      const interval = setInterval(() => {
        ws.send('heartbeat');
      }, 3000);

      ws.on('message', (message) => {
        const info = `${message}`;
        // listen contentScript code change, reuse a ws connection
        if (info === 'UPDATE_CONTENT_SCRIPT') {
          wss.clients.forEach((ws) => {
            ws.send('UPDATE_CONTENT_SCRIPT');
          });
        }
      });

      ws.on('close', () => {
        clearInterval(interval);
      });
    });
  };

  return {
    name: 'hot-reload-background',
    enforce: 'pre',
    configResolved() {
      // startup ws server
      if (__DEV__) {
        initWsServer();
      }
    },
    transform(code, id) {
      if (id.indexOf('background/index.ts') > 0 && __DEV__) {
        let injectDevCode = `\nconst UP_PORT = ${bgUpdatePort}\n`;
        injectDevCode += readFileSync(
          resolve(__dirname, 'injectCode.js'),
          'utf-8'
        );
        return code + injectDevCode;
      }
    },
    writeBundle() {
      // 通过socket触发reload
      if (wss !== null) {
        wss.clients.forEach((ws) => {
          ws.send('UPDATE_BG');
        });
      }
    },
  };
};

export default hotReloadBackground;
