import { initialDeletePopup, initialEditPopup } from "../pages/HomePage.js";

//this func get and return the id of the clicked btn
const getIdFromClick = (ev) => {
    let idFromId = ev.target.id.split("-"); // split the id to array
    if (!ev.target.id) {
        console.log("ping");
        /*
            if press on icon then there is no id
            then we need to take the id of the parent which is btn
          */
        idFromId = ev.target.parentElement.id.split("-");
    }
    return idFromId[1];
};

//this func creates event listener for the delete buttons
const createBtnEventListener = () => {
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

const deletePic = (ev) => {
    initialDeletePopup(getIdFromClick(ev));
}

const editPic = (ev) => {
    initialEditPopup(getIdFromClick(ev))
}

export { createBtnEventListener, getIdFromClick };