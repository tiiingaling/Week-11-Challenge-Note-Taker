const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3000;
const uuid = require('uuid');

const app = express();

// Serve static files from the public folder
app.use(express.static('public'));

// Route for GET /notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Route for GET *
app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    readFromFile('./public/index.html').then((data) => res.send(data));
  });
  

// API routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
  
      const notes = JSON.parse(data);
      res.json(notes);
    });
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
