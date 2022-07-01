// dependencies
const express = require("express");
const {v4 : uuidv4} = require("uuid");
const fs = require("fs");
const path = require("path");


// create express app
const app = express();
const PORT = process.env.PORT || 4000;
// middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));

let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')))

// --- Routes ---

app.get("/notes", (req, res) => {res.sendFile("notes.html", {root: "public"});});
app.get('/api/notes', (req, res) => res.json(notes));

// post request
// create  new note
app.post('/api/notes', (req, res) => {

    // req.body is an object with the new note
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);

    // save notes to notes.json
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));

    // send back new note
    res.json(notes);
});

// delete request
// delete note
app.delete('/api/notes/:id', (req, res) => {

    // get id from url
    const id = req.params.id;
    
    // filter notes to get all notes except the one with the id
    notes = notes.filter( (note) => {
        return note.id !== id;
    });

    // save notes to notes.json
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));

    // send back new note 
    res.send("Note deleted.");
});

app.get("/*", (req, res) => {res.sendFile("index.html", {root: "public"});});

// -- server --
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));