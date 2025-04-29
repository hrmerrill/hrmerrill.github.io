function detectNarrow() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        // Code to run if on a mobile device
        console.log("Narrow device detected");
        return true;
    } else {
        // Code to run if not on a mobile device
        console.log("Not a narrow device");
        return false;
    }
}

function toggleCards(isNarrow) {
    const skillsLeft = document.getElementById("skills-left");
    const serviceBottom = document.getElementById("service-bottom");
    const skillsBottom = document.getElementById("skills-bottom");
    const serviceTop = document.getElementById("service-top");
    const bio = document.getElementById("bio");
    const education = document.getElementById("education");
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
}

document.addEventListener("DOMContentLoaded", () => {
    toggleCards(detectNarrow());
});