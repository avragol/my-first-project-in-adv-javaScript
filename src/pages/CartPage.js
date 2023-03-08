import { getIdFromClick } from "../utils/initialAdminBtns.js";
/* Set varible tht will contain the picture array and boolean varible that will contain if the connected user is admin */
let userToken = JSON.parse(localStorage.getItem("userToken"));

/* set the cards gallery elemnt */
const CARTDIV = document.getElementById("cartDiv");
const POPUPCONTAINER = document.getElementById("modularPopup");

window.addEventListener("load", () => {
    if (userToken.cart.length > 0) {
        createCart()
    }
});

/* update the cart by information from home page (the func is exported to home page and run from there) */
const updateCart = (newUserToken) => {
    userToken = newUserToken;
    createCart();
}

//the function return HTML code for one card by the parameters
const createCardItem = (isAdmin, url, alt, title, credit, price, picId) => {
    return `
    <div class="card p-2">
                        <img src="${url}" class="card-img-top"
                            alt="${alt}" height="300">
                        <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5 class="card-title">${title}</h5>
                             <a class="border px-2 pt-1" id="cartBtnCart-${picId}"><i class="bi bi-cart-dash-fill"></i></a>
                            </div>
                            <p class="card-text">Picture by ${credit}.</p>
                            <ul class="list-group list-group-flush border rounded">
                                <li class="list-group-item border">Price: ${price}$</li>
                            </ul>
                            <div class="d-flex justify-content-around mt-3">
                                <a href="#" class="btn btn-success text-center" id="buyBtn-${picId}">Buy now!</a>
                            </div>
                        </div>
                    </div>
    `
};

//the function passes through the array and for every picture build html elemnt into the cart
const createCart = () => {
    if (userToken.cart.length === 0) {
        CARTDIV.innerHTML = `
         <div class="alert alert-info" role="alert">
                         Your shopping cart is empty... it's time to start filling!
                     </div>
             `;
    } else {
        let innerStr = "";
        for (let pic of userToken.cart) {
            innerStr += createCardItem(userToken.isAdmin, pic.url, pic.alt, pic.title, pic.credit, pic.price, pic.picId);
        }
        CARTDIV.innerHTML = innerStr;
        intialCartBtn();
        initBuyBtn();
    }
}


const intialCartBtn = () => {
    document.querySelectorAll("[id^=cartBtnCart]").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
            let choosenPic = userToken.cart.find((pic) => pic.picId == getIdFromClick(ev))
            removePicfromCart(choosenPic);
        })
    })
}

const removePicfromCart = (choosenPic) => {
    userToken.cart = userToken.cart.filter((pic) => pic.picId != choosenPic.picId);
    localStorage.setItem("userToken", JSON.stringify(userToken));
    updateUsersArr(userToken);
    updateCart(userToken);
}


const updateUsersArr = (userToUpdate) => {
    let usersArr = JSON.parse(localStorage.getItem("users"));
    const index = usersArr.findIndex((user) => user.userId === userToUpdate.userId);
    if (index !== -1) {
        usersArr[index] = JSON.parse(JSON.stringify(userToUpdate));
        localStorage.setItem("users", JSON.stringify(usersArr));
    }
}

const initBuyBtn = () => {
    CARTDIV.querySelectorAll("[id^=buyBtn]").forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove the "d-none" class from the element with the id "POPUPCONTAINER"
            POPUPCONTAINER.classList.remove("d-none");
            // Set the innerHTML of the element with the id "POPUPCONTAINER" to the following string:
            POPUPCONTAINER.innerHTML = `
                <div class="text-center p-3 rounded-3">
                    <button type="button" class="btn-close mb-3" aria-label="Close" id="closeAddPopup"></button>
                    <h3>Hi!</h3>
                    <h4>It's not a real website...</h4>
                    <h5>See you in the next projects <i class="bi bi-emoji-smile-fill text-warning"></i></h5>
                </div>
            `;
        });
    });
}

export default updateCart;