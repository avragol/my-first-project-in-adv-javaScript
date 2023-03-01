// Import statements to load various modules
import initialCarousel from "../components/Carousel.js";
import { initialCards } from "../components/PicsCards.js";
import initialTable from "../components/PicsTable.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";
import { createBtnEventListener } from "../utils/initialAdminBtns.js";
import validateUrl from "../validation/validateUrl.js";
import validateTitle from "../validation/validateTitle.js";
import validateName from "../validation/validateName.js";
import checkInput from "../utils/checkInput.js";

// Constants to hold various elements
const CAROUSELDIV = document.getElementById("carouselExampleCaptions");
const GALLERYDIV = document.getElementById("cardsPics");
const LISTDIV = document.getElementById("tablePics");
const POPUPCONTAINER = document.getElementById("modularPopup");

// Variables to store data
let picsArr = JSON.parse(localStorage.getItem("pics"));
let newPicsArr;
let isAdmin;

// Wait for the window to finish loading before initializing the page
window.addEventListener("load", () => {
    // Check if the current user is an admin
    isAdmin = checkIfAdmin();
    // Initialize the carousel with the pictures
    initialCarousel(picsArr);
    // Initialize the gallery with the pictures
    initialCards(picsArr, isAdmin);
    // Initialize the table with the pictures
    initialTable(picsArr, isAdmin);
    // Add event listeners for the admin buttons
    createBtnEventListener();
    // Initialize the buy button
    initialBuyBtn();
});

// Function to switch the displayed content based on user input
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

// Add event listeners to switch the displayed content
document.getElementById("carouselBtn").addEventListener("click", () => {
    swicthDisplay(CAROUSELDIV);
});
document.getElementById("galleryBtn").addEventListener("click", () => {
    swicthDisplay(GALLERYDIV);
});
document.getElementById("listBtn").addEventListener("click", () => {
    swicthDisplay(LISTDIV);
});

// Function to update the displayed content based on new data
const updateDisplays = (newPicsArrParm) => {
    initialCarousel(newPicsArrParm);
    initialCards(newPicsArrParm, isAdmin);
    initialTable(newPicsArrParm, isAdmin);
    createBtnEventListener();
};

// Function to sort the pictures alphabetically
const sortPics = (asc = true) => {
    // Create a copy of the original array
    newPicsArr = [...picsArr];
    if (asc) {
        // Sort the array in ascending order by title
        newPicsArr.sort((a, b) => a.title.localeCompare(b.title)); //from a to z
    } else {
        // Sort the array in descending order by title
        newPicsArr.sort((a, b) => b.title.localeCompare(a.title)); //from z to a
    }
    // Update the displayed content with the sorted array
    updateDisplays(newPicsArr);
};

// Event listener to sort pictures in ascending order
document.getElementById("sortAscBtn").addEventListener("click", sortPics);
// Event listener to sort pictures in descending order
document.getElementById("sortDescBtn").addEventListener("click", () => {
    sortPics(false); // Pass false to the function to sort in descending order
});

// Event listener for the search input field to filter pictures by title
document.getElementById("searchPicInput").addEventListener("input", (ev) => {
    // Create a new array by filtering picsArr based on whether the title includes the search value
    // The filter method creates a new array, so the original picsArr is not modified
    const newPicsArr = picsArr.filter((pic) =>
        pic.title.toLowerCase().includes(ev.target.value.toLowerCase())
    );

    // Update the displays with the new filtered array
    updateDisplays(newPicsArr);
});

// Function to delete a picture from the array and localStorage
const deletePicFinaly = (idToDel) => {
    // Filter the picsArr to remove the picture with the specified ID
    // The filter method creates a new array, so the original picsArr is not modified
    picsArr = picsArr.filter((item) => item.picId !== idToDel);

    // Store the new picsArr in localStorage
    localStorage.setItem("pics", JSON.stringify(picsArr));

    // Update the displays with the new array
    updateDisplays(picsArr);
};

// Function to edit a picture in the array and localStorage
const editPic = (picToEdit) => {
    // Loop through picsArr to find the picture with the same ID as the one to edit
    // Once found, replace it with the edited picture
    for (let i = 0; i < picsArr.length; i++) {
        if (picsArr[i].picId === picToEdit.picId) {
            picsArr[i] = JSON.parse(JSON.stringify(picToEdit));
            break; // Exit the loop once the picture is found and updated
        }
    }

    // Store the new picsArr in localStorage
    localStorage.setItem("pics", JSON.stringify(picsArr));

    // Update the displays with the new array
    updateDisplays(picsArr);
};
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

