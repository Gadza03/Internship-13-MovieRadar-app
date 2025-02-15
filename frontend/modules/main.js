import { loginUser, logout, registerUser,getUserByEmail } from "./api.js";
import { initializeLoginRegister } from "./login-register.js";
import { validateEmail, validateName, validatePassword } from "./helpers.js";
import { LoadFilms } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeLoginRegister();

  function displayError(form, message) {
    const errorDiv = document.getElementById(`${form}-error-message`);
    if (errorDiv) {
      errorDiv.innerHTML = message;
    }
  }

  function clearError(form) {
    const errorDiv = document.getElementById(`${form}-error-message`);
    if (errorDiv) {
      errorDiv.innerHTML = "";
    }
  }

  const loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", async (event) => {
      event.preventDefault();
      clearError("login");

      const email = document
        .getElementById("login-email")
        .value.trim()
        .toLowerCase();
      const password = document.getElementById("login-password").value.trim();

      if (!email || !password) {
        displayError("login", "Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        displayError("login", "Invalid email format.");
        return;
      }

      loginButton.disabled = true;

      if (!(await loginUser(email, password))) {
        loginButton.disabled = false;
        return;
      }

      //iznekog razloga se logira makar bili kiriv credentials

      getUserByEmail(email);
      LoadFilms();
    });
  }

  const registerButton = document.getElementById("register-button");
  if (registerButton) {
    registerButton.addEventListener("click", async (event) => {
      event.preventDefault();
      clearError("register");

      const firstName = document
        .getElementById("register-first-name")
        .value.trim();
      const lastName = document
        .getElementById("register-last-name")
        .value.trim();
      const email = document
        .getElementById("register-email")
        .value.trim()
        .toLowerCase();
      const password = document
        .getElementById("register-password")
        .value.trim();

      if (!firstName || !lastName || !email || !password) {
        displayError("register", "Please fill in all fields.");
        return;
      }

      if (!validateName(firstName) || !validateName(lastName)) {
        displayError(
          "register",
          "First and last name must have at least 2 characters."
        );
        return;
      }

      if (!validateEmail(email)) {
        displayError("register", "Invalid email format.");
        return;
      }

      if (!validatePassword(password)) {
        displayError(
          "register",
          "Password must contain at least one letter, one number, and be at least 5 characters long."
        );
        return;
      }

      registerButton.disabled = true;

      if (!(await registerUser(firstName, lastName, email, password))) {
        registerButton.disabled = false;
        return;
      }

      getUserByEmail(email);
      LoadFilms();
    });
  }

  //Logout for later
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
});
