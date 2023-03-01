/*IMPORTS*/
import User from "../models/User.js";
import UserAddress from "../models/UserAddress.js";
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";
import validateEmail from "../validation/validateEmail.js";
import checkInput from "../utils/checkInput.js";
import { switchPage } from "../routes/router.js";
import PAGES from "../models/PageModel.js";

/* SET ELEMNTS TO VARIBELS */
const REGISTERINPUTFIRSTNAME = document.getElementById("register-input-firstName");
const REGISTERINPUTLASTNAME = document.getElementById("register-input-lastName");
const REGISTERINPUTEMAIL = document.getElementById("register-input-email");
const REGISTERINPUTPASSWORD = document.getElementById("register-input-password");
const REGISTERINPUTREPASSWORD = document.getElementById("register-input-rePassword");
const REGISTERBTN = document.getElementById("register-btn");
const REGISTERALERTEMAIL = document.getElementById("register-alert-email");
const REGISTERALERTPASSWORD = document.getElementById("register-alert-password");
const REGISTERALERTREPASSWORD = document.getElementById("register-alert-rePassword");
const REGISTERALERTFIRSTNAME = document.getElementById("register-alert-firstName");
const REGISTERALERTLASTNAME = document.getElementById("register-alert-lastName");

/* set boolean varibels that holds true if the validation is correct */
let firstNameOk;
let lastNameOk;
let emailOk;
let passwordOk;
let rePasswordOk;

/* function that  able the register btn if everythings is in right place*/
const checkIfCanAbledBtn = () => {
    REGISTERBTN.disabled = (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk));
}

/* when the page load, do the validation for inputs that have a value */
window.addEventListener("load", () => {
    if (REGISTERINPUTFIRSTNAME.value) {
        firstNameOk = checkInput(REGISTERINPUTFIRSTNAME, REGISTERALERTFIRSTNAME, validateName(REGISTERINPUTFIRSTNAME.value), "first Name");
    }
    if (REGISTERINPUTLASTNAME.value) {
        lastNameOk = checkInput(REGISTERINPUTLASTNAME, REGISTERALERTLASTNAME, validateName(REGISTERINPUTLASTNAME.value), "Last name");
    }
    if (REGISTERINPUTEMAIL.value) {
        emailOk = checkInput(REGISTERINPUTEMAIL, REGISTERALERTEMAIL, validateEmail(REGISTERINPUTEMAIL.value));
    }
    if (REGISTERINPUTPASSWORD.value) {
        passwordOk = checkInput(REGISTERINPUTPASSWORD, REGISTERALERTPASSWORD, validatePassword(REGISTERINPUTPASSWORD.value));
    }
    checkIfCanAbledBtn();
},
    { once: true }
)

/* do validation for every required inputs when typing in them */
REGISTERINPUTFIRSTNAME.addEventListener("input", () => {
    firstNameOk = checkInput(REGISTERINPUTFIRSTNAME, REGISTERALERTFIRSTNAME, validateName(REGISTERINPUTFIRSTNAME.value), "first Name");
    checkIfCanAbledBtn();
});
REGISTERINPUTLASTNAME.addEventListener("input", () => {
    lastNameOk = checkInput(REGISTERINPUTLASTNAME, REGISTERALERTLASTNAME, validateName(REGISTERINPUTLASTNAME.value), "Last name");
    checkIfCanAbledBtn();
});
REGISTERINPUTEMAIL.addEventListener("input", () => {
    emailOk = checkInput(REGISTERINPUTEMAIL, REGISTERALERTEMAIL, validateEmail(REGISTERINPUTEMAIL.value), "Email");
    checkIfCanAbledBtn();
});
REGISTERINPUTPASSWORD.addEventListener("input", () => {
    passwordOk = checkInput(REGISTERINPUTPASSWORD, REGISTERALERTPASSWORD, validatePassword(REGISTERINPUTPASSWORD.value), "Password");
    checkIfCanAbledBtn();
});
REGISTERINPUTREPASSWORD.addEventListener("input", () => {
    if (REGISTERINPUTREPASSWORD.value !== REGISTERINPUTPASSWORD.value) {
        REGISTERALERTREPASSWORD.classList.remove("d-none");
        rePasswordOk = false;
    } else {
        REGISTERALERTREPASSWORD.classList.add("d-none");
        rePasswordOk = true;
    }
    checkIfCanAbledBtn()
})

/* create new user when click on the register btn (more deatels inside the function) */
REGISTERBTN.addEventListener("click", () => {
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
            if (user.email === REGISTERINPUTEMAIL.value) {
                //check if the ameil is exist and print correct msg
                REGISTERALERTEMAIL.innerHTML = `This email is exist`;
                REGISTERINPUTEMAIL.classList.add("is-invalid");
                return;
            }
        }
        //if there is alredy array of users, and the email isn't exist, add new user to the array.
        usersArr = [...usersArr, createUser()];
    }
    //save the array to the local storge.
    localStorage.setItem("users", JSON.stringify(usersArr));
    // clear all inputs in the form
    document.getElementById("register-form").querySelectorAll("input").forEach((item) => { item.value = "" });
    //take him to the login page
    switchPage(PAGES.LOGIN);

})

/* clear all inputs in the form when click on the clear btn */
document.getElementById("register-clear-btn").addEventListener("click", () => {
    document.getElementById("register-form").querySelectorAll("input").forEach((item) => { item.value = "" });
});

/* that function return a new user that create with the classes User and UserAdress and get thw values of the form inputs */
const createUser = () => {
    return new User(
        REGISTERINPUTFIRSTNAME.value,
        REGISTERINPUTLASTNAME.value,
        new UserAddress(
            document.getElementById("register-input-state").value,
            document.getElementById("register-input-city").value,
            document.getElementById("register-input-country").value,
            document.getElementById("register-input-street").value,
            document.getElementById("register-input-houseNumber").value,
            document.getElementById("register-input-zipCode").value
        ),
        REGISTERINPUTEMAIL.value,
        REGISTERINPUTPASSWORD.value,
        document.getElementById("register-input-phone").value,
        document.getElementById("register-input-isAdmin").checked
    )
}
