document.addEventListener("DOMContentLoaded", function () {
    let toggles = document.querySelectorAll(".toggle");

    toggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            let submenu = this.nextElementSibling;
            submenu.classList.toggle("hide");
            this.classList.toggle("active");
        });
    });
});

// Mostrar/ocultar menú de configuración
document.querySelector(".settings").addEventListener("click", function() {
    document.querySelector(".settings-menu").classList.toggle("show");
});

// Cerrar menú al hacer clic fuera
window.addEventListener("click", function(event) {
    if (!event.target.closest(".settings")) {
        document.querySelector(".settings-menu").classList.remove("show");
    }
});


// Mostrar/ocultar menú de configuración
document.querySelector(".notification").addEventListener("click", function() {
    document.querySelector(".notification-menu").classList.toggle("show");
});

// Cerrar menú al hacer clic fuera
window.addEventListener("click", function(event) {
    if (!event.target.closest(".notification")) {
        document.querySelector(".notification-menu").classList.remove("show");
    }
});



// Mostrar/ocultar menú de configuración
document.querySelector(".user-avatar").addEventListener("click", function() {
    document.querySelector(".user-menu").classList.toggle("show");
});

// Cerrar menú al hacer clic fuera
window.addEventListener("click", function(event) {
    if (!event.target.closest(".user-avatar")) {
        document.querySelector(".user-menu").classList.remove("show");
    }
});