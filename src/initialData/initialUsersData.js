import User from "../models/User.js";

const createUserData = () => {
    return [
        new User("Avi", "avi@avi.il", "Aa123456!", true),
        new User("Bvi", "bvi@bvi.il", "Aa123456!")
    ];
}

const setInitialUsersData = () => {
    console.log("ping");
    if (localStorage.getItem("users")) {
        return;
    }
    localStorage.setItem("users", JSON.stringify(createUserData()))
}

setInitialUsersData();