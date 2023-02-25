/* funtction that get the next pic id from local storge and set the new one */
const getNextPicId = () => {
    let nextPicId = localStorage.getItem("nextPicId");
    if (!nextPicId) {
        nextPicId = 0;
    }
    nextPicId = +nextPicId;
    localStorage.setItem("nextPicId", (nextPicId + 1) + "");
    return nextPicId;
}

export default getNextPicId;