import {showAlert} from "./alerts.js";
import items from "./items.js";

let cart;
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"))
    showAlert("Cart loaded from local storage", "success")
} else {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    showAlert("Cart is empty", "info");
}

if (localStorage.getItem("cart").length === 0 || localStorage.getItem("cart") === "[]") {
    showAlert("Cart is empty", "info");
    // delete .hero-scroll_down
    const heroScrollDown = document.querySelector(".hero-scroll_down");
    heroScrollDown.parentNode.removeChild(heroScrollDown);
    const main = document.querySelector("#main").parentNode.removeChild(document.querySelector("#main"));
}

const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");

const renderCart = () => {

    cartContainer.innerHTML = "";
    cartTotal.innerHTML = "";
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "Your cart is empty";
        cartTotal.innerHTML = "Total: $0.00";
        cartItems.innerHTML = "Items: 0";
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            const cartItemName = document.createElement("p");
            const cartItemPrice = document.createElement("p");
            const cartItemRemove = document.createElement("button");

            cartItem.classList.add("cart-item");
            cartItemName.classList.add("cart-item__name");
            cartItemPrice.classList.add("cart-item__price");
            cartItemRemove.classList.add("cart-item__remove");

            cartItemName.appendChild(document.createTextNode(item.name));
            cartItemPrice.appendChild(document.createTextNode("$" + item.price));
            cartItemRemove.appendChild(document.createTextNode("Remove"));
            cartItemRemove.dataset.item = item.name;

            cartItem.appendChild(cartItemName);
            cartItem.appendChild(cartItemPrice);
            cartItem.appendChild(cartItemRemove);

            cartContainer.appendChild(cartItem);
        });
    }

    cartTotal.appendChild(document.createTextNode("Total: $" + cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)));
    cartItems.appendChild(document.createTextNode("Items: " + cart.length));

    const cartItemRemoveButtons = document.querySelectorAll(".cart-item__remove");
    for (let i = 0; i < cartItemRemoveButtons.length; i++) {
        cartItemRemoveButtons[i].addEventListener("click", function () {
            cart.splice(cart.findIndex(item => item.name === this.dataset.item), 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            showAlert("Item removed from cart", "success");
            renderCart();
        });
    }
}

if (cart.length !== 0) {
    renderCart();


    const checkoutButton = document.querySelector("#checkout");
    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            showAlert("Cart is empty", "danger");
        } else {

            // ask to open new tabs for each unique item
            const uniqueItems = [...new Set(cart.map(item => item.url))];

            console.log(uniqueItems)

            for (let i = 0; i < uniqueItems.length; i++) {
                console.log(items[uniqueItems[i]])
                window.open(`https://shop.freetibet.org/products/${items[uniqueItems[i]].url}`, "_blank");
            }
        }
    });

    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", function () {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        showAlert("Cart cleared", "success");
        renderCart();
        location.reload();
    });
}