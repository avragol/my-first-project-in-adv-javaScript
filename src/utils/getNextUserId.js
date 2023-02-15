/* funtction that get the next user id from local storge and set the new one */
const getNextUserId = () => {
    let nextUserId = localStorage.getItem("nextUserId");
    if (!nextUserId) {
        nextUserId = 0;
    }
    nextUserId = +nextUserId;
    localStorage.setItem("nextUserId", (nextUserId + 1) + "");
    return nextUserId;
}

export default getNextUserId;