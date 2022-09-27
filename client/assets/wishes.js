//fetch wishes data from server 
const getWishData = async () => {

    const response = await fetch("http://localhost:5000/wishes");
    const data = await response.json();
    return data;
}


// Show wishes on html 
const showWishes = async () => {
    
    //select where data is to be inputted 
    const wishlist = document.querySelector("ul");

    //fetch data
    const wishes = await getWishData();
    console.log(wishes)

    wishes.forEach(wish => {

        const element = document.createElement("li")

        const link = document.createElement("a");
        link.textContent = wish["name"];
        link.href = `wishes.html?:id${wish['id']}`
        element.appendChild(link)
        wishlist.appendChild(element)
    })
//    // create html elements for each wish using for each loop
//    wishes.forEach(wish => {
//     console.log(wish)
//     // const name = document.createElement("h3");
//     const element = document.createElement("li")

//     // name.textContent = wish["name"]
//     element.textContent = wish["wish"]

//     // wishlist.appendChild(name)
//     wishlist.appendChild(element)
// });
 
}
    
    
 

showWishes();
