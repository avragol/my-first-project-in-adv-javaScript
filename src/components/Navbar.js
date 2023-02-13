import PAGES from "../models/PageModel.js";
import { switchPage } from "../routes/router.js";

const HOMEMENULINK = document.getElementById("home-page-link");
const LOGINMENULINK = document.getElementById("login-page-link");
const REGISTERMENULINK = document.getElementById("register-page-link");

HOMEMENULINK.addEventListener("click", () => { switchPage(PAGES.HOME) });
LOGINMENULINK.addEventListener("click", () => { switchPage(PAGES.LOGIN) });
REGISTERMENULINK.addEventListener("click", () => { switchPage(PAGES.REGISTER) });