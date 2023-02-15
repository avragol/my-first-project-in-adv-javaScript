import validate from "./validate.js";

/* A function that receives an name value and sends it to the validation function together with a suitable regex variable and maximum and minimum values */
const validateName = (nameToCheck) => {
    const regName = new RegExp("^[A-Z][a-z0-9-\\s]{0,255}$", "g");
    return validate(nameToCheck, regName, 2, 15);
}

export default validateName;