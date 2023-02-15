/*IMPORTS*/
import User from "../models/User.js";
import UserAddress from "../models/UserAddress.js"
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";
import validateEmail from "../validation/validateEmail.js";
import checkInput from "../utils/checkInput.js";

/* SET ELEMNTS TO VARIBELS */
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

/* set boolean varibels that holds true if the validation is correct */
let firstNameOk;
let lastNameOk;
let emailOk;
let passwordOk;
let rePasswordOk;

/* function that  able the register btn if everythings is in right place*/
const checkIfCanAbledBtn = () => {
    registerBtn.disabled = (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk));
}

/* when the page load, do the validation for inputs that have a value */
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

/* do validation for every required inputs when typing in them */
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

/* create new user when click on the register btn (more deatels inside the function) */
registerBtn.addEventListener("click", () => {
    if (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk)) {
        //if someone try to able the btn from devTool
        return;
    }
    //get the users array from local storge
    let usersArr = JSON.parse(localStorage.getItem("users"));
    if (!usersArr) {
        //if there no any user, creat the arrary.
        usersArr = [createUser()];
    } else {
        for (let user of usersArr) {
            if (user.email === registerInputEmail.value) {
                //check if the ameil is exist and print correct msg
                registerAlertEmail.innerHTML = `This email is exist`;
                registerInputEmail.classList.add("is-invalid");
                return;
            }
        }
        //if there is alredy array of users, and the email isn't exist, add new user to the array.
        usersArr = [...usersArr, createUser()];
    }
    //save the array to the local storge.
    localStorage.setItem("users", JSON.stringify(usersArr));
})

/* clear all inputs in the form when click on the clear btn */
document.getElementById("register-clear-btn").addEventListener("click", () => {
    document.getElementById("register-form").querySelectorAll("input").forEach((item) => { item.value = "" });
});

/* that function return a new user that create with the classes User and UserAdress and get thw values of the form inputs */
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
