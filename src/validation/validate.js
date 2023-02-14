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
















