import validate from "./validate.js";

/* A function that receives an password value and sends it to the validation function together with a suitable regex variable and maximum and minimum values */
const validatePassword = (passwordToCheck) => {
    const regPassword = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,255}$",
        "g"
    );
    return validate(passwordToCheck, regPassword, 5, 255);
}

export default validatePassword;