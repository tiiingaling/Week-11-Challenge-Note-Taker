const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const app = express();

// Serve static files from the public folder
app.use(express.static('public'));

// Route for GET /notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Route for GET *
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// API routes
app.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // POST /api/notes
app.post('/api/notes', (req, res) => {
    // Read the db.json file
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));
  
    // Create a new note with a unique id
    const newNote = {
      id: uuid.v4(),
      title: req.body.title,
      text: req.body.text,
    };
  
    // Add the new note to the array of notes
    notes.push(newNote);
  
    // Write the updated notes array to the db.json file
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));
  
    // Return the new note to the client
    res.json(newNote);
  });

// Start the server
app.listen(PORT, () => 
    console.log(`Server started at http://localhost:${PORT}`)
);
