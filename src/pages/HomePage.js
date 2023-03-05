// Imports
import initialCarousel from "../components/Carousel.js";
import { initialCards } from "../components/PicsCards.js";
import initialTable from "../components/PicsTable.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";
import { createBtnEventListener } from "../utils/initialAdminBtns.js";

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
    createBtnEventListener(picsArr, deletePicFinaly, editPic);
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
    createBtnEventListener(picsArr, deletePicFinaly, editPic);
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
    picsArr = picsArr.filter((item) => item.picId != idToDel);
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




