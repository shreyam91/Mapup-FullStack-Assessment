require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  // Initialize Socket.io if needed
//   const io = initSocket(server);
});

module.exports = { app, server };
