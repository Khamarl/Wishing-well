
// fetch wishes from backend
const getWishData = async () => {

        const response = await fetch("http://localhost:5000/wishes");
        const data = await response.json();
        console.log(data);
}

getWishData();

const createNewWish = async (e) => {
    e.preventDefault();
    // creates object that will add to database of wishes
    const wishInfo = {
        
        wish: e.target.wish.value
    }
    console.log(wishInfo)

}

const form =  document.querySelector("#add-wish");
form.addEventListener("submit", createNewWish);
