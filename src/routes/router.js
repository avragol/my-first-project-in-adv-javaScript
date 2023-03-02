import PAGES from "../models/PageModel.js";

const pagesArr = [PAGES.HOME, PAGES.LOGIN, PAGES.REGISTER, PAGES.PROFILE, PAGES.ABOUT];

const switchPage = (pageToDisplay) => {
    let aPageOpens = false;
    for (let page of pagesArr) {
        if (page === pageToDisplay) {
            document.getElementById(page).classList.remove("d-none");
            document.getElementById(page).classList.add("d-block");
            aPageOpens = true;
        } else {
            document.getElementById(page).classList.remove("d-block");
            document.getElementById(page).classList.add("d-none");
        }
        if (!aPageOpens) {
            document.getElementById(PAGES.NOTFOUND).classList.remove("d-none");
            document.getElementById(PAGES.NOTFOUND).classList.add("d-block");
        }
    }
}

export { switchPage };