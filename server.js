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

//