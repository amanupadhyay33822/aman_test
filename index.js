const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let latestLocation = null;

wss.on('connection', (ws) => {
  // Send the latest location to the newly connected client
  if (latestLocation) {
    ws.send(JSON.stringify({ type: 'location', data: latestLocation }));
  }

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === 'location') {
        // Update the latest location
        latestLocation = parsedMessage.data;

        // Broadcast the new location to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'location', data: latestLocation }));
          }
        });
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
});
app.post('/api/endpoint', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log('Received location data:', { latitude, longitude });

    // Process the data as needed (save to a database, perform other actions, etc.)

    // Send a response if necessary
    res.json({ message: 'Location data received successfully' });
});
app.use(express.static('public'));

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
