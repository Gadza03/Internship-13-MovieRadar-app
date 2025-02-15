import { getMovieById, getUserById } from "./api.js";

const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });
    tab.classList.add("active-tab");
    target.classList.add("active");
  });
});

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

let movieInfo;

if (!movieId) {
  document.body.innerHTML = "<h2>Film nije pronađen</h2>";
} else {
  movieInfo = await fetchMovie(movieId);
}

async function fetchMovie(id) {
  try {
    const movie = await getMovieById(id);
    return movie;
  } catch (error) {
    console.error("Greška:", error.message);
    document.body.innerHTML = "<h2>Greška pri dohvaćanju filma</h2>";
  }
}

const infoDetails = document.querySelector(".info-details");
const ratingsContainer = document.getElementById("ratings");

function displayMovieData() {
  infoDetails.innerHTML = `
    <h2 class="title">${movieInfo.title}</h2>
    <div class="details">
      <p class="releaseYear">${movieInfo.releaseYear}</p>
      <p class="genre">${movieInfo.genreName}</p>
      <div class="rating-wrapper">
        <p class="averageRating">${movieInfo.averageRating}</p>
        <img src="../assets/images/star.png" alt="star for rating" />
      </div>
    </div>
    <p class="description">${movieInfo.description}</p>`;

  ratingsContainer.innerHTML = "";
  (async () => {
    for (const rating of movieInfo.ratings) {
      let userById = await fetchUserById(rating.userId);

      ratingsContainer.innerHTML += `
        <div class="rating-info">
          <div class="rating-wrapper">
            <p class="rating">${rating.ratingValue}</p>
            <img src="../assets/images/star.png" alt="star for rating" /> 
          </div>
          <p class="user-info">${userById.firstName} ${userById.lastName}</p>
          <p class="created-at">${formatDate(rating.createdAt)}</p>
        </div>`;
    }
  })();
}

async function fetchUserById(id) {
  try {
    const user = await getUserById(id);
    return user;
  } catch (error) {
    console.error("Greška:", error.message);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("hr-HR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

displayMovieData();
