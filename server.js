const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Serve static files from the public folder
app.use(express.static('public'));

// Call api routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start the server
app.listen(PORT, () => 
    console.log(`Server started at http://localhost:${PORT}`)
);