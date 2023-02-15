/* the function performs the validation and prints the correct message if there is a problem
additionally, the function return true or false in step to the validation
the function ask for the - 
* input that i want to chack
* div that will contain the error msg
* array of errors received from the validation function
* the title of the inputs (for print correct msg) */
const checkInput = (inputToCheck, alert, errorArr, inputTitle = "It") => {
    if (errorArr.length === 0) {
        //if there no any error
        inputToCheck.classList.remove("is-invalid");
        alert.innerHTML = ``;
        return true;
    } else {
        inputToCheck.classList.add("is-invalid")
        alert.innerHTML = `${inputTitle} is ${errorArr.join(" and ")}`;
        return false;
    }
}

export default checkInput;