export function initializeLoginRegister() {
  const registerForm = document.querySelector(".register-form");
  const loginForm = document.querySelector(".login-form");

  const showHide = document.querySelectorAll(".show-hide-icon");

  const signUp = document.querySelector(".login-register-switch__register");
  const logIn = document.querySelector(".login-register-switch__login");

  showHide.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
      const parent = eyeIcon.closest(".login-register-input-field");
      const passwordInput = parent.querySelector(".input-password");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.src = "./assets/icons/visibility.svg";
      } else {
        passwordInput.type = "password";
        eyeIcon.src = "./assets/icons/visibility_off.svg";
      }
    });
  });

  function resetFormFields() {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });

    document.querySelectorAll(".input-password").forEach((input) => {
      input.type = "password";
    });

    showHide.forEach((icon) => {
      icon.src = "./assets/icons/visibility_off.svg";
    });
  }

  signUp.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    resetFormFields();
  });

  logIn.addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    resetFormFields();
  });
}
