import User from "../models/User.js";
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";
import validateEmail from "../validation/validateEmail.js";

const registerInputName = document.getElementById("register-input-name");
const registerInputEmail = document.getElementById("register-input-email");
const registerInputPassword = document.getElementById("register-input-password");
const registerBtn = document.getElementById("register-btn");
const registerAlertName = document.getElementById("register-alert-name");
const registerAlertEmail = document.getElementById("register-alert-email");
const registerAlertPassword = document.getElementById("register-alert-password");

let nameOk;
let emailOk;
let passwordOk;

const checkInput = (inputToCheck, alert, errorArr) => {
    if (errorArr.length === 0) {
        inputToCheck.classList.remove("is-invalid");
        alert.classList.add("d-none")
        return true;
    } else {
        inputToCheck.classList.add("is-invalid")
        alert.classList.remove("d-none")
        alert.innerHTML = errorArr.join("<br>");
        return false;
    }
}

const checkIfCanAbledBtn = () => {
    registerBtn.disabled = (!(nameOk && emailOk && passwordOk));
}

window.addEventListener("load", () => {
    if (registerInputName.value) {
        nameOk = checkInput(registerInputName, registerAlertName, validateName(registerInputName.value));
        checkIfCanAbledBtn();
    }
    if (registerInputEmail.value) {
        emailOk = checkInput(registerInputEmail, registerAlertEmail, validateEmail(registerInputEmail.value));
        checkIfCanAbledBtn();
    }
    if (registerInputPassword.value) {
        passwordOk = checkInput(registerInputPassword, registerAlertPassword, validatePassword(registerInputPassword.value));
        checkIfCanAbledBtn();
    }
},
    { once: true }
)

registerInputName.addEventListener("input", () => {
    nameOk = checkInput(registerInputName, registerAlertName, validateName(registerInputName.value));
    checkIfCanAbledBtn();
});
registerInputEmail.addEventListener("input", () => {
    emailOk = checkInput(registerInputEmail, registerAlertEmail, validateEmail(registerInputEmail.value));
    checkIfCanAbledBtn();
});
registerInputPassword.addEventListener("input", () => {
    passwordOk = checkInput(registerInputPassword, registerAlertPassword, validatePassword(registerInputPassword.value));
    checkIfCanAbledBtn();
});

registerBtn.addEventListener("click", () => {
    if (!(nameOk && emailOk && passwordOk)) {
        return;
    }
    let usersArr = localStorage.getItem("users");
    usersArr = [...usersArr,
    ]
})
