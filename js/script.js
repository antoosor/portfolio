(() => {
    "use strict";

    /* ============ 1. Datos de proyectos (evita HTML duplicado) ============ */
    const proyectos = [
        {
            img: "img/logo_Eden.jpg",
            alt: "Logo de Eden",
            cargo: "Eden | Customer Support Lead",
            tags: ["Teleport", "HTML", "CSS", "Slack", "Zoom", "VPN", "Zendesk", "Google Workspace", "Freshdesk", "Lucidchart"],
            desc: "Lideré iniciativas de soporte técnico y mejora de procesos, documentando procedimientos, gestionando incidencias críticas y coordinando la colaboración entre equipos de soporte, ingeniería y operaciones para ofrecer un servicio más eficiente, consistente y escalable.",
            link: "#"
        },
        {
            img: "img/logo_rookmotion.jpg",
            alt: "Logo de RookMotion",
            cargo: "RookMotion | Customer Support y Customer Success",
            tags: ["Lucidchart", "Asana", "Slack", "Zoom", "Zendesk", "Google Workspace", "HubSpot"],
            desc: "Garanticé la satisfacción del cliente en escenarios complejos y transformé procesos internos mediante iniciativas de mejora continua.",
            link: "#"
        },
        {
            img: "img/logo_spa_oasis.jpg",
            alt: "Logo de Spa Oasis",
            cargo: "Spa Oasis | Desarrollador web",
            tags: ["HTML", "CSS", "JavaScript", "Stitch IA"],
            desc: "Desarrollé un sitio web aplicando HTML, CSS y JavaScript para construir una interfaz funcional y responsive, fortaleciendo mis fundamentos en desarrollo web.",
            link: "#"
        }
    ];

    const cardsGrid = document.getElementById("cardsGrid");

    if (cardsGrid) {
        const markup = proyectos.map((p) => `
            <article class="card">
                <div class="card__media">
                    <img src="${p.img}" alt="${p.alt}" loading="lazy" width="120" height="120">
                </div>
                <div class="card__body">
                    <ul class="card__tags">
                        ${p.tags.map((t) => `<li class="card__tag">${t}</li>`).join("")}
                    </ul>
                    <h3 class="card__role">${p.cargo}</h3>
                    <p class="card__desc">${p.desc}</p>
                    <a href="${p.link}" class="card__link">Ver más <span aria-hidden="true">→</span></a>
                </div>
            </article>
        `).join("");

        cardsGrid.innerHTML = markup;
    }

    /* ============ 2. Menú de navegación móvil ============ */
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
        });

        navMenu.querySelectorAll(".nav__link").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Abrir menú de navegación");
            });
        });
    }

    /* ============ 3. Sombra del header al hacer scroll ============ */
    const header = document.getElementById("header");

    if (header) {
        const onScroll = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ============ 4. Animación de aparición al hacer scroll ============ */
    const revealTargets = document.querySelectorAll("[data-reveal]");

    if ("IntersectionObserver" in window && revealTargets.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealTargets.forEach((el) => observer.observe(el));
    } else {
        revealTargets.forEach((el) => el.classList.add("is-visible"));
    }

    /* ============ 5. Validación del formulario de contacto ============ */
    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (form) {
        const fields = [
            { input: document.getElementById("nombre"), error: document.getElementById("nombreError"), message: "Por favor escribe tu nombre." },
            { input: document.getElementById("correo"), error: document.getElementById("correoError"), message: "Ingresa un correo electrónico válido." },
            { input: document.getElementById("mensaje"), error: document.getElementById("mensajeError"), message: "Cuéntame un poco sobre tu proyecto." }
        ];

        const validateField = (field) => {
            field.input.dataset.touched = "true";
            const valid = field.input.checkValidity();
            field.error.textContent = valid ? "" : field.message;
            return valid;
        };

        fields.forEach((field) => {
            field.input.addEventListener("blur", () => validateField(field));
            field.input.addEventListener("input", () => {
                if (field.input.dataset.touched === "true") validateField(field);
            });
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const allValid = fields.map(validateField).every(Boolean);

            if (!allValid) {
                formStatus.textContent = "Revisa los campos marcados antes de enviar.";
                formStatus.dataset.state = "error";
                return;
            }

            // No hay backend conectado: se confirma el envío localmente.
            formStatus.textContent = "¡Gracias! Tu mensaje quedó listo para enviarse.";
            formStatus.dataset.state = "success";
            form.reset();
            fields.forEach((field) => {
                field.input.dataset.touched = "false";
                field.error.textContent = "";
            });
        });
    }
})();
