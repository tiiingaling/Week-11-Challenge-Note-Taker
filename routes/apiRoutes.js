const app = require('express').Router();
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

// API routes
app.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST /notes
app.post('/notes', (req, res) => {
  // Read the db.json file
  let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

  // Create a new note with a unique id
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };

  console.log(newNote);

  // Add the new note to the array of notes
  notes.push(newNote);

  // Write the updated notes array to the db.json file
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

  // Return the new note to the client
  res.json(newNote);
});

// DELETE Route for a specific note
app.delete('/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;

  let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

  // Make a new array of all notes except the one with the ID provided in the URL
  const result = notes.filter((note) => note.id !== noteId);

  // Write the updated notes array to the db.json file
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(result));

  // Respond to the DELETE request
  res.json(`Item ${noteId} has been deleted 🗑️`);
});

module.exports = app;