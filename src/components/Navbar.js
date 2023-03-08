import PAGES from "../models/PageModel.js";
import { switchPage } from "../routes/router.js";
import initialAddNewPicPopup from "./addNewPicPopup.js";
import checkIfConnected from "../utils/checkIfConnected.js";

const HOMEMENULINK = document.getElementById("home-page-link");
const LOGINMENULINK = document.getElementById("login-page-link");
const REGISTERMENULINK = document.getElementById("register-page-link");
const PROFILEMENULINK = document.getElementById("profile-page-link");
const LOGOUTMENULINK = document.getElementById("log-out-link");
const ADDPICLINK = document.getElementById("add-pic-link");
const ABOUTMENULINK = document.getElementById("about-page-link");
const SHOPCARTLINK = document.getElementById("cart-page-link");

HOMEMENULINK.addEventListener("click", () => { switchPage(PAGES.HOME) });
LOGINMENULINK.addEventListener("click", () => { switchPage(PAGES.LOGIN) });
REGISTERMENULINK.addEventListener("click", () => { switchPage(PAGES.REGISTER) });
PROFILEMENULINK.addEventListener("click", () => { switchPage(PAGES.PROFILE) });
ABOUTMENULINK.addEventListener("click", () => { switchPage(PAGES.ABOUT) });
SHOPCARTLINK.addEventListener("click", () => { switchPage(PAGES.CART) });
LOGOUTMENULINK.addEventListener("click", () => {
    localStorage.removeItem("userToken");
    location.reload();
});
ADDPICLINK.addEventListener("click", initialAddNewPicPopup);

window.addEventListener("load", () => {
    let isConnected = checkIfConnected();
    if (!isConnected) {
        LOGINMENULINK.classList.remove("d-none");
        REGISTERMENULINK.classList.remove("d-none");
        return;
    } else {
        let userToken = JSON.parse(localStorage.getItem("userToken"))
        PROFILEMENULINK.classList.remove("d-none");
        LOGOUTMENULINK.classList.remove("d-none");
        ADDPICLINK.classList.remove("d-none");
        SHOPCARTLINK.classList.remove("d-none");
        PROFILEMENULINK.innerHTML = `<u>${userToken.firstName} ${userToken.lastName}</u>`
    }
})

//link to home page from 404 page
document.getElementById("come-back-link").addEventListener("click", () => { switchPage(PAGES.HOME) })