import PAGES from "../models/PageModel.js";
import { switchPage } from "../routes/router.js";
import User from "../models/User.js";
import UserAddress from "../models/UserAddress.js";
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";
import validateEmail from "../validation/validateEmail.js";
import checkInput from "../utils/checkInput.js";

const PROFILEPROFILEFORM = document.getElementById("profile-form");
const PROFILEBTN = document.getElementById("profile-btn");
const PROFILEINPUTFIRSTNAME = document.getElementById("profile-input-firstName");
const PROFILEINPUTLASTNAME = document.getElementById("profile-input-lastName");
const PROFILEINPUTEMAIL = document.getElementById("profile-input-email");
const PROFILEINPUTPASSWORD = document.getElementById("profile-input-password");
const PROFILEINPUTREPASSWORD = document.getElementById("profile-input-rePassword");
const PROFILEALERTEMAIL = document.getElementById("profile-alert-email");
const PROFILEALERTPASSWORD = document.getElementById("profile-alert-password");
const PROFILEALERTREPASSWORD = document.getElementById("profile-alert-rePassword");
const PROFILEALERTFIRSTNAME = document.getElementById("profile-alert-firstName");
const PROFILEALERTLASTNAME = document.getElementById("profile-alert-lastName");



let firstNameOk;
let lastNameOk;
let emailOk;
let passwordOk;

const checkIfCanAbledBtn = () => {
    PROFILEBTN.disabled = (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk));
}

window.addEventListener("load", () => {
    let userToken = JSON.parse(localStorage.getItem("userToken"));
    if (!userToken) {
        //if some one come here without account
        PROFILEPROFILEFORM.classList.add("d-none");
        return;
    }
    PROFILEINPUTFIRSTNAME.value = clearUndefind(userToken.firstName);
    PROFILEINPUTLASTNAME.value = clearUndefind(userToken.lastName);
    document.getElementById("profile-input-state").value = clearUndefind(userToken.state);
    document.getElementById("profile-input-city").value = clearUndefind(userToken.city);
    document.getElementById("profile-input-country").value = clearUndefind(userToken.country);
    document.getElementById("profile-input-street").value = clearUndefind(userToken.street);
    document.getElementById("profile-input-houseNumber").value = clearUndefind(userToken.houseNumber);
    document.getElementById("profile-input-zipCode").value = clearUndefind(userToken.zipCode);
    PROFILEINPUTEMAIL.value = clearUndefind(userToken.email);
    PROFILEINPUTPASSWORD.value = clearUndefind(userToken.password);
    document.getElementById("profile-input-phone").value = clearUndefind(userToken.phone);
    document.getElementById("profile-input-isAdmin").checked = clearUndefind(userToken.isAdmin);
})

const clearUndefind = (value) => {
    if (value) {
        return value;
    } else {
        return "";
    }
}

PROFILEINPUTFIRSTNAME.addEventListener("input", () => {
    firstNameOk = checkInput(PROFILEINPUTFIRSTNAME, PROFILEALERTFIRSTNAME, validateName(PROFILEINPUTFIRSTNAME.value), "First name");
    checkIfCanAbledBtn();
})
PROFILEINPUTLASTNAME.addEventListener("input", () => {
    lastNameOk = checkInput(PROFILEINPUTLASTNAME, PROFILEALERTLASTNAME, validateName(PROFILEINPUTLASTNAME.value), "Last name")
    checkIfCanAbledBtn();
})
PROFILEINPUTEMAIL.addEventListener("input", () => {
    emailOk = checkInput(PROFILEINPUTEMAIL, PROFILEALERTEMAIL, validateEmail, "Email")
    checkIfCanAbledBtn();
})
PROFILEINPUTPASSWORD.addEventListener("input", () => {
    passwordOk = checkInput(PROFILEINPUTPASSWORD, PROFILEALERTPASSWORD, validatePassword, "Password")
    checkIfCanAbledBtn();
})
PROFILEINPUTREPASSWORD.addEventListener("input", () => {
    checkInput(PROFILEINPUT, PROFILEALERT, validate, "")
})

PROFILEBTN.addEventListener("click", () => { })