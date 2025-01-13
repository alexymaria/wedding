document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul");

    toggleButton.addEventListener("click", function () {
        menu.classList.toggle("show");
        console.log("Click menu")
    });
});
