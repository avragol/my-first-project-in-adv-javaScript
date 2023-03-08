const createUserData = async () => {
    let { data } = await axios.get("../src/initialData/usersData.json")
    try {
        return data;
    } catch (err) {
        return;
    }
}

const setInitialUsersData = async () => {
    if (localStorage.getItem("users")) {
        return;
    }
    let usersData = await createUserData();
    localStorage.setItem("users", JSON.stringify(usersData))
}

setInitialUsersData();
