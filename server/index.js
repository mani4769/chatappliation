
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

// Add a basic route for health check
app.get('/', (req, res) => {
  res.send('Chat server is running');
});

const io = socketIo(server, { 
  cors: { origin: "*" },
  path: "/api/socket" // Add this path for Vercel
});

// in‑memory message history
const history = [];

io.on('connection', (socket) => {
  console.log('New user connected');

  // send existing history to this client
  socket.emit('chatHistory', history);

  socket.on('sendMessage', (data) => {
    const messageData = {
      user: data.user,
      message: data.message,
      time: new Date().toLocaleTimeString()
    };
    history.push(messageData);

    // broadcast to everyone except the sender
    socket.broadcast.emit('receiveMessage', messageData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  server.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

// Export for Vercel
module.exports = app;