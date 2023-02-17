/* Here I made sure that even if the height of the footer changes, it will not exceed the lower elements on the page */
const FOOTER = document.querySelector('footer');
const FOOTERHEIGHT = FOOTER.offsetHeight;
document.querySelector(".marginForTheFooter").style.height = `${FOOTERHEIGHT + 5}px`;