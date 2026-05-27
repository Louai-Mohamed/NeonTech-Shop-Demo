function clearErrors() {
  const errorIds = ["name-error", "email-error", "message-error"];
  errorIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = "";
    }
  });
}

function validateContactForm(form) {
  clearErrors();
  let valid = true;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name) {
    document.getElementById("name-error").textContent = "Name is required";
    valid = false;
  }

  if (!email) {
    document.getElementById("email-error").textContent = "Email is required";
    valid = false;
  }

  if (!message) {
    document.getElementById("message-error").textContent = "Message is required";
    valid = false;
  }

  return valid;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateContactForm(form)) {
      status.textContent = "Please fix the errors and submit again.";
      return;
    }

    status.textContent = "Form submitted successfully. (Demo mode)";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
});
