document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");
  const feedbackType = document.getElementById("feedbackType");
  const extraInputContainer = document.getElementById("extraInputContainer");

  // Show textbox when Course/Event/Facility is selected
  feedbackType.addEventListener("change", function () {
    const selected = this.value;
    if (["Course", "Event", "Facility"].includes(selected)) {
      extraInputContainer.innerHTML = `
        <label for="extraInput" class="form-label">Enter ${selected} Name</label>
        <input type="text" id="extraInput" class="form-control" placeholder="Enter ${selected} name" />
        <div id="extraInputError" class="text-danger"></div>
      `;
    } else {
      extraInputContainer.innerHTML = "";
    }
  });

  // Form validation and submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document
      .querySelectorAll(".text-danger")
      .forEach((el) => (el.textContent = ""));

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const type = feedbackType.value;
    const extraInput = document.getElementById("extraInput");

    // Validate Name
    if (name.value.trim() === "") {
      document.getElementById("nameError").textContent =
        "Full Name is required";
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (email.value.trim() === "") {
      document.getElementById("emailError").textContent =
        "Enter a valid email address";
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      document.getElementById("emailError").textContent =
        "Invalid email format";
      isValid = false;
    }

    // Validate Type
    if (!type) {
      document.getElementById("typeError").textContent =
        "Select a feedback type";
      isValid = false;
    }

    // Validate Extra Input
    if (extraInput && extraInput.value.trim() === "") {
      document.getElementById("extraInputError").textContent =
        "This field is required";
      isValid = false;
    }

    // Validate Message
    if (message.value.trim() === "") {
      document.getElementById("messageError").textContent =
        "Message cannot be empty";
      isValid = false;
    }

    if (isValid) {
      const data = {
        name: name.value.trim(),
        email: email.value.trim(),
        type: type,
        extra: extraInput ? extraInput.value.trim() : "",
        message: message.value.trim(),
      };
      console.log("Feedback submitted:", data);
      alert("Feedback submitted successfully!");
      form.reset();
      extraInputContainer.innerHTML = "";
      form.classList.remove("was-validated");
      const modalEl = document.getElementById("feedbackModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
        modalEl.classList.remove("show");
        document.body.classList.remove("modal-open");
        document.querySelector(".modal-backdrop")?.remove();
      }
    }
  });
});
