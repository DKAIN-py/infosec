const express = require('express');
const helmet = require('helmet');
const app = express();















// Use Helmet for security headers
app.use(helmet());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Disable Strict Transport Security (HSTS) - only if necessary
app.disable('strict-transport-security');

// Import and use the API routes
const api = require('./server.js');
app.use('/_api', api);

// Serve the main HTML file
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server for learning infosec started on port ${port}`);
});

// Export the app for testing or other modules
module.exports = app;