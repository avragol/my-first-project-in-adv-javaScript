import checkInput from "../utils/checkInput.js";
import validateTitle from "../validation/validateTitle.js";
import validateUrl from "../validation/validateUrl.js";
import validateName from "../validation/validateName.js";


const POPUPCONTAINER = document.getElementById("modularPopup");

const initialEditPopup = (idToEdit, picsArr, editPic) => {
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

export default initialEditPopup;