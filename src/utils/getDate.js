const getDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0'); // Get the day of the month and pad it with a leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (add 1 because January is 0) and pad it with a leading zero if necessary
    const year = date.getFullYear().toString(); // Get the year as a string
    return `${day}.${month}.${year}`;; // return the date
}

export default getDate;