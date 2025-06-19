document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("feedbackForm");
    var feedbackType = document.getElementById("feedbackType");
    var extraInputContainer = document.getElementById("extraInputContainer");
    var modalEl = document.getElementById("feedbackModal");
    var modalInstance = new window.bootstrap.Modal(modalEl);
    // Function to properly clean up modal effects
    function cleanupModal() {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        var backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach(function (backdrop) { return backdrop.remove(); });
        modalEl.classList.remove("show");
        modalEl.style.display = "none";
        modalEl.setAttribute("aria-hidden", "true");
        modalEl.removeAttribute("aria-modal");
        modalEl.removeAttribute("role");
    }
    // Reinitialize modal immediately after hiding to fix first-click issue
    modalEl.addEventListener("hidden.bs.modal", function () {
        cleanupModal();
        modalInstance = new window.bootstrap.Modal(modalEl);
    });
    // Ensure button click always opens modal
    var feedbackBtn = document.querySelector('[data-bs-target="#feedbackModal"]');
    if (feedbackBtn) {
        feedbackBtn.addEventListener("click", function () {
            modalInstance.show();
        });
    }
    feedbackType.addEventListener("change", function () {
        var selected = this.value;
        if (selected === "Course" || selected === "Event" || selected === "Facility") {
            extraInputContainer.innerHTML = "\n        <label for=\"extraInput\" class=\"form-label\">Enter ".concat(selected, " Name</label>\n        <input type=\"text\" id=\"extraInput\" class=\"form-control\" placeholder=\"Enter ").concat(selected, " name\" />\n        <div id=\"extraInputError\" class=\"text-danger\"></div>\n      ");
        }
        else {
            extraInputContainer.innerHTML = "";
        }
    });
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var isValid = true;
        document.querySelectorAll(".text-danger").forEach(function (el) {
            el.textContent = "";
        });
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var message = document.getElementById("message");
        var type = feedbackType.value;
        var extraInput = document.getElementById("extraInput");
        if (name.value.trim() === "") {
            var nameError = document.getElementById("nameError");
            nameError.textContent = "Full Name is required";
            isValid = false;
        }
        var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
        if (email.value.trim() === "") {
            var emailError = document.getElementById("emailError");
            emailError.textContent = "Enter a valid email address";
            isValid = false;
        }
        else if (!emailPattern.test(email.value.trim())) {
            var emailError = document.getElementById("emailError");
            emailError.textContent = "Invalid email format";
            isValid = false;
        }
        if (!type) {
            var typeError = document.getElementById("typeError");
            typeError.textContent = "Select a feedback type";
            isValid = false;
        }
        if (extraInput && extraInput.value.trim() === "") {
            var extraInputError = document.getElementById("extraInputError");
            extraInputError.textContent = "This field is required";
            isValid = false;
        }
        if (message.value.trim() === "") {
            var messageError = document.getElementById("messageError");
            messageError.textContent = "Message cannot be empty";
            isValid = false;
        }
        if (isValid) {
            var data = {
                name: name.value.trim(),
                email: email.value.trim(),
                type: type,
                extra: extraInput ? extraInput.value.trim() : "",
                message: message.value.trim(),
            };
            console.log("Feedback submitted:", data);
            form.reset();
            extraInputContainer.innerHTML = "";
            form.classList.remove("was-validated");
            modalInstance.hide();
            setTimeout(function () {
                alert("Feedback submitted successfully!");
            }, 500);
        }
    });
});
