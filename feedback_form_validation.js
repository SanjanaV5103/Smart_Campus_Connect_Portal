document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");
  const feedbackType = document.getElementById("feedbackType");
  const extraInputContainer = document.getElementById("extraInputContainer");

  // Function to properly clean up modal effects
  function cleanupModal() {
    // Remove modal-related classes and styles from body
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    
    // Remove any modal backdrops
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    
    // Make sure the modal is properly hidden
    const modalEl = document.getElementById("feedbackModal");
    modalEl.classList.remove("show");
    modalEl.style.display = "none";
    modalEl.setAttribute("aria-hidden", "true");
    modalEl.removeAttribute("aria-modal");
    modalEl.removeAttribute("role");
  }

  // Add event listener for when modal is hidden
  const modalEl = document.getElementById("feedbackModal");
  modalEl.addEventListener('hidden.bs.modal', function () {
    // Run cleanup after modal is hidden
    setTimeout(cleanupModal, 100);
  });

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
      
      // Reset form
      form.reset();
      extraInputContainer.innerHTML = "";
      form.classList.remove("was-validated");
      
      // Hide modal using Bootstrap API
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
        
        // Run cleanup immediately and also after a short delay to ensure it works
        cleanupModal();
        setTimeout(cleanupModal, 300);
        
        // Show success message after modal is hidden
        setTimeout(() => {
          alert("Feedback submitted successfully!");
        }, 500);
      }
    }
  });
});