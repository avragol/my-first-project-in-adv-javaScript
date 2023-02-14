import validate from "./validate.js";

const validateEmail = (enailToCheck) => {
    const regEmail = new RegExp(
        "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
        "ig"
    );
    return validate(enailToCheck, regEmail, 5, 255);
}

export default validateEmail;