// GALLERY VIEWER
const galleryPhotos = document.querySelectorAll(".gallery-photo");
const galleryViewer = document.getElementById("galleryViewer");
const enlargedPhoto = document.getElementById("enlargedPhoto");
const enlargedCaption = document.getElementById("enlargedCaption");
const closeGallery = document.getElementById("closeGallery");

galleryPhotos.forEach(function (photo) {
    photo.addEventListener("click", function () {
        enlargedPhoto.src = photo.src;
        enlargedPhoto.alt = photo.alt;

        const figure = photo.closest("figure");
        const caption = figure
            ? figure.querySelector("figcaption")
            : null;

        enlargedCaption.textContent = caption
            ? caption.textContent
            : photo.alt;

        galleryViewer.hidden = false;
        closeGallery.focus();
    });
});

closeGallery.addEventListener("click", function () {
    galleryViewer.hidden = true;
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !galleryViewer.hidden) {
        galleryViewer.hidden = true;
    }
});
// THEME SWITCH
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeToggle.textContent = "Switch to light mode";
    } else {
        themeToggle.textContent = "Switch to dark mode";
    }
});
// STUDY HOURS CALCULATOR
const studyForm = document.getElementById("studyForm");
const studyResult = document.getElementById("studyResult");

studyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ];

    let totalHours = 0;

    for (const day of days) {
        const input = document.getElementById(day);
        const hours = input.valueAsNumber;

        if (
            input.value.trim() === "" ||
            !Number.isFinite(hours) ||
            hours < 0 ||
            hours > 24
        ) {
            studyResult.textContent =
                "Please enter a number from 0 to 24 for every day.";
            input.focus();
            return;
        }

        totalHours += hours;
    }

    studyResult.textContent =
        "Your total study time for the week is " +
        totalHours.toFixed(2) + " hours.";
});
// CONTACT FORM VALIDATION AND PREVIEW

const contactForm = document.getElementById("contactForm");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactMessage = document.getElementById("contactMessage");

const formFeedback = document.getElementById("formFeedback");
const messagePreview = document.getElementById("messagePreview");

const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewMessage = document.getElementById("previewMessage");

contactForm.addEventListener("submit", function (event) {
    // Stop the page from reloading when the form is submitted.
    event.preventDefault();

    // Remove extra spaces from the beginning and end.
    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const message = contactMessage.value.trim();

    // Hide the previous preview before checking new input.
    messagePreview.hidden = true;

    // Check whether the name is empty.
    if (name === "") {
        formFeedback.textContent = "Please enter your name.";
        contactName.focus();
        return;
    }

    // Check whether the email has a valid format.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formFeedback.textContent =
            "Please enter a valid email address.";
        contactEmail.focus();
        return;
    }

    // Check whether the message is empty.
    if (message === "") {
        formFeedback.textContent = "Please enter your message.";
        contactMessage.focus();
        return;
    }

    // Show the submitted information in the preview.
    previewName.textContent = name;
    previewEmail.textContent = email;
    previewMessage.textContent = message;

    // Display success feedback and the preview.
    formFeedback.textContent =
        "Your form is valid. Review your message below.";

    messagePreview.hidden = false;
});