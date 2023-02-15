/* A function that receives a regex variable, some value, minimum and maximum length, and returns an array of errors if there is a problem with the value */
const validate = (value, regex, min, max) => {
    let mesageArr = [];
    if (value.length < min) {
        mesageArr = [...mesageArr, "to short"]
    }
    if (value.length > max) {
        mesageArr = [...mesageArr, "too long"]
    }
    if (!regex.test(value)) {
        mesageArr = [...mesageArr, "invalid"]
    }
    return mesageArr;
}

export default validate;
















