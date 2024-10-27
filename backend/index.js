require('dotenv').config(); 
const app = require('./app'); 
const initSocket = require('./sockets/socket'); 

const PORT = process.env.PORT || 8000; 

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  initSocket(server);
});

module.exports = { app, server };
