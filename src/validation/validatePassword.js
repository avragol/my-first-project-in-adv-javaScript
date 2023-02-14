import validate from "./validate.js";

const validatePassword = (passwordToCheck) => {
    const regPassword = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,255}$",
        "g"
    );
    return validate(passwordToCheck, regPassword, 5, 255).map((err) => `Password is ${err}`);
}

export default validatePassword;