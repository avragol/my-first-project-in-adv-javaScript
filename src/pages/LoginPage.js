import { switchPage } from "../routes/router.js";
import PAGES from "../models/PageModel.js";
import checkInput from "../utils/checkInput.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";

const loginForm = document.getElementById("login-form");
const linkToRegisterPage = document.getElementById("takeFromLogToSign");
const loginInputEmail = document.getElementById("login-input-email");
const loginInputPassword = document.getElementById("login-input-password");
const loginAlertEmail = document.getElementById("login-alert-email");
const loginAlertPassword = document.getElementById("login-alert-password");
const loginBtn = document.getElementById("login-btn");
const loginAlert = document.getElementById("login-alert");

let emailOk, passwordOk;

linkToRegisterPage.addEventListener("click", () => {
    switchPage(PAGES.REGISTER);
})

const checkIfCanAbledBtn = () => {
    loginBtn.disabled = (!(emailOk && passwordOk));
}

loginInputEmail.addEventListener("input", () => {
    emailOk = checkInput(loginInputEmail, loginAlertEmail, validateEmail(loginInputEmail.value), "Email");
    checkIfCanAbledBtn();
});
loginInputPassword.addEventListener("input", () => {
    passwordOk = checkInput(loginInputPassword, loginAlertPassword, validatePassword(loginInputPassword.value), "Password");
    checkIfCanAbledBtn();
});

loginBtn.addEventListener("click", () => {
    if (!(emailOk && passwordOk)) {
        return
    }
    let usersArr = JSON.parse(localStorage.getItem("users"));
    let token;
    usersArr.forEach((user) => {
        if (user.email === loginInputEmail.value && user.password === loginInputPassword.value) {
            token = { ...user };
        }
    });
    if (!token) {
        loginAlert.innerHTML = `Email or password not found`;
        loginForm.classList.add("border");
        loginForm.classList.add("border-danger");
        loginForm.classList.add("bg-danger-subtle");
    } else {
        localStorage.setItem("userToken", JSON.stringify(token));
        location.reload();
    }
})
