/* ============================= */
/*      OPENING ENVELOPE SCREEN  */
/* ============================= */

const openingScreen = document.getElementById("openingScreen");
const envelope = document.getElementById("envelope");

// Lock scrolling until the envelope is opened
document.documentElement.classList.add("locked");
document.body.classList.add("locked");

function openEnvelope() {

    if (envelope.classList.contains("opened")) return;

    envelope.classList.add("opened");

    // Fade the whole screen out once the flap + letter animation finishes
    setTimeout(() => {
        openingScreen.classList.add("hideScreen");
        document.documentElement.classList.remove("locked");
        document.body.classList.remove("locked");
    }, 1300);

    // Fully remove it from the DOM after the fade-out transition completes
    setTimeout(() => {
        openingScreen.remove();
    }, 2200);

}

envelope.addEventListener("click", openEnvelope);

envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEnvelope();
    }
});

/* ============================= */
/*      PETALS                   */
/* ============================= */

const container = document.getElementById("petals");
const isSmallScreen = window.matchMedia("(max-width: 600px)").matches;
const petalInterval = isSmallScreen ? 600 : 350;

function createPetal() {

    const petal = document.createElement("div");

    const size = 8 + Math.random() * 10;

    petal.className = "petal";

    petal.style.width = size + "px";
    petal.style.height = size + "px";

    petal.style.left = Math.random() * window.innerWidth + "px";

    petal.style.top = "-40px";

    petal.style.animationDuration =
        (10 + Math.random() * 8) + "s";

    petal.style.animationDelay =
        Math.random() * 2 + "s";

    petal.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    container.appendChild(petal);

    petal.addEventListener("animationend", () => {
        petal.remove();
    });

}

for (let i = 0; i < 12; i++) {
    setTimeout(createPetal, i * 150);
}

setInterval(createPetal, petalInterval);

/* ============================= */
/*      BACKGROUND MUSIC         */
/* ============================= */

const music = document.getElementById("bgMusic");

music.volume = 0.4;

music.addEventListener("loadedmetadata", () => {
    music.currentTime = 40;
});

document.addEventListener("click", () => {
    music.play().catch(err => console.log(err));
}, { once: true });

/* ============================= */
/*      IMAGE LIGHTBOX +         */
/*      GALLERY CLICK HANDLING   */
/* ============================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightboxBtn = document.getElementById("closeLightbox");

function openLightbox(img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightbox.classList.add("show");
}

function closeLightbox() {
    lightbox.classList.remove("show");
}

// Single click handler per image: toggles "active" state (used for
// mobile hover-equivalent styling) and opens the lightbox.
document.querySelectorAll("img").forEach(img => {

    img.addEventListener("click", () => {

        if (img.closest(".images")) {
            img.classList.toggle("active");
        }

        openLightbox(img);

    });

});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

closeLightboxBtn.addEventListener("click", closeLightbox);

closeLightboxBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeLightbox();
    }
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});

/* ============================= */
/*      SCROLL TO TOP BUTTON     */
/* ============================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
