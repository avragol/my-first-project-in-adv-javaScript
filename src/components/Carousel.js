import { createCardItem } from "./PicsCards.js";
import { getIdFromClick } from "../utils/initialAdminBtns.js"
/* Set varible tht will contain the picture array */
let picsArr;

/* set the carosel elemnt */
const CAROUSELPICS = document.getElementById("carouselPics");
const POPUPCONTAINER = document.getElementById("modularPopup");

/* init the carousel by information from home page (the func is exported to home pagק and run from there) */
const initialCarousel = (picsArrFromHomePage) => {
    picsArr = picsArrFromHomePage;
    createCarousel();
}

//the function return HTML code for one carousel item by the parameters
const createCarouselItem = (active, url, title, credit, alt, picId) => {
    return `
                        <div class="carousel-item ${active ? "active" : ""}" data-bs-interval="5000" id="carouselItem-${picId}">
                            <img src="${url}"
                                class="d-block w-100" alt="${alt}">
                            <div class="carousel-caption" id="carouselItemContent-${picId}">
                                <h5>${title}</h5>
                                <p>Picture by ${credit}</p>
                            </div>
                        </div>
    `
}

//the function passes through the array and for every picture build html elemnt into the carousel
const createCarousel = () => {
    let innerStr = "";
    let active = true;
    for (let pic of picsArr) {
        innerStr += createCarouselItem(active, pic.url, pic.title, pic.credit, pic.alt, pic.picId);
        active = false;
    }
    CAROUSELPICS.innerHTML = innerStr;
    CAROUSELPICS.querySelectorAll("[id^='carouselItem']").forEach((item) => {
        item.addEventListener("click", (ev) => {
            console.log(getIdFromClick(ev));
            let picToPopup = picsArr.find((pic) => pic.picId == getIdFromClick(ev))
            POPUPCONTAINER.classList.remove("d-none");
            POPUPCONTAINER.innerHTML = createCardItem(false, picToPopup.url, picToPopup.alt, picToPopup.title, picToPopup.credit, picToPopup.price, picToPopup.picId);
        })
    })
}

export default initialCarousel;