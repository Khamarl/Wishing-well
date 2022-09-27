const express = require("express");
const cors = require("cors");
const logRoute = require("./logRoute");
let wishes = require("./wishes");


let wishesId = wishes.length;

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

app.post("/addwish", (req, res) => {

    //get data from user and hold it in a const 
    const wishData = req.body;

    wishData["id"] = wishesId
    wishData["votes"] = 0
    
    wishes.push(wishData)

})


module.exports = app;
