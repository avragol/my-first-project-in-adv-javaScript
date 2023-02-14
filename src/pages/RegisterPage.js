import User from "../models/User.js";
import UserAddress from "../models/UserAddress.js"
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";
import validateEmail from "../validation/validateEmail.js";


const registerInputFirstName = document.getElementById("register-input-firstName");
const registerInputLastName = document.getElementById("register-input-lastName");
const registerInputEmail = document.getElementById("register-input-email");
const registerInputPassword = document.getElementById("register-input-password");
const registerInputRePassword = document.getElementById("register-input-rePassword");
const registerBtn = document.getElementById("register-btn");
const registerAlertEmail = document.getElementById("register-alert-email");
const registerAlertPassword = document.getElementById("register-alert-password");
const registerAlertRePassword = document.getElementById("register-alert-rePassword");
const registerAlertFirstName = document.getElementById("register-alert-firstName");
const registerAlertLastName = document.getElementById("register-alert-lastName");

let firstNameOk;
let lastNameOk;
let emailOk;
let passwordOk;
let rePasswordOk;

const checkInput = (inputToCheck, alert, errorArr, inputTitle = "It") => {
    if (errorArr.length === 0) {
        inputToCheck.classList.remove("is-invalid");
        alert.innerHTML = ``;
        return true;
    } else {
        inputToCheck.classList.add("is-invalid")
        alert.innerHTML = `${inputTitle} is ${errorArr.join(" and ")}`;
        return false;
    }
}

const checkIfCanAbledBtn = () => {
    registerBtn.disabled = (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk));
}


window.addEventListener("load", () => {
    if (registerInputFirstName.value) {
        firstNameOk = checkInput(registerInputFirstName, registerAlertFirstName, validateName(registerInputFirstName.value), "first Name");
    }
    if (registerInputLastName.value) {
        lastNameOk = checkInput(registerInputLastName, registerAlertLastName, validateName(registerInputLastName.value), "Last name");
    }
    if (registerInputEmail.value) {
        emailOk = checkInput(registerInputEmail, registerAlertEmail, validateEmail(registerInputEmail.value));
    }
    if (registerInputPassword.value) {
        passwordOk = checkInput(registerInputPassword, registerAlertPassword, validatePassword(registerInputPassword.value));
    }
    checkIfCanAbledBtn();
},
    { once: true }
)

registerInputFirstName.addEventListener("input", () => {
    firstNameOk = checkInput(registerInputFirstName, registerAlertFirstName, validateName(registerInputFirstName.value), "first Name");
    checkIfCanAbledBtn();
});
registerInputLastName.addEventListener("input", () => {
    lastNameOk = checkInput(registerInputLastName, registerAlertLastName, validateName(registerInputLastName.value), "Last name");
    checkIfCanAbledBtn();
});
registerInputEmail.addEventListener("input", () => {
    emailOk = checkInput(registerInputEmail, registerAlertEmail, validateEmail(registerInputEmail.value), "Email");
    checkIfCanAbledBtn();
});
registerInputPassword.addEventListener("input", () => {
    passwordOk = checkInput(registerInputPassword, registerAlertPassword, validatePassword(registerInputPassword.value), "Password");
    checkIfCanAbledBtn();
});
registerInputRePassword.addEventListener("input", () => {
    if (registerInputRePassword.value !== registerInputPassword.value) {
        registerAlertRePassword.classList.remove("d-none");
        rePasswordOk = false;
    } else {
        registerAlertRePassword.classList.add("d-none");
        rePasswordOk = true;
    }
    checkIfCanAbledBtn()
})

registerBtn.addEventListener("click", () => {
    if (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk)) {
        return;
    }
    let usersArr = JSON.parse(localStorage.getItem("users"));

    if (!usersArr) {
        usersArr = [createUser()];
    } else {
        for (let user of usersArr) {
            if (user.email === registerInputEmail.value) {
                registerAlertEmail.innerHTML = `This email is exist`;
                registerInputEmail.classList.add("is-invalid");
                return;
            }
        }
        usersArr = [...usersArr, createUser()];
    }
    localStorage.setItem("users", JSON.stringify(usersArr));
})

document.getElementById("register-clear-btn").addEventListener("click", () => {
    document.getElementById("register-form").querySelectorAll("input").forEach((item) => { item.value = "" });
});

const createUser = () => {
    return new User(
        registerInputFirstName.value,
        registerInputLastName.value,
        new UserAddress(
            document.getElementById("register-input-state").value,
            document.getElementById("register-input-city").value,
            document.getElementById("register-input-country").value,
            document.getElementById("register-input-street").value,
            document.getElementById("register-input-houseNumber").value,
            document.getElementById("register-input-zipCode").value
        ),
        registerInputEmail.value,
        registerInputPassword.value,
        document.getElementById("register-input-phone").value,
        document.getElementById("register-input-isAdmin").checked
    )
}
