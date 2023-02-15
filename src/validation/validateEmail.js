import validate from "./validate.js";

/* A function that receives an email value and sends it to the validation function together with a suitable regex variable and maximum and minimum values */
const validateEmail = (emailToCheck) => {
    const regEmail = new RegExp(
        "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
        "ig"
    );
    return validate(emailToCheck, regEmail, 5, 255);
}

export default validateEmail;