import initialCarousel from "../components/Carousel.js";
import initialCards from "../components/PicsCards.js";

import checkIfAdmin from "../utils/checkIfAdmin.js";


let picsArr = JSON.parse(localStorage.getItem("pics"));
let isAdmin;


window.addEventListener("load", () => {
    isAdmin = checkIfAdmin();
    //initialCarousel(picsArr);
    initialCards(picsArr, isAdmin);
})
