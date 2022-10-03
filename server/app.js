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

// app.post("/wishes/:id", (req, res) => {
//     // get id of wish
//     const id = parseInt(req.params.id)
//     //console.log(id)
//     let success = 0

//     wishes.forEach(w => {
//         //if id of wish is the same as id in for each loop
//         if(w.id == id){
//             if(req.body.votes == "grant") {
//                 console.log(w.votes)
//                 w.votes += 1
//                 success = 1
//                 res.status(201).send({votes:w.votes})  
//             }else
//             //increase number of votes by 1
//             console.log(w.deny)
//             w.deny += 1
//             success = 1
//             res.status(201).send({denial:w.deny})
//         }
//     })
    
//     // if (success = 0){
//     //     res.status(404).send({error : "Unable to locate a link or update wish"})
//     // }
// })

app.post("/wishes/:id", (req, res) => {
    // get id of wish
    const id = parseInt(req.params.id)
    //console.log(id)
    let success = 0

    wishes.forEach(w => {
        //if id of wish is the same as id in for each loop
        if(w.id == id){
            //increase number of votes by 1
            console.log(w.denial)
            w.denial += 1
            success = 1
            res.status(201).send({denial:w.denial})
        }
    })
    
    // if (success = 0){
    //     res.status(404).send({error : "Unable to locate a link or update wish"})
    // }
})
module.exports = app;
