// ===============================
// WebSolverCafe - script.js
// ===============================


// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is clicked
    mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Local = backend on port 3000
// Railway = same website/backend URL
const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000/api/contact"
        : "/api/contact";


if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const company = document.getElementById("company")?.value.trim();
        const service = document.getElementById("service")?.value;
        const message = document.getElementById("message")?.value.trim();

        // Basic validation
        if (!name || !email || !service || !message) {

            if (formStatus) {
                formStatus.textContent =
                    "Please fill in all required fields.";

                formStatus.className = "error";
            }

            return;
        }


        // Show sending message
        if (formStatus) {
            formStatus.textContent = "Sending your message...";
            formStatus.className = "sending";
        }


        // Disable button while sending
        const submitButton = contactForm.querySelector("button[type='submit']");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }


        try {

            const response = await fetch(API_URL, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    company: company,
                    service: service,
                    message: message
                })
            });


            const data = await response.json();


            if (response.ok && data.success) {

                if (formStatus) {
                    formStatus.textContent =
                        "Message sent successfully! We'll get back to you soon.";

                    formStatus.className = "success";
                }

                // Clear form
                contactForm.reset();

            } else {

                if (formStatus) {
                    formStatus.textContent =
                        data.message || "Something went wrong. Please try again.";

                    formStatus.className = "error";
                }
            }


        } catch (error) {

            console.error("Contact form error:", error);

            if (formStatus) {
                formStatus.textContent =
                    "Unable to send message right now. Please try again later.";

                formStatus.className = "error";
            }

        } finally {

            // Enable button again
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message →";
            }
        }

    });

}


// ===============================
// REVEAL ANIMATIONS
// ===============================

const revealElements = document.querySelectorAll(
    ".reveal, .service-card, .project-card, .process-step, .about-content, .about-visual"
);


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


// ===============================
// ACTIVE NAVIGATION LINK
// ===============================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(
    ".desktop-nav a[href^='#'], .mobile-nav a[href^='#']"
);


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


// ===============================
// DYNAMIC YEAR
// ===============================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ===============================
// BUTTON LOADING SAFETY
// ===============================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        if (button.disabled) {
            return;
        }

    });

});


// ===============================
// PAGE LOADED
// ===============================

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

    console.log("WebSolverCafe website loaded successfully 🚀");

});