const app = require('express').Router();
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

// API routes
app.get('/api/notes', (req, res) => {
  fs.readFile('../db/db.json', 'utf8', (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST /api/notes
app.post('/api/notes', (req, res) => {
  // Read the db.json file
  let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

  // Create a new note with a unique id
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };

  // Add the new note to the array of notes
  notes.push(newNote);

  // Write the updated notes array to the db.json file
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

  // Return the new note to the client
  res.json(newNote);
});

module.exports = app;
