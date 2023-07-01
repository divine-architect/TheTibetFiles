/*
 * Hero Background
 * Changes the background image of the hero element every 5 seconds
 */
const
    hero = document.getElementById("hero-background"),
    images = [
        "/static/img/tibet_flag.webp",
        "/static/img/chinesearmy_like_paper.webp",
        "/static/img/tibetan_resistance.webp",
        "/static/img/pemastory.webp",
        "/static/img/chinesepersecution_like_paper.webp",
        "/static/img/pemas_story.webp",
        "/static/img/chinesepolice_like_paper.webp",
        "/static/img/chinesetroops_intibet_like_paper.webp",
        "/static/img/old_resistance_like_paper.webp",
        "/static/img/ope.webp"
    ];

// Prevent the same image from being shown twice in a row
let lastImage;

// Set the initial image
let newImage = images[Math.floor(Math.random() * images.length)];
hero.style.backgroundImage = "url(" + newImage + ")";
lastImage = newImage;

// Change the image every 5 seconds
setInterval(function () {
    let newImage = lastImage;
    while (newImage === lastImage) newImage = images[Math.floor(Math.random() * images.length)];
    hero.style.backgroundImage = "url(" + newImage + ")";
    lastImage = newImage;
}, 5000);

/*
   * Navigation Menu
 */

if (document.querySelector(".nav-menu")) {
    // On any .nav-show__hide element click, toggle the .nav-show class on the .nav element
    document.querySelectorAll(".nav-show__hide").forEach(function (element) {
        element.addEventListener("click", function () {
            document.querySelector(".nav-menu").classList.toggle("show");
            document.querySelectorAll(".nav-menu a").forEach(function (link) {
                if (link.hasAttribute('tabindex')) link.removeAttribute('tabindex');
                else link.setAttribute('tabindex', '-1')
            });
        });
    });
}


/*
 * Create the footer
 */

function createFooter() {

    const footer = document.createElement("footer");
    footer.classList.add("footer");

    const footerContainer = document.createElement("div");
    footerContainer.classList.add("footer__container");

    const footerText = document.createElement("p");
    footerText.classList.add("footer__text");


    const links = [
        ["Home", "/"],
        ["Resources", "/resources"],
        ["Marketplace", "/market"],
        ["Cart", "/cart"],
        ["News", "https://www.phayul.com/"],
        ["Guestbook", "https://thetibetfiles.123guestbook.com/"],
    ]

    links.forEach(function (link) {
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", link[1]);
        linkElement.innerText = link[0];
        footerText.appendChild(linkElement);
    });


    const footerLogo = document.createElement("img");
    footerLogo.setAttribute("src", "/static/img/tbf.webp");

    footer.appendChild(footerLogo);
    footerContainer.appendChild(footerText);
    footer.appendChild(footerContainer);

    document.querySelector("#main").appendChild(footer);

}

createFooter();