import validate from "./validate.js";

const validateName = (nameToCheck) => {
    const regName = new RegExp("^[A-Z][a-z0-9-\\s]{0,255}$", "g");
    return validate(nameToCheck, regName, 2, 15);
}

export default validateName;