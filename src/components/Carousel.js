let picsArr;

const CAROUSELPICS = document.getElementById("carouselPics")

const initialCarousel = (picsArrFromHomePage) => {
    picsArr = picsArrFromHomePage;
    createCarousel();
}

const createCarouselItem = (active, url, title, credit, alt) => {
    return `
                        <div class="carousel-item ${active ? "active" : ""}" data-bs-interval="5000">
                            <img src="${url}"
                                class="d-block w-100" alt="${alt}">
                            <div class="carousel-caption">
                                <h5>${title}</h5>
                                <p>Picture by ${credit}</p>
                            </div>
                        </div>
    `
}

const createCarousel = () => {
    let innerStr = "";
    let active = true;
    for (let pic of picsArr) {
        innerStr += createCarouselItem(active, pic.url, pic.title, pic.credit, pic.alt);
        active = false;
    }
    CAROUSELPICS.innerHTML = innerStr;
}

export default initialCarousel;