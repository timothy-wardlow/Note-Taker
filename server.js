const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const notes = require('./db/db.json');

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API SERVER NOW ON PORT ${PORT}`);
});