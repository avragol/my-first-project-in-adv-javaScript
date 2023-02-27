import initialCarousel from "../components/Carousel.js";
import initialCards from "../components/PicsCards.js";
import initialTable from "../components/PicsTable.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";
import createBtnEventListener from "../utils/initialAdminBtns.js";

const CAROUSELDIV = document.getElementById("carouselExampleCaptions");
const GALLERYDIV = document.getElementById("cardsPics");
const LISTDIV = document.getElementById("tablePics");
const POPUPCONTAINER = document.getElementById("modularPopup");


let picsArr = JSON.parse(localStorage.getItem("pics"));
let newPicsArr;
let isAdmin;


window.addEventListener("load", () => {
    isAdmin = checkIfAdmin();
    initialCarousel(picsArr);
    initialCards(picsArr, isAdmin);
    initialTable(picsArr, isAdmin);
    createBtnEventListener();
})

const swicthDisplay = (choosenDisplay) => {
    if (choosenDisplay === GALLERYDIV || choosenDisplay === LISTDIV) {
        document.getElementById("filtersBtns").style.height = "2.357rem";
    } else {
        document.getElementById("filtersBtns").style.height = "0";
    }
    let displaysArr = document.querySelectorAll(".dis");
    for (let display of displaysArr) {
        if (display === choosenDisplay) {
            display.classList.add("d-block");
            display.classList.remove("d-none");
        } else {
            display.classList.remove("d-block");
            display.classList.add("d-none");
        }
    }
};

document.getElementById("carouselBtn").addEventListener("click", () => {
    swicthDisplay(CAROUSELDIV);
});
document.getElementById("galleryBtn").addEventListener("click", () => {
    swicthDisplay(GALLERYDIV);
});
document.getElementById("listBtn").addEventListener("click", () => {
    swicthDisplay(LISTDIV);
});

const updateDisplays = (newPicsArrParm) => {
    initialCarousel(newPicsArrParm);
    initialCards(newPicsArrParm, isAdmin);
    initialTable(newPicsArrParm, isAdmin);
    createBtnEventListener();
};

const sortPics = (asc = true) => {
    newPicsArr = [...picsArr];
    if (asc) {
        newPicsArr.sort((a, b) => a.title.localeCompare(b.title));//from a to z
    } else {
        newPicsArr.sort((a, b) => b.title.localeCompare(a.title));//from z to a
    }
    updateDisplays(newPicsArr);
};

document.getElementById("sortAscBtn").addEventListener("click", sortPics);
document.getElementById("sortDescBtn").addEventListener("click", () => { sortPics(false) });

document.getElementById("searchPicInput").addEventListener("input", (ev) => {
    newPicsArr = picsArr.filter((pic) => pic.title.toLowerCase().includes(ev.target.value.toLowerCase()));
    updateDisplays(newPicsArr);
});

const deletePicFinaly = (idToDel) => {
    console.log("before: " + picsArr);
    console.log("idToDel: " + idToDel);
    picsArr = picsArr.filter((item) => item.picId != idToDel)
    console.log("after: " + picsArr);
    localStorage.setItem("pics", JSON.stringify(picsArr));
    updateDisplays(picsArr);
}

const initialDeletePopup = (idToDel) => {
    POPUPCONTAINER.classList.remove("d-none");
    POPUPCONTAINER.innerHTML = `
        <div id="deletePopup">
            <h1>Are you sure?!</h1>
            <div class="d-flex mt-3">
                <button class="btn btn-primary" id="deleteFinalyBtn">Yes, delete it</button>
                <button class="btn btn-danger" id="dontDeleteBtn">No! I'm so sorry!</button>
            </div>
        </div>`;
    document.getElementById("deleteFinalyBtn").addEventListener("click", () => {
        deletePicFinaly(idToDel);
        POPUPCONTAINER.classList.add("d-none");
        POPUPCONTAINER.innerHTML = "";
    });
    document.getElementById("dontDeleteBtn").addEventListener("click", () => {
        POPUPCONTAINER.classList.add("d-none");
        POPUPCONTAINER.innerHTML = "";
    });
}

export default initialDeletePopup;


