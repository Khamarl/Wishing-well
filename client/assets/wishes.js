//fetch wishes data from server 
const getWishData = async () => {

    const response = await fetch("http://localhost:5000/wishes");
    const data = await response.json();
    return data;
}

// const getWishId = () => {
//     const params = new URLSearchParams(window.location.search);
//     const id = params.get("id");
//     return id;
// }

// const getWish = getWishId();
// console.log(getWish);


// Show wishes on html 
const showWishes = async () => {
    
    //select where data is to be inputted 
    const wishlist = document.querySelector("ul");

    //fetch data
    const wishes = await getWishData();
    console.log(wishes)

    wishes.forEach(wish => {
        // for each wish add a new list item with two boxes
        const element = document.createElement("li")
        element.textContent = wish["wish"];

        const button = document.createElement("button");
        button.textContent = "Vote";
        button.style.margin = "20px"
        // button.onclick(addVote());
        button.addEventListener("click", e => addVote(e, wish.id))
        element.appendChild(button);
        const secondButton = document.createElement("button");
        secondButton.textContent = "Deny";
        secondButton.style.margin = "20px"
        secondButton.addEventListener("click", e => denyVote(e, wish.id))
        element.appendChild(secondButton)
      // append to html 
        wishlist.appendChild(element)
    })
 
}

const addVote = async (e, id,) => {
    e.preventDefault()
    console.log(id)
    const wishInfo = {
        id: id,
    } 
    // const voteData = {

    //     votes: votes
    // }
    console.log(wishInfo.id)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wishInfo)
    }
    const response = await fetch(`http://localhost:5000/wishes/${id}`, options)
    const res = await response.json() 
    console.log(response)
    if(response.status == 201) {
        alert("POOF! Your wish has been granted");
        window.location.reload();
     }
    console.log(res.votes)
    
}

const denyVote = async (e, id) => {
    e.preventDefault()
    console.log(id)
    wishInfo = {
        id: id
    } 
    console.log(wishInfo.id)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wishInfo)
    }
    const response = await fetch(`http://localhost:5000/wishes/${id}`, options)
    const res = await response.json() 
    console.log(response)
    if(response.status == 201) {
        alert("POOF! You have denied this wish");
        window.location.reload();
     }
    console.log(res.denial)
    
}


showWishes();
