import getNextUserId from "../utils/getNextUserId.js";

class User {
    constructor(firstName, lastName, address, email, password, phone, isAdmin = false) {
        this.userId = getNextUserId();
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.isAdmin = isAdmin;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

export default User;