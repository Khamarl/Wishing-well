
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
        
        wish: e.target.wish.value,
        name: e.target.name.value
    }
    console.log(wishInfo)

    // options variable created to post JSON data  
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wishInfo)
    }

    // Use fetch to post JSON data 
    const response = await fetch("http://localhost:5000/wishes", options).then((res) => res.json())
    .then((wishInfo) => {
      console.log('Success:', wishInfo);
    })
 

    if(response.status == 201) {
        alert("POOF! Your wish has been granted");
        window.location.assign("");
     }
}

const form =  document.querySelector("#add-wish");
form.addEventListener("submit", createNewWish);
