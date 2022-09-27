
// fetch wishes from backend
const getWishData = async () => {

        const response = await fetch("http://localhost:5000/wishes");
        const data = await response.json();
        console.log(data);
}

getWishData();

