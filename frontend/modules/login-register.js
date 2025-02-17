import { resetFormFields } from "./helpers.js";

export function initializeLoginRegister() {
  resetFormFields();

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

  if (signUp) {
    signUp.addEventListener("click", () => {
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
      resetFormFields();
    });
  }

  if (logIn) {
    logIn.addEventListener("click", () => {
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      resetFormFields();
    });
  }
}
