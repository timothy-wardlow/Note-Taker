const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const notes = require('./db/db.json');

function createNote(body, notesArr) {
    const newNote = body;
    notesArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArr }, null, 2)
    );
    return newNote;
}

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const newNote = createNote(req.body, notes);
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`API SERVER NOW ON PORT ${PORT}`);
});