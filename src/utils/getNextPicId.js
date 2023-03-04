/* funtction that get the next pic id from local storge and set the new one */
const getNextPicId = () => {
    let nextPicId = localStorage.getItem("nextPicId");
    if (!nextPicId) {
        nextPicId = 3; //Because in the json file of the predefined images, there is already an Id from 0 to 2
    }
    nextPicId = +nextPicId;
    localStorage.setItem("nextPicId", (nextPicId + 1) + "");
    return nextPicId;
}

export default getNextPicId;