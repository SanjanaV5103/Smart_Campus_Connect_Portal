document.addEventListener("DOMContentLoaded", function () {
  // Fetch Events JSON and Populate
  fetch("data/events.json")
    .then((res) => res.json())
    .then((events) => {
      const container = document.getElementById("eventsContainer");
      events.forEach((event) => {
        const col = document.createElement("div");
        col.className = "col";
        col.innerHTML = `
          <div class="card h-100 shadow-sm event-card">
            <img src="${event.image}" class="card-img-top" alt="${event.title}" style="object-fit:cover; height:180px;">
            <div class="card-body">
              <h4 class="card-title">${event.title}</h4>
              <p class="card-text">${event.description}</p>
              <p class="card-text text-muted"><small>${event.date}</small></p>
            </div>
          </div>
        `;
        container.appendChild(col);
      });
    })
    .catch((err) => console.error("Failed to load events:", err));

  // Feedback Modal Logic
  var form = document.getElementById("feedbackForm");
  var feedbackType = document.getElementById("feedbackType");
  var extraInputContainer = document.getElementById("extraInputContainer");
  var modalEl = document.getElementById("feedbackModal");
  var modalInstance = new window.bootstrap.Modal(modalEl);

  function cleanupModal() {
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    var backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());
    modalEl.classList.remove("show");
    modalEl.style.display = "none";
    modalEl.setAttribute("aria-hidden", "true");
    modalEl.removeAttribute("aria-modal");
    modalEl.removeAttribute("role");
  }

  modalEl.addEventListener("hidden.bs.modal", function () {
    cleanupModal();
    modalInstance = new window.bootstrap.Modal(modalEl);
  });

  var feedbackBtn = document.querySelector('[data-bs-target="#feedbackModal"]');
  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", function () {
      modalInstance.show();
    });
  }

  feedbackType.addEventListener("change", function () {
    var selected = this.value;
    if (selected === "Course" || selected === "Event" || selected === "Facility") {
      extraInputContainer.innerHTML = `
        <label for="extraInput" class="form-label">Enter ${selected} Name</label>
        <input type="text" id="extraInput" class="form-control" placeholder="Enter ${selected} name" />
        <div id="extraInputError" class="text-danger"></div>
      `;
    } else {
      extraInputContainer.innerHTML = "";
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var isValid = true;
    document.querySelectorAll(".text-danger").forEach((el) => (el.textContent = ""));

    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var message = document.getElementById("message");
    var type = feedbackType.value;
    var extraInput = document.getElementById("extraInput");

    if (name.value.trim() === "") {
      document.getElementById("nameError").textContent = "Full Name is required";
      isValid = false;
    }

    var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (email.value.trim() === "") {
      document.getElementById("emailError").textContent = "Enter a valid email address";
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      document.getElementById("emailError").textContent = "Invalid email format";
      isValid = false;
    }

    if (!type) {
      document.getElementById("typeError").textContent = "Select a feedback type";
      isValid = false;
    }

    if (extraInput && extraInput.value.trim() === "") {
      document.getElementById("extraInputError").textContent = "This field is required";
      isValid = false;
    }

    if (message.value.trim() === "") {
      document.getElementById("messageError").textContent = "Message cannot be empty";
      isValid = false;
    }

    if (isValid) {
      const data = {
        name: name.value.trim(),
        email: email.value.trim(),
        type,
        extra: extraInput ? extraInput.value.trim() : "",
        message: message.value.trim()
      };
      console.log("Feedback submitted:", data);
      form.reset();
      extraInputContainer.innerHTML = "";
      modalInstance.hide();
      setTimeout(() => alert("Feedback submitted successfully!"), 500);
    }
  });
});
