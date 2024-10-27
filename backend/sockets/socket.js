const { Server } = require('socket.io');

const initSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New WebSocket connection:', socket.id);

    socket.on('message', (data) => {
      console.log('Received message:', data);
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io; 
};

module.exports = initSocket;
