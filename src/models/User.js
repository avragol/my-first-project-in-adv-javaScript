import getNextUserId from "../utils/getNextUserId.js";

class User {
    constructor(name, email, password, isAdmin = false) {
        this.userId = getNextUserId();
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}

export default User;