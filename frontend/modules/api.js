const API_BASE_URL = "https://localhost:7092/api";

export async function loginUser(email, password) {
  email = email.toLowerCase();

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    alert("Invalid credentials");
    return null;
  }

  const data = await response.json();
  localStorage.setItem("jwtToken", data.token);
  return data.token;
}

export async function registerUser(firstName, lastName, email, password) {
  email = email.toLowerCase();

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (
      response.status === 400 &&
      responseData.message.includes("email already exists")
    ) {
      alert("User with this email already exists. Try another one.");
    } else {
      alert(
        `Registration failed: ${responseData.message || "Try again later."}`
      );
    }
    return null;
  }

  localStorage.setItem("jwtToken", responseData.token);
  return responseData.token;
}

export async function getUsers() {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    logout();
    return;
  }

  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    alert("Your session has expired. Please log in again.");
    logout();
    return null;
  }

  if (!response.ok) {
    throw new Error("Unauthorized access");
  }

  return await response.json();
}

export function logout() {
  localStorage.removeItem("jwtToken");
  document
    .querySelector(".login-register-container")
    .classList.remove("hidden");
  //document.querySelector(".landing-page-container").classList.add("hidden");
  initializeLoginRegister();
}
