document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        html.classList.add("dark");
        themeToggle.checked = true;
    }

    // Basculer le thème
    themeToggle.addEventListener("change", () => {
        html.classList.toggle("dark");
        const currentTheme = html.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", currentTheme);
    });
});

        // Script pour gérer les onglets avec mode sombre/clair
        document.addEventListener("DOMContentLoaded", () => {
            const buttons = document.querySelectorAll(".tab-button");
            const items = document.querySelectorAll(".competence-item");

            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    const category = button.getAttribute("data-category");

                    // Mettre à jour les styles des boutons actifs/inactifs
                    buttons.forEach((btn) => {
                        btn.classList.remove("bg-blue-500", "text-white");
                        btn.classList.add("bg-gray-800", "text-gray-300", "dark:bg-gray-600", "dark:text-gray-300");
                    });
                    button.classList.add("bg-blue-500", "text-white", "dark:bg-blue-500", "dark:text-white");

                    // Afficher ou masquer les compétences
                    items.forEach((item) => {
                        if (category === "all" || item.classList.contains(category)) {
                            item.classList.remove("hidden");
                        } else {
                            item.classList.add("hidden");
                        }
                    });
                });
            });
        });
        
        const swiper = new Swiper(".mySwiper", {
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
