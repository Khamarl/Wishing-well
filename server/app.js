const express = require("express");
const cors = require("cors");
const logRoute = require("./logRoute");
const wishes = require("./wishes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(logRoute);

app.get("/" , (req, res) => {

    res.send("Welcome to the wishing well")
});

app.get("/wishes", (req, res) => {
    //gets wishes 
    res.send(wishes)
});

app.get("/favourites", (req, res) => {

    // sorts wishes by vote, highest to lowest 
    const getFavourite = wishes.sort((a,b) => b.votes - a.votes)
    res.send(getFavourite)
});

// app.get("/addwish", (req, res) => {

//     //
//     const wishData = req.body;

// })


module.exports = app;