const initialEditPopup = (idToEdit) => {
    let picToEdit = picsArr.find((item) => item.picId == idToEdit);
    POPUPCONTAINER.classList.remove("d-none");
    POPUPCONTAINER.innerHTML = `<div id="editPopup">
                    <button type="button" class="btn-close ms-" aria-label="Close" id="closeAddPopup"></button>
                    <h4 class="display-6 text-center">Edit Picture Form</h4>
                    <div class="d-flex">
                    <form class="w-50">
                        <div class="mb-1">
                            <label for="image-url" class="form-label">Image URL <div class="d-inline text-danger"
                                    id="edit-alert-url"></div>
                            </label>
                            <input type="text" class="form-control" id="edit-input-url" name="image-url"
                                placeholder="(Valid url)" required value="${picToEdit.url}">
                        </div>
                        <div class="mb-1">
                            <label for="image-title" class="form-label">Title <div class="d-inline text-danger"
                                    id="edit-alert-title"></div>
                            </label>
                            <input type="text" class="form-control" id="edit-input-title" name="image-title"
                                placeholder="(Start with a capital letter, up to 30 characters)" required value="${picToEdit.title}">
                        </div>
                        <div class="mb-1">
                            <label for="image-price" class="form-label">Price <div class="d-inline text-danger"
                                    id="edit-alert-price"></div>
                            </label>
                            <input type="number" class="form-control" id="edit-input-price" name="image-price" required value="${picToEdit.price}">
                        </div>
                        <div class="mb-1">
                            <label for="image-credit" class="form-label">Credit <div class="d-inline text-danger"
                                    id="edit-alert-credit">
                                </div></label>
                            <input type="text" class="form-control" id="edit-input-credit" name="image-credit"
                                placeholder="(Start with a capital letter, up to 15 characters)" required value="${picToEdit.credit}">
                        </div>
                        <div class="mb-1">
                            <label for="image-alt" class="form-label">Alt Text <div class="d-inline text-danger"
                                    id="edit-alert-alt"></div>
                            </label>
                            <input type="text" class="form-control" id="edit-input-alt" name="image-alt"
                                placeholder="(up to 20 characters)" required value="${picToEdit.alt}">
                        </div>
                    </form>
                    <div class="d-block w-50 ms-2" id="previewImgContain">
                    <h6 class="mt-2">Preview image:</h6>
                    <img src="${picToEdit.url}" alt="${picToEdit.alt}"id="editImgPreview">
                    <div class="my-1">
                            <label for="image-location" class="form-label">Location <div class="d-inline text-danger" id="edit-alert-location"></div></label>
                            <input type="text" class="form-control" id="edit-input-location" name="image-location" placeholder="(Up to 15 characters)" required value="${picToEdit.location}">
                        </div>
                        <div class="mb-2">
                            <label for="edit-input-description">Description<div class="d-inline text-danger" id="edit-alert-description"></div></label>
                            <textarea class="form-control" maxlength="300" placeholder="Up to 300 characters" id="edit-input-description" style="height: 6.5rem; resize: none">${picToEdit.description}</textarea>
                        </div>
                        </div>
                </div>
                <button type="buttom" class="btn btn-outline-primary w-100 mb-2 mt-2"id = "editPicBtn" > Save changes </button>
                </div>`;


    let urlOk = true;
    let titleOk = true;
    let priceOk = true;
    let creditOk = true;
    let altOk = true;
    let locationOk = true;
    let descriptionOk = true;

    const EDITINPUTURL = document.getElementById("edit-input-url");
    const EDITINPUTTITLE = document.getElementById("edit-input-title");
    const EDITINPUTPRICE = document.getElementById("edit-input-price");
    const EDITINPUTCREDIT = document.getElementById("edit-input-credit");
    const EDITINPUTALT = document.getElementById("edit-input-alt");
    const EDITINPUTLOCATION = document.getElementById("edit-input-location");
    const EDITINPUTDESCRIPTION = document.getElementById("edit-input-description");
    const EDITALERTURL = document.getElementById("edit-alert-url");
    const EDITALERTTITLE = document.getElementById("edit-alert-title");
    const EDITALERTPRICE = document.getElementById("edit-alert-price");
    const EDITALERTCREDIT = document.getElementById("edit-alert-credit");
    const EDITALERTLOCATION = document.getElementById("edit-alert-location");
    const EDITALERTDESCRIPTION = document.getElementById("edit-alert-description");
    const EDITALERTALT = document.getElementById("edit-alert-alt");

    EDITINPUTURL.addEventListener("input", () => {
        urlOk = checkInput(EDITINPUTURL, EDITALERTURL, validateUrl(EDITINPUTURL.value), "Url")
        checkIfCanAble();
        if (urlOk) {
            document.getElementById("editImgPreview").src = EDITINPUTURL.value;
        }
    });
    EDITINPUTTITLE.addEventListener("input", () => {
        titleOk = checkInput(EDITINPUTTITLE, EDITALERTTITLE, validateTitle(EDITINPUTTITLE.value), "Title")
        checkIfCanAble();
    });
    EDITINPUTCREDIT.addEventListener("input", () => {
        creditOk = checkInput(EDITINPUTCREDIT, EDITALERTCREDIT, validateName(EDITINPUTCREDIT.value), "Credit")
        checkIfCanAble();
    });
    EDITINPUTALT.addEventListener("input", () => {
        if (EDITINPUTALT.value.length < 20) {
            EDITALERTALT.innerHTML = "";
            EDITINPUTALT.classList.remove("is-invaild");
            altOk = true
        } else {
            EDITALERTALT.innerHTML = "Alt text is too long";
            EDITINPUTALT.classList.add("is-invaild");
            altOk = false
        }
        checkIfCanAble();
    });
    EDITINPUTPRICE.addEventListener("input", () => {
        if (EDITINPUTPRICE.value) {
            EDITALERTPRICE.innerHTML = "";
            EDITINPUTPRICE.classList.remove("is-invaild");
            priceOk = true
        } else {
            EDITALERTPRICE.innerHTML = "Please set a price";
            EDITINPUTPRICE.classList.add("is-invaild");
            priceOk = false
        }
        checkIfCanAble();
    })
    EDITINPUTLOCATION.addEventListener("input", () => {
        if (EDITINPUTLOCATION.value.length < 20) {
            EDITALERTLOCATION.innerHTML = "";
            EDITINPUTLOCATION.classList.remove("is-invaild");
            locationOk = true
        } else {
            EDITALERTLOCATION.innerHTML = "Location text is too long";
            EDITINPUTLOCATION.classList.add("is-invaild");
            locationOk = false
        }
        checkIfCanAble();
    });
    EDITINPUTDESCRIPTION.addEventListener("input", () => {
        if (EDITINPUTDESCRIPTION.value) {
            EDITALERTDESCRIPTION.innerHTML = "";
            EDITINPUTDESCRIPTION.classList.remove("is-invaild");
            descriptionOk = true
        } else {
            EDITALERTDESCRIPTION.innerHTML = "Please set a Description";
            EDITINPUTDESCRIPTION.classList.add("is-invaild");
            descriptionOk = false
        }
        checkIfCanAble();
    })

    const checkIfCanAble = () => {
        EDITPICBTN.disabled = !(urlOk && titleOk && creditOk && priceOk && altOk && locationOk && descriptionOk)
    }

    const EDITPICBTN = document.getElementById("editPicBtn");

    EDITPICBTN.addEventListener("click", () => {
        picToEdit.url = EDITINPUTURL.value;
        picToEdit.title = EDITINPUTTITLE.value;
        picToEdit.price = EDITINPUTPRICE.value;
        picToEdit.credit = EDITINPUTCREDIT.value;
        picToEdit.alt = EDITINPUTALT.value;
        picToEdit.location = EDITINPUTLOCATION.value;
        picToEdit.description = EDITINPUTDESCRIPTION.value;
        editPic(picToEdit);
        POPUPCONTAINER.classList.add("d-none");
        POPUPCONTAINER.innerHTML = "";
    });
}

// Define a function called initialBuyBtn that does the following:
const initialBuyBtn = () => {
    // Select all elements that have an id starting with "buyBtn" using querySelectorAll, then iterate over each element using forEach and add a click event listener to each of them that does the following:
    document.querySelectorAll("[id^=buyBtn]").forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove the "d-none" class from the element with the id "POPUPCONTAINER"
            POPUPCONTAINER.classList.remove("d-none");
            // Set the innerHTML of the element with the id "POPUPCONTAINER" to the following string:
            POPUPCONTAINER.innerHTML = `
                <div class="text-center p-3 rounded-3">
                    <button type="button" class="btn-close mb-3" aria-label="Close" id="closeAddPopup"></button>
                    <h3>Hi!</h3>
                    <h4>It's not a real website...</h4>
                    <h5>See you in the next projects <i class="bi bi-emoji-smile-fill text-warning"></i></h5>
                </div>
            `;
        });
    });
}


export { initialDeletePopup, initialEditPopup };


