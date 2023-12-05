const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let latestLocation = null;


app.post('/api/endpoint', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log('Received location data:', { latitude, longitude });

    // Process the data as needed (save to a database, perform other actions, etc.)

    // Send a response if necessary
    res.json({ message: 'Location data received successfully' });
});
app.get('/api/endpoint', (req, res) => {
    // Assuming you have query parameters for latitude and longitude in the URL
    const { latitude, longitude } = req.query;
    console.log('Received location data (GET):', { latitude, longitude });

    // Process the data as needed (save to a database, perform other actions, etc.)

    // Send a response if necessary
    res.json({ message: 'Location data received successfully (GET)' });
});
app.use(express.static('public'));

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
