document.addEventListener("DOMContentLoaded", () => {
  const loginRegisterContainer = document.querySelector(
    ".login-register-container"
  );
  const showHide = document.querySelectorAll(".show-hide-icon");
  const passwordInput = document.querySelectorAll(".input-password");

  showHide.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
      passwordInput.forEach((pwInput) => {
        if (pwInput.type === "password") {
          pwInput.type = "text";
          showHide.forEach((icon) => {
            icon.src = "./assets/icons/visibility.svg";
          });
        } else {
          pwInput.type = "password";
          showHide.forEach((icon) => {
            icon.src = "./assets/icons/visibility_off.svg";
          });
        }
      });
    });
  });
});
