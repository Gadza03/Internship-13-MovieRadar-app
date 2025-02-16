import { getMovieById, getUserById } from "./api.js";
import { formatDate } from "./utils.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

document.addEventListener("DOMContentLoaded", () => {
  initializeMovieDetails();

  document.querySelectorAll("[data-tab-target]").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab));
  });

  const ratingBtn = document.getElementById("add-rating");
  const reviewBtn = document.getElementById("add-review");

  ratingBtn.addEventListener("click", handleRating);
  reviewBtn.addEventListener("click", handleReview);
});

function handleRating() {
  const mainContainer = document.querySelector(".info-wrapper");
  document.body.classList.add("no-scroll"); // Sprečava interakciju sa pozadinom

  if (document.getElementById("rating-form")) return;

  const form = document.createElement("form");
  form.id = "rating-form";
  form.classList.add("modal-form");

  const rateWrapper = document.createElement("div");
  rateWrapper.classList.add("rate-wrapper");

  for (let i = 1; i <= 5; i++) {
    rateWrapper.innerHTML += `
      <div class="single-wrapper">
        <label for="${i}">${i}</label>    
        <input type="radio" name="rating" value="${i}" />
      </div>
     
    `;
  }

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.type = "submit";
  submitBtn.classList.add("modal-submit");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.type = "button";
  cancelBtn.classList.add("modal-cancel");

  cancelBtn.addEventListener("click", () => {
    document.body.classList.remove("no-scroll");
    form.remove();
  });

  form.style.pointerEvents = "auto";
  form.appendChild(rateWrapper);
  form.appendChild(submitBtn);
  form.appendChild(cancelBtn);

  mainContainer.appendChild(form);
}

function switchTab(selectedTab) {
  document.querySelectorAll("[data-tab-content]").forEach((content) => {
    content.classList.remove("active");
  });

  document.querySelectorAll("[data-tab-target]").forEach((tab) => {
    tab.classList.remove("active-tab");
  });

  selectedTab.classList.add("active-tab");
  document.querySelector(selectedTab.dataset.tabTarget).classList.add("active");
}

async function initializeMovieDetails() {
  if (!movieId) {
    document.body.innerHTML = "<h2>Film nije pronađen</h2>";
    return;
  }

  try {
    const movieInfo = await fetchMovie(movieId);
    displayMovieData(movieInfo);
  } catch (error) {
    console.error("Greška:", error.message);
    document.body.innerHTML = "<h2>Greška pri dohvaćanju filma</h2>";
  }
}

async function fetchMovie(id) {
  return await getMovieById(id);
}

async function fetchUserById(id) {
  try {
    return await getUserById(id);
  } catch (error) {
    console.error("Greška:", error.message);
  }
}

function displayMovieData(movieInfo) {
  const infoDetails = document.querySelector(".info-details");
  const ratingsContainer = document.getElementById("ratings");
  const reviewContainer = document.getElementById("reviews");

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

  displayRatings(movieInfo.ratings, ratingsContainer);
  displayReviews(movieInfo.reviews, reviewContainer);
}

async function displayRatings(ratings, container) {
  container.innerHTML = "";
  if (ratings.length === 0) {
    container.innerHTML = "<p class='no-data'>No ratings found</p>";
    return;
  }
  for (const rating of ratings) {
    const user = await fetchUserById(rating.userId);
    container.innerHTML += `
      <div class="feedback-info">
        <div class="rating-info">
          <div class="rating-wrapper">
            <p class="rating">${rating.ratingValue}</p>
            <img src="../assets/images/star.png" alt="star for rating" /> 
          </div>
          <p class="user-info">${user.firstName} ${user.lastName}</p>
          <p class="created-at">${formatDate(rating.createdAt)}</p>
        </div>
      </div>`;
  }
}

async function displayReviews(reviews, container) {
  container.innerHTML = "";
  if (reviews.length === 0) {
    container.innerHTML = "<p class='no-data'>No reviews found</p>";
    return;
  }
  for (const review of reviews) {
    const user = await fetchUserById(review.userId);
    container.innerHTML += `
        <div class="feedback-info">
          <p class="review">${review.content}</p>
          <div class="person-info">
            <p class="user-info">By: ${user.firstName} ${user.lastName}</p>
            <p class="created-at">${formatDate(review.createdAt)}</p>
          </div>
        </div>`;
  }
}
