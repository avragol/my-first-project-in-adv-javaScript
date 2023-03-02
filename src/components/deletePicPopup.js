const POPUPCONTAINER = document.getElementById("modularPopup");
let deletePicFinaly;
const initialDeletePopup = (idToDel, deletePicFinalyFunc) => {
    deletePicFinaly = deletePicFinalyFunc;
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