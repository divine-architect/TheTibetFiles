import {showAlert} from "./alerts.js";
import items from "./items.js";

const cart = {
    items: [],
    total: 0,
    add: function (item) {
        this.items.push(item);
        this.total += parseFloat(item.price);
        localStorage.setItem("cart", JSON.stringify(this.items));
    },
    remove: function (item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.total -= parseFloat(item.price);
    },
    clear: function () {
        this.items = [];
        this.total = 0;
    }
};


// Populate the shop grid
const grid = document.querySelector("#shop-grid");
for (let i = 0; i < Object.keys(items).length; i++) {

    const item = items[Object.keys(items)[i]];

    const itemDiv = document.createElement("div");
    const imageDiv = document.createElement("div");
    const image = document.createElement("img");
    const caption = document.createElement("p");
    const textDiv = document.createElement("div");
    const heading = document.createElement("h2");
    const content = document.createElement("p");
    const buyRow = document.createElement("div");
    const buyPrice = document.createElement("p");
    const addToCart = document.createElement("button");

    itemDiv.classList.add("alternating-grid__item");
    buyRow.classList.add("buy-row");
    imageDiv.classList.add("alternating-grid__item__image");
    caption.classList.add("alternating-grid__item__image__caption");
    textDiv.classList.add("alternating-grid__item__text");
    heading.classList.add("alternating-grid__item__text__heading");
    content.classList.add("alternating-grid__item__text__content");
    addToCart.classList.add("buy-button");

    caption.appendChild(document.createTextNode(item.image[1]));
    image.src = "/static/img/" + item.image[0];
    image.alt = item.image[1];

    buyPrice.appendChild(document.createTextNode("$" + item.price));
    addToCart.appendChild(document.createTextNode("Add to cart"));
    addToCart.dataset.item = item.url


    heading.appendChild(document.createTextNode(item.name));
    content.appendChild(document.createTextNode(item.description));

    imageDiv.appendChild(image);
    imageDiv.appendChild(caption);

    buyRow.appendChild(addToCart);
    buyRow.appendChild(buyPrice);

    textDiv.appendChild(heading);
    textDiv.appendChild(content);
    textDiv.appendChild(buyRow);

    itemDiv.appendChild(imageDiv);
    itemDiv.appendChild(textDiv);

    grid.appendChild(itemDiv);
}


const buttons = document.querySelectorAll(".buy-button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        cart.add(items[this.dataset.item]);
        showAlert("Item added to cart", "success");
    });
}

// Check if there is a cart in local storage
if (localStorage.getItem("cart") !== null) {
    cart.items = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.items.length; i++) cart.total += parseFloat(cart.items[i].price);
    showAlert("Cart loaded from local storage", "success")
}
