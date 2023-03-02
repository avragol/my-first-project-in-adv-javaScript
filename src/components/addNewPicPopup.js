import validateUrl from "../validation/validateUrl.js";
import validateTitle from "../validation/validateTitle.js";
import validateName from "../validation/validateName.js";
import checkInput from "../utils/checkInput.js";
import Picture from "../models/Picture.js"

const POPUPCONTAINER = document.getElementById("modularPopup");

let urlOk;
let titleOk;
let priceOk;
let creditOk;
let altOk;
let locationOk;
let descriptionOk;

const initialAddNewPicPopup = () => {
    POPUPCONTAINER.classList.remove("d-none");
    POPUPCONTAINER.innerHTML = `
        <div id="addNewPicPopup" class="rounded-2">
                    <button type="button" class="btn-close ms-" aria-label="Close" id="closeAddPopup"></button>
                    <h2 class="display-6">Add your wonderful picture!</h2>
                    <h4 class="h6">Fill in your photo details and let the talent burst out</h4>
                    <form>
                    <div class="mb-1">
                            <label for="image-url" class="form-label">Image URL <div class="d-inline text-danger" id="add-alert-url"></div></label>
                            <input type="text" class="form-control" id="add-input-url" name="image-url" placeholder="(Valid url)" required>
                        </div>
                    <div class="row">
                        <div class="mb-1 col-md-6">
                            <label for="image-title" class="form-label">Title <div class="d-inline text-danger" id="add-alert-title"></div></label>
                            <input type="text" class="form-control" id="add-input-title" name="image-title" placeholder="(Start with a capital letter, up to 30 characters)" required>
                        </div>
                        <div class="mb-1 col-md-6">
                           <label for="image-alt" class="form-label">Alt Text <div class="d-inline text-danger" id="add-alert-alt"></div></label>
                            <input type="text" class="form-control" id="add-input-alt" name="image-alt" placeholder="(up to 20 characters)" required>
                        </div>
                        </div>
                        <div class="row">
                        <div class="mb-1 col-md-4">
                            <label for="image-price" class="form-label">Price <div class="d-inline text-danger" id="add-alert-price"></div></label>
                            <input type="number" class="form-control" id="add-input-price" name="image-price" required>
                        </div>
                        <div class="mb-1 col-md-4">
                            <label for="image-credit" class="form-label">Credit <div class="d-inline text-danger" id="add-alert-credit"></div></label>
                            <input type="text" class="form-control" id="add-input-credit" name="image-credit" placeholder="(Start with a capital letter, up to 15 characters)" required>
                        </div>
                        <div class="mb-1 col-md-4">
                            <label for="image-location" class="form-label">Location <div class="d-inline text-danger" id="add-alert-location"></div></label>
                            <input type="text" class="form-control" id="add-input-location" name="image-location" placeholder="(Up to 15 characters)" required>
                        </div>
                        <div class="mb-2">
                            <label for="add-input-description">Description<div class="d-inline text-danger" id="add-alert-description"></div></label>
                            <textarea class="form-control" maxlength="300" placeholder="Up to 300 characters" id="add-input-description" style="height: 6.5rem; resize: none"></textarea>
                        </div>
                        <button type="buttom" class="btn btn-outline-primary w-100 mb-2" disabled="true" id="addPicBtn">Submit</button>
                        <button type="buttom" class="btn btn-outline-danger w-100" id="cencelAddPopup">Cancel</button>
                    </form>
                </div>
    `
    const ADDINPUTURL = document.getElementById("add-input-url");
    const ADDINPUTTITLE = document.getElementById("add-input-title");
    const ADDINPUTPRICE = document.getElementById("add-input-price");
    const ADDINPUTCREDIT = document.getElementById("add-input-credit");
    const ADDINPUTALT = document.getElementById("add-input-alt");
    const ADDINPUTLOCATION = document.getElementById("add-input-location");
    const ADDINPUTDESCRIPTION = document.getElementById("add-input-description");
    const ADDALERTURL = document.getElementById("add-alert-url");
    const ADDALERTTITLE = document.getElementById("add-alert-title");
    const ADDALERTPRICE = document.getElementById("add-alert-price");
    const ADDALERTCREDIT = document.getElementById("add-alert-credit");
    const ADDALERTALT = document.getElementById("add-alert-alt");
    const ADDALERTLOCATION = document.getElementById("add-alert-location");
    const ADDALERTDESCRIPTION = document.getElementById("add-alert-description");
    const ADDPICBTN = document.getElementById("addPicBtn");

    ADDINPUTURL.addEventListener("input", () => {
        urlOk = checkInput(ADDINPUTURL, ADDALERTURL, validateUrl(ADDINPUTURL.value), "Url")
        checkIfCanAble();
    });
    ADDINPUTTITLE.addEventListener("input", () => {
        titleOk = checkInput(ADDINPUTTITLE, ADDALERTTITLE, validateTitle(ADDINPUTTITLE.value), "Title")
        checkIfCanAble();
    });
    ADDINPUTCREDIT.addEventListener("input", () => {
        creditOk = checkInput(ADDINPUTCREDIT, ADDALERTCREDIT, validateName(ADDINPUTCREDIT.value), "Credit")
        checkIfCanAble();
    });
    ADDINPUTALT.addEventListener("input", () => {
        if (ADDINPUTALT.value.length < 20) {
            ADDALERTALT.innerHTML = "";
            ADDINPUTALT.classList.remove("is-invaild");
            altOk = true
        } else {
            ADDALERTALT.innerHTML = "Alt text is too long";
            ADDINPUTALT.classList.add("is-invaild");
            altOk = false
        }
        checkIfCanAble();
    });
    ADDINPUTLOCATION.addEventListener("input", () => {
        if (ADDINPUTLOCATION.value.length < 20) {
            ADDALERTLOCATION.innerHTML = "";
            ADDINPUTLOCATION.classList.remove("is-invaild");
            locationOk = true
        } else {
            ADDALERTLOCATION.innerHTML = "Location text is too long";
            ADDINPUTLOCATION.classList.add("is-invaild");
            locationOk = false
        }
        checkIfCanAble();
    });
    ADDINPUTPRICE.addEventListener("input", () => {
        if (ADDINPUTPRICE.value) {
            ADDALERTPRICE.innerHTML = "";
            ADDINPUTPRICE.classList.remove("is-invaild");
            priceOk = true
        } else {
            ADDALERTPRICE.innerHTML = "Please set a price";
            ADDINPUTPRICE.classList.add("is-invaild");
            priceOk = false
        }
        checkIfCanAble();
    })
    ADDINPUTDESCRIPTION.addEventListener("input", () => {
        if (ADDINPUTDESCRIPTION.value) {
            ADDALERTDESCRIPTION.innerHTML = "";
            ADDINPUTDESCRIPTION.classList.remove("is-invaild");
            descriptionOk = true
        } else {
            ADDALERTDESCRIPTION.innerHTML = "Please set a Description";
            ADDINPUTDESCRIPTION.classList.add("is-invaild");
            descriptionOk = false
        }
        checkIfCanAble();
    })

    const checkIfCanAble = () => {
        ADDPICBTN.disabled = !(urlOk && titleOk && creditOk && priceOk && altOk && locationOk && descriptionOk)
        console.log("des: " + descriptionOk);
        console.log("loc " + locationOk);
    }

    ADDPICBTN.addEventListener("click", () => {
        let picsArr = JSON.parse(localStorage.getItem("pics"));
        if (!picsArr) {
            picsArr = [new Picture(
                ADDINPUTURL.value,
                ADDINPUTTITLE.value,
                ADDINPUTPRICE.value,
                ADDINPUTCREDIT.value,
                ADDINPUTALT.value,
                ADDINPUTLOCATION.value,
                ADDINPUTDESCRIPTION.value
            ),];
        } else {
            picsArr = [...picsArr, new Picture(
                ADDINPUTURL.value,
                ADDINPUTTITLE.value,
                ADDINPUTPRICE.value,
                ADDINPUTCREDIT.value,
                ADDINPUTALT.value,
                ADDINPUTLOCATION.value,
                ADDINPUTDESCRIPTION.value
            ),];
        }
        localStorage.setItem("pics", JSON.stringify(picsArr));
        location.reload();
    })
};

window.addEventListener("load", () => {
    POPUPCONTAINER.addEventListener("click", (ev) => {
        if (ev.target.id !== "modularPopup" &&
            ev.target.id !== "closeAddPopup" &&
            ev.target.id !== "cencelAddPopup") {
            return;
        }
        POPUPCONTAINER.classList.add("d-none");
        POPUPCONTAINER.innerHTML = "";
    })
});





export default initialAddNewPicPopup;