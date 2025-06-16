window.toggleFeedbackForm = function () {
  const formContainer = document.getElementById('feedbackFormContainer');
  formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
};

// Form validation 
(function () {
  const form = document.getElementById('feedbackCardForm');
  const formContainer = document.getElementById('feedbackFormContainer');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      alert("Feedback submitted successfully!");
      form.reset();
      form.classList.remove('was-validated');
      formContainer.style.display = 'none'; 
    }

    form.classList.add('was-validated');
  }, false);
})();
