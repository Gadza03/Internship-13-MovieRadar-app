const API_BASE_URL = "https://localhost:7092/api";

export async function LoadFilms(){    
    try{
        const res = await fetch(`${API_BASE_URL}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const genreRes = await fetch(`${API_BASE_URL}/genres`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // const loggedUser=await fetch(`${API_BASE_URL}/users`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         credetials: 'include'
        //     },
        // });
        if(!res.ok){
            throw new Error('Failed to load films');
        }
        if(!genreRes.ok){
            throw new Error('Failed to load genres');
        }
        // if(!loggedUser.ok){
        //     throw new Error('Failed to load user');
        // }
        const films=await res.json();
        const genres=await genreRes.json();
        //const user=await loggedUser.json();

        localStorage.setItem("films", JSON.stringify(films));
        localStorage.setItem("genres", JSON.stringify(genres));
        //localStorage.setItem("user", JSON.stringify(user));
        
        window.location.href = './pages/landing.html';
    }
    catch(err){
        console.log(err);
    }
}const API_BASE_URL = "https://localhost:7092/api";

export async function loginUser(email, password) {
  email = email.toLowerCase();

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (responseData.errors) {
      alert(Object.values(responseData.errors).flat().join("\n"));
    } else {
      alert(responseData.message || "Login failed. Try again later.");
    }
    return false;
  }

  return true;
}

export async function registerUser(firstName, lastName, email, password) {
  email = email.toLowerCase();

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (responseData.errors) {
      alert(Object.values(responseData.errors).flat().join("\n"));
    } else {
      alert(responseData.message || "Registration failed. Try again later.");
    }
    return false;
  }

  return true;
}

export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    credentials: "include",
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

//Logout for later
export async function logout() {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  window.location.href = "../index.html";
  initializeLoginRegister();
}
