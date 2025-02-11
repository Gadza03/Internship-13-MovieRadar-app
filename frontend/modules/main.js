import { loginUser, logout, registerUser } from "./api.js";
import { initializeLoginRegister } from "../modules/login-register.js";
import { validateEmail } from "./helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeLoginRegister();

  const loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const email = document
        .getElementById("login-email")
        .value.trim()
        .toLowerCase();
      const password = document.getElementById("login-password").value.trim();

      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Invalid email format.");
        return;
      }

      loginButton.disabled = true;
      const token = await loginUser(email, password);

      if (!token) {
        loginButton.disabled = false;
        return;
      }

      alert("Login successful!");
      initializeLoginRegister();
      document
        .querySelector(".login-register-container")
        .classList.add("hidden");
      //document.querySelector(".landing-page-container").classList.remove("hidden");
      loginButton.disabled = false;
    });
  }

  const registerButton = document.getElementById("register-button");
  if (registerButton) {
    registerButton.addEventListener("click", async (event) => {
      event.preventDefault();

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
        alert("Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Invalid email format.");
        return;
      }

      registerButton.disabled = true;
      const token = await registerUser(firstName, lastName, email, password);

      if (!token) {
        registerButton.disabled = false;
        return;
      }

      alert("Registration successful!");
      initializeLoginRegister();
      document.querySelector(".register-form").classList.add("hidden");
      document.querySelector(".login-form").classList.remove("hidden");
      document
        .querySelector(".login-register-container")
        .classList.add("hidden");
      //document.querySelector(".landing-page-container").classList.remove("hidden");
      registerButton.disabled = false;
    });
  }

  //Logout for later
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
});
