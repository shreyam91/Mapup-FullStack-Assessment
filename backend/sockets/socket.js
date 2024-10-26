const { Server } = require('socket.io');

const initSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New WebSocket connection:', socket.id);

    // Example event handling
    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Emit the message to all connected clients
      io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io; // If you want to return the io instance for further use
};

module.exports = initSocket;
