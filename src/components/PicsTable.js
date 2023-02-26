let picsArr;
let isAdmin;

const TABLEROWSPICS = document.getElementById("table-rows-cards");
const HEADROWTABLE = document.getElementById("head-row-table");

const initialTable = (picsArrFromHomePage, isAdminFromHomePage) => {
    picsArr = picsArrFromHomePage;
    isAdmin = isAdminFromHomePage;
    createTablePics();
};

const createRowItem = (isAdmin, picId, url, alt, title, credit, number) => {
    return `
    <tr>
        <th scope="row">${number}</th>
        <td><img src="${url}" alt="${alt}"
                width="75rem"></td>
        <td>"${url}"</td>
        <td>${title}</td>
        <td>${credit}</td>
        ${isAdmin ? initialAdminBtns(picId) : ""}
    </tr>
    `
}

const initialAdminBtns = (picId) => {
    return `
    <td><a herf="#" id="editBtn-${picId}"><i class="bi bi-pencil-square"></i></a></td>
    <td><a herf="#" id="deleteBtn-${picId}"><i class="bi bi-trash3-fill"></i></a></td>
    `
}

const createTablePics = () => {
    if (isAdmin) {
        HEADROWTABLE.innerHTML += `
         <th scope="col">Edit</th>
        <th scope="col">Delete</th>`;
    }
    let innerStr = "";
    let number = 1;
    for (let pic of picsArr) {
        innerStr += createRowItem(isAdmin, pic.picId, pic.url, pic.alt, pic.title, pic.credit, number)
        number++;
    }
    TABLEROWSPICS.innerHTML = innerStr;
}

export default initialTable;