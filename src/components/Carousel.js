const createCarouselItem = (url, title, credit, alt) => {
    return `
    <div class="carousel-inner">
                        <div class="carousel-item" data-bs-interval="5000">
                            <img src="${url}"
                                class="d-block w-100" alt="${alt}">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${title}</h5>
                                <p>Picture by ${credit}</p>
                            </div>
                        </div>
    `
}