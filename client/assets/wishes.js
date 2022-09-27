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
        element.textContent = wish["wish"];

        const button = document.createElement("button");
        button.textContent = "Vote for this wish";
        button.style.margin = "20px"
        element.appendChild(button)
      
        wishlist.appendChild(element)
    })
 
}
    
    
 

showWishes();
