const container = document.getElementById("petals");

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
        `rotate(${Math.random()*360}deg)`;

    container.appendChild(petal);

    petal.addEventListener("animationend", () => {
        petal.remove();
    });

}

for(let i = 0; i < 12; i++){
    setTimeout(createPetal, i * 150);
}

setInterval(createPetal,350);

const images = document.querySelectorAll(".images img");

console.log(images);

images.forEach(img => {

    img.addEventListener("click", () => {

        console.log("Clicked!");

        img.classList.toggle("active");

    });

});

const music = document.getElementById("bgMusic");

// Set volume
music.volume = 0.25;

// Wait until the audio is loaded before seeking
music.addEventListener("loadedmetadata", () => {
    music.currentTime = 40; // Start at 40 seconds
});

// Play after the first click
document.addEventListener("click", () => {
    music.play().catch(err => console.log(err));
}, { once: true });

/* ============================= */
/*      IMAGE LIGHTBOX           */
/* ============================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("click", () => {

        lightboxImg.src = img.src;
        lightbox.classList.add("show");

    });

});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

document.addEventListener("keydown", e => {

    if(e.key === "Escape"){
        lightbox.classList.remove("show");
    }

});
