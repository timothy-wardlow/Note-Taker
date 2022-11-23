const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const notes = require('./db/db.json');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '.public/index.html'));
});


function createNote(body, notesArr) {
    const newNote = body;
    notesArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const newNote = createNote(req.body, notes);
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`API SERVER NOW ON PORT ${PORT}`);
});