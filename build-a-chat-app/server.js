import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

// 1. HTTP Server: Serve ./public/index.html on GET /
const server = http.createServer((req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

// 2. Attach WebSocket server to the HTTP server
const wss = new WebSocketServer({ server });

// Helper function to broadcast a JSON payload to all open sockets
function broadcast(data) {
  const payload = JSON.stringify(data);
  for (const client of wss.clients) {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(payload);
    }
  }
}

// 3. Handle incoming WebSocket connections
wss.on('connection', (socket, req) => {
  // 4. Extract username from query params and broadcast join system message
  const username = new URL(req.url, 'http://localhost').searchParams.get('username');

  broadcast({
    type: 'system',
    text: `${username} joined`
  });

  // 5. Broadcast chat messages
  socket.on('message', (data) => {
    try {
      const parsed = JSON.parse(data.toString());
      broadcast({
        type: 'chat',
        username: parsed.username,
        text: parsed.text
      });
    } catch (err) {
      console.error('Failed to parse incoming message:', err);
    }
  });

  // 6. Broadcast leave system message on socket close
  socket.on('close', () => {
    broadcast({
      type: 'system',
      text: `${username} left`
    });
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// 7. Start listening on PORT 3001
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:3001`);
});