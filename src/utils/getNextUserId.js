/* funtction that get the next user id from local storge and set the new one */
const getNextUserId = () => {
    let nextUserId = localStorage.getItem("nextUserId");
    if (!nextUserId) {
        nextUserId = 2;//Because in the json file of the predefined images, there is already an Id  0 and 1
    }
    nextUserId = +nextUserId;
    localStorage.setItem("nextUserId", (nextUserId + 1) + "");
    return nextUserId;
}

export default getNextUserId;