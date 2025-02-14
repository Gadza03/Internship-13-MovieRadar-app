export function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

export function validateName(name) {
  return name.length >= 2;
}

export function validatePassword(password) {
  return (
    password.length >= 5 && /[A-Za-z]/.test(password) && /\d/.test(password)
  );
}

export function resetFormFields() {
  document.querySelectorAll(".form-error-message").forEach((err) => {
    err.innerHTML = "";
  });

  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  document.querySelectorAll(".input-password").forEach((input) => {
    input.type = "password";
  });

  document.querySelectorAll(".show-hide-icon").forEach((icon) => {
    icon.src = "./assets/icons/visibility_off.svg";
  });
}
