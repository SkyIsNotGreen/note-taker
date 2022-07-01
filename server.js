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

let notes = JSON.parse (fs.readFileSync(path.join(__dirname, "/db/db.json")));

// -- routes --

// get requests
app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "./index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./notes.html")));
app.get("/api/notes", (req, res) => res.json(notes));

// post request
// create new note
app.post("/api/notes", (req, res) => {
    
    // req.body is an object with the new note
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);

    // save notes to notes.json
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes), (err) => {
        if (err) throw err;
    });

    // send back new note
    res.json(newNote);
});

// delete request
// delete note
app.delete("/api/notes/:id", (req, res) => {
    
    // get id from url
    const id = req.params.id;

    // find note with id
    const note = notes.find(note => note.id === id);

    // delete note
    notes = notes.filter(note => note.id !== id);

    // save notes to notes.json
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes), (err) => {
        if (err) throw err;
    });
    
    // send back deleted note
    res.json(note);

});

// -- server --
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));