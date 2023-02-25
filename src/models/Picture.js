import getNextPicId from "../utils/getNextPicId.js";

class Picture {
    constructor(url, title, price, credit, alt) {
        this.picId = getNextPicId();
        this.url = url;
        this.title = title;
        this.price = price;
        this.credit = credit;
        this.alt = alt;
    }
};

export default Picture;