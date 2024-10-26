require('dotenv').config(); // Load environment variables
const app = require('./app'); // Import the Express app
const initSocket = require('./sockets/socket'); // Import the Socket.io initialization function

const PORT = process.env.PORT || 3000; // Set the port from environment variables or default to 3000

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  // Initialize Socket.io with the created server
  initSocket(server);
});

// Export the app and server for testing or further use
module.exports = { app, server };
