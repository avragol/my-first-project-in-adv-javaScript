import getNextPicId from "../utils/getNextPicId.js";
import getDate from "../utils/getDate.js";

class Picture {
    constructor(url, title, price, credit, alt, location, description) {
        this.picId = getNextPicId();
        this.createdAt = getDate();
        this.url = url;
        this.title = title;
        this.location = location;
        this.description = description
        this.price = price;
        this.credit = credit;
        this.alt = alt;
    }
};

export default Picture;