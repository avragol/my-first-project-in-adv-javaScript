import checkIfConnected from "../utils/checkIfConnected.js";
import { getIdFromClick } from "../utils/initialAdminBtns.js";
import updateCart from "../pages/CartPage.js";
/* Set varible tht will contain the picture array and boolean varible that will contain if the connected user is admin */
let picsArr;
let isAdmin;

/* set the cards gallery elemnt */
const CARDSPICS = document.getElementById("cardsPics");
/* set the popup elemnt */
const POPUPCONTAINER = document.getElementById("modularPopup");

/* init the gallery by information from home page (the func is exported to home pagק and run from there) */
const initialCards = (picsArrFromHomePage, isAdminFromHomePage) => {
    picsArr = picsArrFromHomePage;
    isAdmin = isAdminFromHomePage;
    createCardsGallery();
    intialCartBtn();
}

//the function return HTML code for one card by the parameters
const createCardItem = (isAdmin, url, alt, title, credit, price, picId) => {
    return `
    <div class="card p-2" style="width: 18rem;">
                        <img src="${url}" class="card-img-top"
                            alt="${alt}" height="300">
                        <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5 class="card-title">${title}</h5>
                             ${checkIfConnected() ? initialShopCart(picId) : ""}   
                            </div>
                            <p class="card-text">Picture by ${credit}.</p>
                            <ul class="list-group list-group-flush border rounded">
                                <li class="list-group-item border">Price: ${price}$</li>
                            </ul>
                            <div class="d-flex justify-content-around mt-3">
                                <a href="#" class="btn btn-success text-center" id="buyBtn-${picId}">Buy now!</a>
                                ${isAdmin ? initialAdminBtns(picId) : ""}
                            </div>
                        </div>
                    </div>
    `
};

//the function passes through the array and for every picture build html elemnt into the gallery
const createCardsGallery = () => {
    let innerStr = "";
    for (let pic of picsArr) {
        innerStr += createCardItem(isAdmin, pic.url, pic.alt, pic.title, pic.credit, pic.price, pic.picId);
    }
    CARDSPICS.innerHTML = innerStr;
}

//that function run from createCardItem() and return the HTML for admin btns
const initialAdminBtns = (picId) => {
    return `
    <buttom class="btn btn-warning text-center" id="editBtnGallery-${picId}">Edit</buttom>
    <buttom class="btn btn-danger text-center" id="deleteBtnGallery-${picId}">Delete</buttom>
    `
}

const initialShopCart = (picId) => {
    return `<a class="border px-2 pt-1" id="cartBtnGallery-${picId}"><i class="bi bi-cart-plus-fill"></i></a>`
}

const intialCartBtn = () => {
    document.querySelectorAll("[id^=cartBtnGallery]").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
            let choosenPic = picsArr.find((pic) => pic.picId == getIdFromClick(ev))
            addPicToCart(choosenPic);
        })
    })
}

const addPicToCart = (choosenPic) => {
    let userToken = JSON.parse(localStorage.getItem("userToken"));
    if (!isPicInCart(choosenPic, userToken.cart)) {
        userToken.cart = [...userToken.cart, JSON.parse(JSON.stringify(choosenPic))];
        localStorage.setItem("userToken", JSON.stringify(userToken));
        updateUsersArr(userToken);
        updateCart(userToken)
        addToCartPopup();
    } else {
        addToCartFailedPopup();
    }
}

const isPicInCart = (pic, cart) => {
    return cart.find((item) => {
        if (pic.picId !== item.picId) {
            return false;
        }
        return true;
    })
};

const updateUsersArr = (userToUpdate) => {
    let usersArr = JSON.parse(localStorage.getItem("users"));
    const index = usersArr.findIndex((user) => user.userId === userToUpdate.userId);
    if (index !== -1) {
        usersArr[index] = JSON.parse(JSON.stringify(userToUpdate));
        localStorage.setItem("users", JSON.stringify(usersArr));
    }
}

const addToCartPopup = () => {
    // Remove the "d-none" class from the element with the id "POPUPCONTAINER"
    POPUPCONTAINER.classList.remove("d-none");
    // Set the innerHTML of the element with the id "POPUPCONTAINER" to the following string:
    POPUPCONTAINER.innerHTML = `
                <div class="text-center p-3 rounded-3">
                    <button type="button" class="btn-close mb-3" aria-label="Close" id="closeAddPopup"></button>
                    <h3>The image has been added successfully!</h3>
                </div>
            `;
}

const addToCartFailedPopup = () => {
    // Remove the "d-none" class from the element with the id "POPUPCONTAINER"
    POPUPCONTAINER.classList.remove("d-none");
    // Set the innerHTML of the element with the id "POPUPCONTAINER" to the following string:
    POPUPCONTAINER.innerHTML = `
                <div class="text-center p-3 rounded-3">
                    <button type="button" class="btn-close mb-3" aria-label="Close" id="closeAddPopup"></button>
                    <h3>The picture is already in the cart</h3>
                </div>
            `;
}

export { initialCards, createCardItem };