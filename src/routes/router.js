import PAGES from "../models/PageModel.js";

const pagesArr = [PAGES.HOME, PAGES.LOGIN, PAGES.REGISTER, PAGES.PROFILE];

const switchPage = (pageToDisplay) => {
    for (let page of pagesArr) {
        if (page === pageToDisplay) {
            document.getElementById(page).classList.remove("d-none");
            document.getElementById(page).classList.add("d-block");
        } else {
            document.getElementById(page).classList.remove("d-block");
            document.getElementById(page).classList.add("d-none");
        }
    }
}

export { switchPage };