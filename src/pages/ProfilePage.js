/*IMPORTS*/
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";
import validateEmail from "../validation/validateEmail.js";
import checkInput from "../utils/checkInput.js";

/* SET ELEMNTS TO VARIBELS */
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

/* set varible that will contain the user who connected */
let userToken;

/* set boolean varibels that holds true if the validation is correct */
let firstNameOk;
let lastNameOk;
let emailOk;
let passwordOk;
let rePasswordOk = true;

/* function that  able the edit btn if everythings is in right place*/
const checkIfCanAbledBtn = () => {
    PROFILESAVEBTN.disabled = (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk));
}

/* when the page load, set the form with all usre deatels ,and do the validation for inputs that have a value */
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

/* do validation for every required inputs when typing in them */
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

//function that will only be activated if there is a change in the password or in rePassword. Otherwise the user does not want to change the password
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

/* edit the connected user by the new values when the user click on the save btn */
PROFILESAVEBTN.addEventListener("click", () => {
    if (!(firstNameOk && lastNameOk && emailOk && passwordOk && rePasswordOk)) {
        //if someone try to able the btn from devTool
        return;
    }
    //get the users array from local storge
    let usersArr = JSON.parse(localStorage.getItem("users"));
    //catch the connected user
    for (let user of usersArr) {
        if (user.userId === userToken.userId) {
            //update the deatels by the form
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
            //save the edited user to "userToken" in local storge.
            localStorage.setItem("userToken", JSON.stringify(user));
        }
    }
    //save the edited array to "users" in local storge
    localStorage.setItem("users", JSON.stringify(usersArr));
    //refresh (and back to home page)
    location.reload();
});

//when the user click on cencel btn, refresh(and back to home page)
PROFILECLEARBTN.addEventListener("click", () => { location.reload() });

