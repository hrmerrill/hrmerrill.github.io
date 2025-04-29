const skillsLeft = document.getElementById("skills-left");
const serviceBottom = document.getElementById("service-bottom");
const skillsBottom = document.getElementById("skills-bottom");
const serviceTop = document.getElementById("service-top");
const bio = document.getElementById("bio");
const education = document.getElementById("education");

function detectNarrow() {
    const isNarrow1 = window.innerWidth <= 768;
    const isNarrow2 = window.matchMedia("(max-width: 768px)").matches;
    const isNarrow3 = document.documentElement.clientWidth <= 768;
    return isNarrow1 || isNarrow2 || isNarrow3;
};

function toggleCards() {
    const isNarrow = detectNarrow();
    if (isNarrow) {
        skillsLeft.style.display = "none";
        serviceBottom.style.display = "block";
        skillsBottom.style.display = "block";
        serviceTop.style.display = "none";
    } else {
        skillsLeft.style.display = "block";
        serviceBottom.style.display = "none";
        skillsBottom.style.display = "none";
        serviceTop.style.display = "block";

        bio.classList.add("w3-margin-bottom");
        education.classList.remove("w3-margin-bottom");
    }
};

window.addEventListener("resize", toggleCards);
document.addEventListener("DOMContentLoaded", toggleCards);