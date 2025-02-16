import { getAllUsers } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const usersTableBody = document.getElementById("all-users-table-body");
  const errorMessage = document.getElementById("all-users-error-message");
  const backBtn = document.getElementById("all-users-back-button");

  const users = await getAllUsers();

  if (!users || users.length === 0) {
    errorMessage.innerText = "No users found or you don't have permission.";
    return;
  }

  usersTableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.reviewCount}</td>
      <td>${user.averageRating}</td>
    `;
    usersTableBody.appendChild(row);
  });

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "../pages/landing.html";
    });
  }
});
