import validate from "./validate.js";

/* A function that receives an url address value and sends it to the validation function together with a suitable regex variable and maximum and minimum values */
const validateUrl = (urlToCheck) => {
    const regUrl = /^(https?:\/\/)?[^\s\/]+\.[^\s\/]+\/\S+\.(jpg|jpeg|png|gif)$/
    return validate(urlToCheck, regUrl, 4, 255);
}

export default validateUrl;