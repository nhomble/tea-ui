// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Run the app by serving the static files
// in the dist directory

app.use(cors());
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
