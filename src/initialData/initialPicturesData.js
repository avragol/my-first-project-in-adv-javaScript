const importPicData = async () => {
    let { data } = await axios.get("../src/initialData/picsData.json");
    try {
        return data;
    } catch (err) {
        return;
    }
}

const setInitialPicsData = async () => {
    if (localStorage.getItem("pics")) {
        return;
    }
    let picsData = await importPicData();
    localStorage.setItem("pics", JSON.stringify(picsData))
}

setInitialPicsData();


