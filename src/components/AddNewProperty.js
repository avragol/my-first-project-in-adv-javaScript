
const POPUPCONTAINER = document.getElementById("modularPopup");
const CLOSEBTN = document.getElementById("closeAddPopup");
const CENCELBTN = document.getElementById("cencelAddPopup");

const initialAddNewPicPopup = () => {
    POPUPCONTAINER.classList.remove("d-none");
    POPUPCONTAINER.innerHTML = `
        <div class="" id="addNewPicPopup">
                    <button type="button" class="btn-close" aria-label="Close" id="closeAddPopup"></button>
                    <h2 class="display-4">Add your wonderful picture!</h2>
                    <h4 class="display-6">Fill in your photo details and let the talent burst out</h4>
                    <form>
                        <div class="mb-3">
                            <label for="image-url" class="form-label">Image URL</label>
                            <input type="text" class="form-control" id="add-input-url" name="image-url" required>
                        </div>
                        <div class="mb-3">
                            <label for="image-title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="add-input-title" name="image-title" required>
                        </div>
                        <div class="mb-3">
                            <label for="image-price" class="form-label">Price</label>
                            <input type="number" class="form-control" id="add-input-price" name="image-price" required>
                        </div>
                        <div class="mb-3">
                            <label for="image-credit" class="form-label">Credit</label>
                            <input type="text" class="form-control" id="add-input-credit" name="image-credit" required>
                        </div>
                        <div class="mb-3">
                            <label for="image-alt" class="form-label">Alt Text</label>
                            <input type="text" class="form-control" id="add-input-alt" name="image-alt" required>
                        </div>
                        <button type="buttom" class="btn btn-outline-primary w-100 mb-2">Submit</button>
                        <button type="buttom" class="btn btn-outline-danger w-100" id="cencelAddPopup">Cancel</button>
                    </form>
                </div>
    `
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