const checkIfConnected = () => {
    let userToken = localStorage.getItem("userToken");
    if (!userToken) {
        return false;
    }
    return true;
};

export default checkIfConnected;