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

app.post("/wishes", (req, res) => {

    //get data from user and hold it in a const 
    const wishData = req.body;
    //sets users data id as wishdata, and sets votes and denial tally at zero 
    wishData["id"] = wishesId
    wishData["votes"] = 0
    wishData["denial"] = 0
    wishesId += 1;
    
    wishes.push(wishData)

    res.status(201).send(wishData)

});

app.get("/wishes/:id", (req, res) => {
    //store value of id and convert to integer 
    const id = parseInt(req.params.id)

    const filterWishes = wishes.filter(w => w.id == id)
    // if filterwishes has filtered an id 
    if(filterWishes.length) {
        res.send(filterWishes[0])
    } else {
    res.status(401).send({error: "Unable to locate a link"})
    }
})

module.exports = app;
