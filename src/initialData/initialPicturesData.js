import Picture from "../models/Picture.js"

const createPicData = () => {
    return [
        new Picture("https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg", "The Majesty of Nature", 500, "Gadi from Pixabay", "Forest landscape in Eretz Yisrael"),
        new Picture("https://cdn.pixabay.com/photo/2020/03/13/14/06/dead-sea-4927978_1280.jpg", "The Lowest Point on Earth", 1500, "Svetlana from Pixabay", "Dead Sea landscape"),
        new Picture("https://cdn.pixabay.com/photo/2015/05/21/00/08/wailing-wall-776366_1280.jpg", "The Western Wall", 3000, "Aleks from Pixabay", "Western Wall, Jerusalem, Israel"),
    ]
}

const setInitialPicsData = () => {
    if (localStorage.getItem("pics")) {
        return;
    }
    localStorage.setItem("pics", JSON.stringify(createPicData()))
}

setInitialPicsData();

