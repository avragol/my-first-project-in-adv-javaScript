import PAGES from "../models/PageModel.js";
import { switchPage } from "../routes/router.js";
import User from "../models/User.js";
import UserAddress from "../models/UserAddress.js";
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";
import validateEmail from "../validation/validateEmail.js";
import checkInput from "../utils/checkInput.js";

const PROFILEPROFILEFORM = document.getElementById("profile-form");
const PROFILESAVEBTN = document.getElementById("profile-save-btn");
const PROFILECLEARBTN = document.getElementById("profile-clear-btn");
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

let userToken;

let firstNameOk;
let lastNameOk;
let emailOk;
let passwordOk;
let rePasswordOk = true;

const checkIfCanAbledBtn = () => {
    PROFILESAVEBTN.disabled = (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk));
}

window.addEventListener("load", () => {
    userToken = JSON.parse(localStorage.getItem("userToken"));
    if (!userToken) {
        //if some one come here without account
        PROFILEPROFILEFORM.classList.add("d-none");
        return;
    }
    PROFILEINPUTFIRSTNAME.value = userToken.firstName;
    PROFILEINPUTLASTNAME.value = userToken.lastName;
    document.getElementById("profile-input-state").value = userToken.address.state;
    document.getElementById("profile-input-city").value = userToken.address.city;
    document.getElementById("profile-input-country").value = userToken.address.country;
    document.getElementById("profile-input-street").value = userToken.address.street;
    document.getElementById("profile-input-houseNumber").value = userToken.address.houseNumber;
    document.getElementById("profile-input-zipCode").value = userToken.address.zipCode;
    PROFILEINPUTEMAIL.value = userToken.email;
    PROFILEINPUTPASSWORD.value = userToken.password;
    document.getElementById("profile-input-phone").value = userToken.phone;
    document.getElementById("profile-input-isAdmin").checked = userToken.isAdmin;

    firstNameOk = checkInput(PROFILEINPUTFIRSTNAME, PROFILEALERTFIRSTNAME, validateName(PROFILEINPUTFIRSTNAME.value), "First name");
    lastNameOk = checkInput(PROFILEINPUTLASTNAME, PROFILEALERTLASTNAME, validateName(PROFILEINPUTLASTNAME.value), "Last name");
    emailOk = checkInput(PROFILEINPUTEMAIL, PROFILEALERTEMAIL, validateEmail(PROFILEINPUTEMAIL.value), "Email");
    passwordOk = checkInput(PROFILEINPUTPASSWORD, PROFILEALERTPASSWORD, validatePassword(PROFILEINPUTPASSWORD.value), "Password");
    checkIfCanAbledBtn();
})


PROFILEINPUTFIRSTNAME.addEventListener("input", () => {
    firstNameOk = checkInput(PROFILEINPUTFIRSTNAME, PROFILEALERTFIRSTNAME, validateName(PROFILEINPUTFIRSTNAME.value), "First name");
    checkIfCanAbledBtn();
})
PROFILEINPUTLASTNAME.addEventListener("input", () => {
    lastNameOk = checkInput(PROFILEINPUTLASTNAME, PROFILEALERTLASTNAME, validateName(PROFILEINPUTLASTNAME.value), "Last name");
    checkIfCanAbledBtn();
})
PROFILEINPUTEMAIL.addEventListener("input", () => {
    emailOk = checkInput(PROFILEINPUTEMAIL, PROFILEALERTEMAIL, validateEmail(PROFILEINPUTPASSWORD.value), "Email");
    checkIfCanAbledBtn();
})
PROFILEINPUTPASSWORD.addEventListener("input", () => {
    passwordOk = checkInput(PROFILEINPUTPASSWORD, PROFILEALERTPASSWORD, validatePassword(PROFILEINPUTPASSWORD.value), "Password");
    checkRePassword();
    checkIfCanAbledBtn();
})
PROFILEINPUTREPASSWORD.addEventListener("input", () => {
    checkRePassword();
    checkIfCanAbledBtn();
})

const checkRePassword = () => {
    if (PROFILEINPUTREPASSWORD.value === PROFILEINPUTPASSWORD.value) {
        PROFILEINPUTREPASSWORD.classList.remove("is-invalid");
        PROFILEALERTREPASSWORD.classList.add("d-none");
        rePasswordOk = true;
    } else {
        PROFILEINPUTREPASSWORD.classList.add("is-invalid");
        PROFILEALERTREPASSWORD.classList.remove("d-none");
        rePasswordOk = false;
    }
}

PROFILESAVEBTN.addEventListener("click", () => {
    if (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk)) {
        return;
    }
    let usersArr = JSON.parse(localStorage.getItem("users"));
    for (let user of usersArr) {
        if (user.userId === userToken.userId) {
            user.firstName = PROFILEINPUTFIRSTNAME.value;
            user.lastName = PROFILEINPUTLASTNAME.value;
            user.address.stste = document.getElementById("profile-input-state").value;
            user.address.city = document.getElementById("profile-input-city").value;
            user.address.country = document.getElementById("profile-input-country").value;
            user.address.street = document.getElementById("profile-input-street").value;
            user.address.houseNumber = document.getElementById("profile-input-houseNumber").value;
            user.address.zipCode = document.getElementById("profile-input-zipCode").value
            user.email = PROFILEINPUTEMAIL.value;
            user.password = PROFILEINPUTPASSWORD.value;
            user.phone = document.getElementById("profile-input-phone").value;
            user.isAdmin = document.getElementById("profile-input-isAdmin").checked;

            localStorage.setItem("userToken", JSON.stringify(user));
        }
    }
    localStorage.setItem("users", JSON.stringify(usersArr));
    location.reload();
});

PROFILECLEARBTN.addEventListener("click", () => { location.reload() });

