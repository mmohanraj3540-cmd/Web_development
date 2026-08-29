document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector(".contact-form");
  const status = document.querySelector("#form-status");

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Please correct the required fields and try again.";
        return;
      }
      status.textContent = "Your form is valid. Connect this form to a backend or form service to send messages.";
    });
  }
});
