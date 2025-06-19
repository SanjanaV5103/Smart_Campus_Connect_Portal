document.addEventListener("DOMContentLoaded", () => { 
  const form = document.getElementById("feedbackForm") as HTMLFormElement;
  const feedbackType = document.getElementById("feedbackType") as HTMLSelectElement;
  const extraInputContainer = document.getElementById("extraInputContainer") as HTMLElement;
  const modalEl = document.getElementById("feedbackModal") as HTMLElement;

  let modalInstance: any = new (window as any).bootstrap.Modal(modalEl);

  // Function to properly clean up modal effects
  function cleanupModal(): void {
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    const backdrops: NodeListOf<Element> = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop: Element) => backdrop.remove());

    modalEl.classList.remove("show");
    modalEl.style.display = "none";
    modalEl.setAttribute("aria-hidden", "true");
    modalEl.removeAttribute("aria-modal");
    modalEl.removeAttribute("role");
  }

  // Reinitialize modal immediately after hiding to fix first-click issue
  modalEl.addEventListener("hidden.bs.modal", () => {
    cleanupModal();
    modalInstance = new (window as any).bootstrap.Modal(modalEl);
  });

  // Ensure button click always opens modal
  const feedbackBtn = document.querySelector('[data-bs-target="#feedbackModal"]');
  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", () => {
      modalInstance.show();
    });
  }

  feedbackType.addEventListener("change", function () {
    const selected: string = this.value;
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

  form.addEventListener("submit", function (e: SubmitEvent) {
    e.preventDefault();
    let isValid: boolean = true;

    document.querySelectorAll(".text-danger").forEach((el) => {
      (el as HTMLElement).textContent = "";
    });

    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const message = document.getElementById("message") as HTMLTextAreaElement;
    const type: string = feedbackType.value;
    const extraInput = document.getElementById("extraInput") as HTMLInputElement | null;

    if (name.value.trim() === "") {
      const nameError = document.getElementById("nameError") as HTMLElement;
      nameError.textContent = "Full Name is required";
      isValid = false;
    }

    const emailPattern: RegExp = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (email.value.trim() === "") {
      const emailError = document.getElementById("emailError") as HTMLElement;
      emailError.textContent = "Enter a valid email address";
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      const emailError = document.getElementById("emailError") as HTMLElement;
      emailError.textContent = "Invalid email format";
      isValid = false;
    }

    if (!type) {
      const typeError = document.getElementById("typeError") as HTMLElement;
      typeError.textContent = "Select a feedback type";
      isValid = false;
    }

    if (extraInput && extraInput.value.trim() === "") {
      const extraInputError = document.getElementById("extraInputError") as HTMLElement;
      extraInputError.textContent = "This field is required";
      isValid = false;
    }

    if (message.value.trim() === "") {
      const messageError = document.getElementById("messageError") as HTMLElement;
      messageError.textContent = "Message cannot be empty";
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

      form.reset();
      extraInputContainer.innerHTML = "";
      form.classList.remove("was-validated");

      modalInstance.hide();

      setTimeout(() => {
        alert("Feedback submitted successfully!");
      }, 500);
    }
  });
});
