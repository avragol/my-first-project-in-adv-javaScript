let picsArr;
let isAdmin;

const CARDSPICS = document.getElementById("cardsPics");

const initialCards = (picsArrFromHomePage, isAdminFromHomePage) => {
    picsArr = picsArrFromHomePage;
    isAdmin = isAdminFromHomePage;
    createCardsGallery();
}

const createCardItem = (isAdmin, url, alt, title, credit, price, picId) => {
    return `
    <div class="card m-2 p-2" style="width: 18rem;">
                        <img src="${url}" class="card-img-top"
                            alt="${alt}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">Picture by ${credit}.</p>
                            <ul class="list-group list-group-flush border rounded">
                                <li class="list-group-item border">Price: ${price}$</li>
                            </ul>
                            <div class="d-flex justify-content-around mt-3">
                                <a href="#" class="btn btn-success text-center" id="buyBtn-${picId}">Buy now!</a>
                                ${isAdmin ? initialAdminBtns(picId) : ""}
                            </div>
                        </div>
                    </div>
    `
};

const createCardsGallery = () => {
    let innerStr = "";
    for (let pic of picsArr) {
        innerStr += createCardItem(isAdmin, pic.url, pic.alt, pic.title, pic.credit, pic.price, pic.picId);
    }
    CARDSPICS.innerHTML = innerStr;
}

const initialAdminBtns = (picId) => {
    return `
    <a href="#" class="btn btn-warning text-center" id="editBtn-${picId}">Edit</a>
    <a href="#" class="btn btn-danger text-center" id="deleteBtn-${picId}">Delete</a>
    `
}

export default initialCards;