/* Set varible tht will contain the picture array and boolean varible that will contain if the connected user is admin */
let picsArr;
let isAdmin;

/* set the table and head of table elements */
const TABLEROWSPICS = document.getElementById("table-rows-cards");
const HEADROWTABLE = document.getElementById("head-row-table");

/* init the table by information from home page (the func is exported to home pagק and run from there) */
const initialTable = (picsArrFromHomePage, isAdminFromHomePage) => {
    picsArr = picsArrFromHomePage;
    isAdmin = isAdminFromHomePage;
    createTablePics();
};

//when page load, if the media is mobile' the colum "pic" will hide, and if the connected user is admin' add more colums to the table
window.addEventListener("load", () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
        HEADROWTABLE.innerHTML = `
            <th scope="col">No.</th>
            <th scope="col">image</th>
            <th scope="col">Title</th>
            <th scope="col">Credit</th>
        `
    }
    if (isAdmin) {
        HEADROWTABLE.innerHTML += `
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>`;
    }
})

//the function return HTML code for one row by the parameters
const createRowItem = (isAdmin, picId, url, alt, title, credit, number) => {
    //the url will display only on desktop
    return `
    <tr>
        <th scope="row">${number}</th>
        <td><img src="${url}" alt="${alt}"
                width="75rem"></td>
        <td>"${title}"</td>
        ${window.matchMedia("(max-width: 768px)").matches ? "" : "<td>${url}</td>"}
        <td>${credit}</td>
        ${isAdmin ? initialAdminBtns(picId) : ""}
    </tr>
    `
}

//that function run from createRowItem() and return the HTML for admin btns
const initialAdminBtns = (picId) => {
    return `
    <td><a herf="#" id="editBtn-${picId}"><i class="bi bi-pencil-square"></i></a></td>
    <td><a herf="#" id="deleteBtn-${picId}"><i class="bi bi-trash3-fill"></i></a></td>
    `
}

//the function passes through the array and for every picture build html elemnt into the table
const createTablePics = () => {
    let innerStr = "";
    let number = 1;
    for (let pic of picsArr) {
        innerStr += createRowItem(isAdmin, pic.picId, pic.url, pic.alt, pic.title, pic.credit, number)
        number++;
    }
    TABLEROWSPICS.innerHTML = innerStr;
}

export default initialTable;