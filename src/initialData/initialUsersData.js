import User from "../models/User.js";
import UserAddress from "../models/UserAddress.js";

const createUserData = () => {
    return [
        new User("Avi", "Levi", new UserAddress("", "", "Israel", "", 156, ""), "avi@levi.il", "Aa123456!", "", true),
        new User("Dani", "Gal", new UserAddress("", "", "Israel", "", 157, ""), "dani@gal.il", "Aa123456!", "", false)
    ];
}

const setInitialUsersData = () => {
    if (localStorage.getItem("users")) {
        return;
    }
    localStorage.setItem("users", JSON.stringify(createUserData()))
}

setInitialUsersData();