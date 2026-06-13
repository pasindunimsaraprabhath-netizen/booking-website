document.addEventListener("DOMContentLoaded", () => {
    // 1. Header scroll handler
    const header = document.querySelector(".header-wrapper");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // 2. Mobile Navbar Menu Toggle
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            
            // Toggle hamburger icon between bars and times
            const icon = navToggle.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.className = "fas fa-times";
                } else {
                    icon.className = "fas fa-bars";
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove("active");
                const icon = navToggle.querySelector("i");
                if (icon) icon.className = "fas fa-bars";
            }
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const icon = navToggle.querySelector("i");
                if (icon) icon.className = "fas fa-bars";
            });
        });
    }

    // 3. Scroll to Reveal Intersection Observer
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    // Once animation plays, we can stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 4. Create and inject scroll-to-top button dynamically
    const scrollTopBtn = document.createElement("div");
    scrollTopBtn.className = "scroll-to-top";
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("active");
        } else {
            scrollTopBtn.classList.remove("active");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 5. Newsletter Form Submission Handling
    const newsletterForms = document.querySelectorAll(".footer-newsletter-form");
    newsletterForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = form.querySelector("input[type='email']");
            if (emailInput && emailInput.value.trim()) {
                alert(`✨ Thank you! We have added ${emailInput.value.trim()} to our newsletter for exclusive Ceylon travel updates. ✨`);
                emailInput.value = "";
            } else {
                alert("Please enter a valid email address.");
            }
        });
    });

    // 6. WhatsApp Floating Button & Chat Widget Integration
    const WHATSAPP_CONFIG = {
        phoneNumber: "94759026156", // Support number in international format (+94 759026156)
        defaultMessage: "Hello Ceylon Horizons! I'm interested in booking a tour/transfer."
    };

    // Reusable global helper function to send WhatsApp messages
    window.sendWhatsAppMessage = function(messageText, phone = WHATSAPP_CONFIG.phoneNumber) {
        const formattedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${phone}?text=${formattedMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    // Create and inject WhatsApp Float Button dynamically
    const whatsappBtn = document.createElement("div");
    whatsappBtn.className = "whatsapp-float";
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.setAttribute("aria-label", "Chat on WhatsApp");
    document.body.appendChild(whatsappBtn);

    // Create and inject WhatsApp Chat Widget dynamically
    const whatsappWidget = document.createElement("div");
    whatsappWidget.className = "whatsapp-widget";
    whatsappWidget.innerHTML = `
        <div class="whatsapp-widget-header">
            <div class="whatsapp-avatar">
                <i class="fa-solid fa-compass"></i>
            </div>
            <div class="whatsapp-info">
                <h4>Ceylon Horizons</h4>
                <div class="whatsapp-status">Online</div>
            </div>
            <button class="whatsapp-close-btn" aria-label="Close chat">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="whatsapp-widget-body">
            <div class="whatsapp-chat-bubble">
                Hi there! 👋 How can we help you plan your journey in Sri Lanka today?
            </div>
        </div>
        <div class="whatsapp-widget-footer">
            <form id="whatsappWidgetForm" class="whatsapp-input-group">
                <input type="text" id="whatsappWidgetInput" placeholder="Type a message..." required autocomplete="off">
                <button type="submit" class="whatsapp-send-btn" aria-label="Send WhatsApp message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(whatsappWidget);

    // Event listeners for widget interactivity
    const closeBtn = whatsappWidget.querySelector(".whatsapp-close-btn");
    const widgetForm = whatsappWidget.querySelector("#whatsappWidgetForm");
    const widgetInput = whatsappWidget.querySelector("#whatsappWidgetInput");

    // Toggle chat widget
    whatsappBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        whatsappWidget.classList.toggle("active");
        if (whatsappWidget.classList.contains("active")) {
            widgetInput.focus();
        }
    });

    // Close on close button click
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        whatsappWidget.classList.remove("active");
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
        if (!whatsappWidget.contains(e.target) && !whatsappBtn.contains(e.target)) {
            whatsappWidget.classList.remove("active");
        }
    });

    // Prevent widget clicks from bubbling to document (which would close it)
    whatsappWidget.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Handle form submit in widget
    widgetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = widgetInput.value.trim();
        if (msg) {
            window.sendWhatsAppMessage(msg);
            widgetInput.value = "";
            whatsappWidget.classList.remove("active");
        }
    });
});
