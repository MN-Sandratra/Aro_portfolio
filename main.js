document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('block');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('block');
            }
        });

        // Fermer le menu au clic sur un lien
        const mobileLinks = mobileMenu.getElementsByTagName('a');
        for (let link of mobileLinks) {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                isMenuOpen = false;
            });
        }
    }

    // Thème sombre/clair
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.fa-sun');
    const moonIcon = document.querySelector('.fa-moon');

    function updateTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    }

    // Init theme
    const isDarkMode = localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    updateTheme(isDarkMode);

    themeToggle.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
        updateTheme(isDark);
    });

    // Filtres compétences
    const filterButtons = document.querySelectorAll('.skill-filter');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter cards
            const category = button.dataset.category;
            skillCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animation des barres de progression
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const level = entry.target.dataset.level;
                progressBar.style.width = `${level}%`;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar').forEach(bar => observer.observe(bar));

    // Gestion des filtres du portfolio
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Mise à jour du filtre actif
            portfolioFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            // Filtrage des projets
            const category = filter.dataset.category;
            portfolioItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animation au défilement pour les formations
    const observerFormations = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.formation-card').forEach(card => {
        observerFormations.observe(card);
    });

    // Initialisation de Swiper
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        effect: "slide",
        grabCursor: true,
        touchRatio: 1.5,
        preventClicks: true,
        preventClicksPropagation: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        keyboard: {
            enabled: true,
        },
        on: {
            init: function() {
                const slides = document.querySelectorAll('.swiper-slide');
                slides.forEach(slide => {
                    slide.addEventListener('click', (e) => {
                        e.preventDefault();
                        const rect = slide.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        
                        if (clickX > rect.width / 2) {
                            swiper.slideNext();
                        } else {
                            swiper.slidePrev();
                        }
                    });
                });
            },
            touchEnd: function() {
                if (this.isEnd) {
                    this.slideTo(1, 0);
                }
                if (this.isBeginning) {
                    this.slideTo(this.slides.length - 2, 0);
                }
            }
        },
    });

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        swiper.update();
    });

    // Pause de l'autoplay lors du survol
    const swiperContainer = document.querySelector('.swiper');
    swiperContainer.addEventListener('mouseenter', () => {
        swiper.autoplay.stop();
    });
    swiperContainer.addEventListener('mouseleave', () => {
        swiper.autoplay.start();
    });
}); 