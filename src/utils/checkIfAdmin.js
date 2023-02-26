const checkIfAdmin = () => {
    let userToken = localStorage.getItem("userToken");
    if (!userToken) {
        return false;
    }
    userToken = JSON.parse(userToken);
    return userToken.isAdmin;
};

export default checkIfAdmin;