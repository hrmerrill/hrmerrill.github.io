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

// rearrange cards based on screen size
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

// Add movement animation to cards when they come into view
let options = { root: null, rootMargin: '0px', threshold: 0.01 };
function bottomsUpCallbackFunc(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // by ID, so that only the elements I name get the animation
            var textId = entry.target.id;
            if (textId) {
                var elem = document.getElementById(entry.target.id);
                try {
                    elem.classList.add("w3-animate-bottom");
                } catch (e) {
                    console.log("Error adding class to element:", e);
                }
            }
        }
    })
}
let bottomsUpObserver = new IntersectionObserver(bottomsUpCallbackFunc, options);
document.querySelectorAll(".w3-container, .w3-display-container").forEach(card => {
    bottomsUpObserver.observe(card);
});

// Add color transition to tags when they come into view
function colorTransitionCallbackFunc(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains("w3-blue")) {
                entry.target.classList.add("w3-animate-pill-dark-shimmer");
            } else if (entry.target.classList.contains("w3-light-blue")) {
                entry.target.classList.add("w3-animate-pill-medium-shimmer");
            } else if (entry.target.classList.contains("w3-very-light-blue")) {
                entry.target.classList.add("w3-animate-pill-light-shimmer");
            }
        } else {
            entry.target.classList.remove("w3-animate-pill-dark-shimmer");
            entry.target.classList.remove("w3-animate-pill-medium-shimmer");
            entry.target.classList.remove("w3-animate-pill-light-shimmer");
        }
    })
}
let tagObserver = new IntersectionObserver(colorTransitionCallbackFunc, options);
document.querySelectorAll(".w3-tag.w3-round-xlarge").forEach(card => {
    tagObserver.observe(card);
});

window.addEventListener("resize", toggleCards);
document.addEventListener("DOMContentLoaded", toggleCards);