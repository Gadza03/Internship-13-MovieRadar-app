const API_BASE_URL = "https://localhost:7092/api";

export async function LoadFilms(num) {
  try {
    const res = await fetch(`${API_BASE_URL}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const genreRes = await fetch(`${API_BASE_URL}/genres`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to load films");
    }
    if (!genreRes.ok) {
      throw new Error("Failed to load genres");
    }

    const films = await res.json();
    const genres = await genreRes.json();

    localStorage.setItem("films", JSON.stringify(films));
    localStorage.setItem("genres", JSON.stringify(genres));

    if (num === 0) {
      window.location.replace("./pages/landing.html");
    } else {
      window.location.replace("./landing.html");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function LoadFilteredFilms(
  genreId,
  releaseYear,
  minRating,
  sortBy
) {
  try {
    let url = new URL(`${API_BASE_URL}/movies/filter`);
    let params = new URLSearchParams();

    if (genreId) params.append("genreId", genreId);
    if (releaseYear) params.append("releaseYear", releaseYear);
    if (minRating) params.append("minRating", minRating);
    if (sortBy) params.append("sortBy", sortBy);

    url.search = params.toString();

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      alert("Failed to load filtered movies");
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Error loading filtered films:", err);
    return [];
  }
}

export async function getAllUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      alert("Error fetching users:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    alert("Error fetching users:", error);
    return null;
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
    localStorage.clear();
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

export async function getUserById(id) {
  const response = await fetch(`${API_BASE_URL}/users/id/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unauthorized access");
  }

  return await response.json();
}

//movie single page
export async function getMovieById(id) {
  const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unauthorized access");
  }

  const data = await response.json();

  return data;
}

export async function postRating(userId, movieId, ratingValue) {
  const response = await fetch(`${API_BASE_URL}/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, movieId, ratingValue }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();

  return data;
}

export async function checkUserRating(userId, movieId) {
  const response = await fetch(`${API_BASE_URL}/ratings/${userId}/${movieId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }
  return await response.json();
}

export async function deleteRating(userId, movieId) {
  const response = await fetch(`${API_BASE_URL}/ratings/${userId}/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete rating");
  }
  return await response.json();
}

export async function checkUserReview(userId, movieId) {
  const response = await fetch(`${API_BASE_URL}/reviews/${userId}/${movieId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }
  return await response.json();
}

export async function postReview(userId, movieId, content) {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, movieId, content }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();

  return data;
}

export async function deleteReview(userId, movieId) {
  const response = await fetch(`${API_BASE_URL}/reviews/${userId}/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete rating");
  }
  return await response.json();
}

export async function logout() {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  window.location.replace("../index.html");
  //window.location.href = "../index.html";
  initializeLoginRegister();
}

export async function AddFilm(film) {
  try {
    const res = await fetch(`${API_BASE_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    });

    if (!res.ok) {
      throw new Error("Failed to add film");
    }

    const newMovie = await res.json();

    let movies = JSON.parse(localStorage.getItem("films"));
    movies.push(newMovie);
    localStorage.setItem("films", JSON.stringify(movies));
    alert(`Film ${newMovie.title} added successfully`);

    LoadFilms(1);
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateFilm(film) {
  try {
    const res = await fetch(`${API_BASE_URL}/movies/${film.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    });

    if (!res.ok) {
      throw new Error("Failed to update film");
    }

    const updatedMovie = await res.json();

    let movies = JSON.parse(localStorage.getItem("films"));
    let index = movies.findIndex((f) => f.id === updatedMovie.id);
    if (index !== -1) {
      movies[index] = updatedMovie;
    }
    localStorage.setItem("films", JSON.stringify(movies));
    alert(`Film ${updatedMovie.title} updated successfully`);

    LoadFilms(1);
  } catch (err) {
    console.log(err);
  }
}

export async function RemoveFilm(filmId) {
  try {
    const res = await fetch(`${API_BASE_URL}/movies/${filmId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete film");
    }

    let movies = JSON.parse(localStorage.getItem("films"));
    movies = movies.filter((film) => film.id !== filmId);
    localStorage.setItem("films", JSON.stringify(movies));
    alert(`Film deleted successfully`);

    LoadFilms(1);
  } catch (err) {
    console.log(err);
  }
}
