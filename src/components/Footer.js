/* Here I made sure that even if the height of the footer changes, it will not exceed the lower elements on the page */
const footer = document.querySelector('footer');
const footerHeight = footer.offsetHeight;
document.querySelector(".marginForTheFooter").style.height = `${footerHeight + 5}px`;