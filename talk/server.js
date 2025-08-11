const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./model/message');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));

// Serve static files
app.use(express.static('public'));

// Socket.IO connection
io.on('connection', async (socket) => {
  console.log('A user connected');

  // Send last 10 messages to new user
  const messages = await Message.find().sort({ time: -1 }).limit(10);
  socket.emit('loadMessages', messages.reverse());

  // Listen for new messages
  socket.on('chatMessage', async (data) => {
    const msg = new Message(data);
    await msg.save();
    io.emit('message', data); // Send to all users
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
