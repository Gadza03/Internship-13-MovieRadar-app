const API_BASE_URL = "https://localhost:7092/api";

export async function LoadFilms(num){    
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

        if(!res.ok){
            throw new Error('Failed to load films');
        }
        if(!genreRes.ok){
            throw new Error('Failed to load genres');
        }

        const films=await res.json();
        const genres=await genreRes.json();

        localStorage.setItem("films", JSON.stringify(films));
        localStorage.setItem("genres", JSON.stringify(genres));

        if(num===0){
            window.location.replace('./pages/landing.html');
        }
        else{
            window.location.replace('./landing.html');
        }
    }
    catch(err){
        console.log(err);
    }
}

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

export async function getUserByEmail(email) {
    const response = await fetch(`${API_BASE_URL}/users/${email}`, {
        method: "GET",
        credentials: "include",
    });
    
    if (!response.ok) {
        throw new Error("Unauthorized access");
    }
    
    let user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));

}

//Logout for later
export async function logout() {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  window.location.replace("../index.html");
  //window.location.href = "../index.html";
  initializeLoginRegister();
}

export async function AddFilm(film){
    try{
        const res = await fetch(`${API_BASE_URL}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(film)
        });

        if(!res.ok){
            throw new Error('Failed to add film');
        } 
        
        const newMovie=await res.json();


        let movies=JSON.parse(localStorage.getItem("films"));
        movies.push(newMovie);
        localStorage.setItem("films", JSON.stringify(movies));
        alert(`Film ${newMovie.title} added successfully`);

        LoadFilms(1);
    }
    catch(err){
        console.log(err);
    }
}

export async function UpdateFilm(film){
    try{
        const res = await fetch(`${API_BASE_URL}/movies/${film.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(film)
        });

        if(!res.ok){
            throw new Error('Failed to update film');
        }

        const updatedMovie=await res.json();

        let movies=JSON.parse(localStorage.getItem("films"));
        let index = movies.findIndex(f => f.id === updatedMovie.id);
        if (index !== -1) {
          movies[index] = updatedMovie;
        }
        localStorage.setItem("films", JSON.stringify(movies));
        alert(`Film ${updatedMovie.title} updated successfully`);
       
          LoadFilms(1);
    }
    catch(err){
        console.log(err);
    }
}

export async function RemoveFilm(filmId){
    try{
        const res = await fetch(`${API_BASE_URL}/movies/${filmId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!res.ok){
            throw new Error('Failed to delete film');
        }

        let movies=JSON.parse(localStorage.getItem("films"));
        movies=movies.filter(film => film.id !== filmId);
        localStorage.setItem("films", JSON.stringify(movies));
        alert(`Film deleted successfully`);
        
          LoadFilms(1);
    }
    catch(err){
        console.log(err);
    }
}
