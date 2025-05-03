const skillsLeft = document.getElementById("skills-left");
const projectsLeft = document.getElementById("projects-left");
const skillsBottom = document.getElementById("skills-bottom");
const projectsBottom = document.getElementById("projects-bottom");
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
        projectsLeft.style.display = "none";
        skillsBottom.style.display = "block";
        projectsBottom.style.display = "block";
    } else {
        skillsLeft.style.display = "block";
        projectsLeft.style.display = "block";
        skillsBottom.style.display = "none";
        projectsBottom.style.display = "none";

        bio.classList.add("w3-margin-bottom");
        education.classList.remove("w3-margin-bottom");
    }
};

// Add movement animation to cards when they come into view
let options = { root: null, rootMargin: '0px', threshold: 0.01 };
function bottomsUpCallbackFunc(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id != "name" && entry.target.id != "footer") {
                entry.target.classList.add("w3-animate-bottom");
            }
        }
    })
}
let bottomsUpObserver = new IntersectionObserver(bottomsUpCallbackFunc, options);
document.querySelectorAll(".w3-container, .w3-display-container").forEach(card => {
    bottomsUpObserver.observe(card);
});

// Add color transition to tags when they come into view
var iteration = 0;
function colorTransitionCallbackFunc(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            iteration += 1;
            if (entry.target.classList.contains("w3-blue")) {
                entry.target.classList.add("w3-animate-pill-dark-shimmer");
            } else if (entry.target.classList.contains("w3-light-blue")) {
                entry.target.classList.add("w3-animate-pill-medium-shimmer");
            } else if (entry.target.classList.contains("w3-very-light-blue")) {
                entry.target.classList.add("w3-animate-pill-light-shimmer");
            }
            entry.target.classList.add(`delay-${iteration}`);
        } else {
            entry.target.classList.remove("w3-animate-pill-dark-shimmer");
            entry.target.classList.remove("w3-animate-pill-medium-shimmer");
            entry.target.classList.remove("w3-animate-pill-light-shimmer");

            let classNames = entry.target.className.split(' ');
            classNames = classNames.filter(className => !className.startsWith("delay-"));
            entry.target.className = classNames.join(' ');
        }
    });

    // if max is hit or all tags out of view, reset iteration
    const visibleTags = Array.from(entries).filter(entry => entry.isIntersecting);
    if (iteration > 39 || visibleTags.length === 0) {
        iteration = 0;
    }
}
let tagObserver = new IntersectionObserver(colorTransitionCallbackFunc, options);
document.querySelectorAll(".w3-tag.w3-round-xlarge").forEach(card => {
    tagObserver.observe(card);
});

window.addEventListener("resize", toggleCards);
document.addEventListener("DOMContentLoaded", toggleCards);