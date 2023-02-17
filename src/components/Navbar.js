import PAGES from "../models/PageModel.js";
import { switchPage } from "../routes/router.js";

const HOMEMENULINK = document.getElementById("home-page-link");
const LOGINMENULINK = document.getElementById("login-page-link");
const REGISTERMENULINK = document.getElementById("register-page-link");
const PROFILEMENULINK = document.getElementById("profile-page-link");
const LOGOUTMENULINK = document.getElementById("log-out-link");
const ADMINOPTIONLINK = document.getElementById("admin-option-link");

HOMEMENULINK.addEventListener("click", () => { switchPage(PAGES.HOME) });
LOGINMENULINK.addEventListener("click", () => { switchPage(PAGES.LOGIN) });
REGISTERMENULINK.addEventListener("click", () => { switchPage(PAGES.REGISTER) });

LOGOUTMENULINK.addEventListener("click", () => {
    localStorage.removeItem("userToken");
    location.reload();
});

window.addEventListener("load", () => {
    let userToken = JSON.parse(localStorage.getItem("userToken"));
    if (!userToken) {
        LOGINMENULINK.classList.remove("d-none");
        REGISTERMENULINK.classList.remove("d-none");
        return;
    } else {
        PROFILEMENULINK.classList.remove("d-none");
        LOGOUTMENULINK.classList.remove("d-none");
        PROFILEMENULINK.innerHTML = `<u>${userToken.firstName} ${userToken.lastName}</u>`
        if (userToken.isAdmin) { ADMINOPTIONLINK.classList.remove("d-none"); }
    }
})