import initialDeletePopup from "../components/deletePicPopup.js";
import initialEditPopup from "../components/editPicPopup.js";

//this func get and return the id of the clicked btn
const getIdFromClick = (ev) => {
    let idFromId = ev.target.id.split("-"); // split the id to array
    if (!ev.target.id) {
        /*
            if press on icon then there is no id
            then we need to take the id of the parent which is btn
          */
        idFromId = ev.target.parentElement.id.split("-");
    }
    return idFromId[1];
};

//this func creates event listener for the delete buttons
let picsArr;
let deletePicFinaly;
let editPicfinaly;
const createBtnEventListener = (picsArrFromHomePage, deletePicFinalyFromHomePage, editPicfinalyFromHomePage) => {
    editPicfinaly = editPicfinalyFromHomePage;
    picsArr = picsArrFromHomePage;
    deletePicFinaly = deletePicFinalyFromHomePage;
    let deleteBtns = document.querySelectorAll(`[id^='deleteBtn']`);
    let editBtns = document.querySelectorAll(`[id^='editBtn']`);
    //add events to new btns
    for (let btn of deleteBtns) {
        btn.addEventListener("click", deletePic);
    }
    for (let btn of editBtns) {
        btn.addEventListener("click", editPic);
    }
};

//init the popup to delete popup by the clicked element id
const deletePic = (ev) => {
    initialDeletePopup(getIdFromClick(ev), deletePicFinaly);
}

//init the popup to edit popup by the clicked element id
const editPic = (ev) => {
    initialEditPopup(getIdFromClick(ev), picsArr, editPicfinaly)
}

export { createBtnEventListener, getIdFromClick };