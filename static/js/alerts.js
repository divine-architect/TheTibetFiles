function showAlert(message, type) {

    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.classList.add("alert-" + type);
    alert.appendChild(document.createTextNode(message));
    alert.style.opacity = "1";
    document.getElementById("alerts").appendChild(alert);

    setTimeout(function () {
        alert.style.opacity = "0";
        setTimeout(function () {
            alert.remove();
        }, 200);
    }, 3000);
}

export { showAlert };