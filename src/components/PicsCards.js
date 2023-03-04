import checkIfConnected from "../utils/checkIfConnected.js";
/* Set varible tht will contain the picture array and boolean varible that will contain if the connected user is admin */
let picsArr;
let isAdmin;

/* set the cards gallery elemnt */
const CARDSPICS = document.getElementById("cardsPics");

/* init the gallery by information from home page (the func is exported to home pagק and run from there) */
const initialCards = (picsArrFromHomePage, isAdminFromHomePage) => {
    picsArr = picsArrFromHomePage;
    isAdmin = isAdminFromHomePage;
    createCardsGallery();
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
                             ${checkIfConnected() ? initialShopCart() : ""}   
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

const initialShopCart = () => {
    return `<a class="border px-2 pt-1"><i class="bi bi-cart-plus-fill"></i></a>`
}

export { initialCards, createCardItem };