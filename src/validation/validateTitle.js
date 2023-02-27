import validate from "./validate.js";

/* A function that receives an title value and sends it to the validation function together with a suitable regex variable and maximum and minimum values */
const validateTitle = (titleToCheck) => {
    const regTitle = new RegExp("^[A-Z][a-z0-9-\\s]{0,255}$", "g");
    return validate(titleToCheck, regTitle, 2, 30);
}

export default validateTitle;