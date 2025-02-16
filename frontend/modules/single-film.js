import {
  checkUserRating,
  checkUserReview,
  deleteRating,
  deleteReview,
  getMovieById,
  getUserById,
  postRating,
  postReview,
} from "./api.js";
import { formatDate } from "./utils.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const currentUser = JSON.parse(localStorage.getItem("user")) || {};

const mainContainer = document.querySelector(".info-wrapper");

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

async function checkIfReviewExists(params) {
  try {
    const response = await checkUserReview(currentUser.id, movieId);

    if (response) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error opening review:", error);
    alert("Something went wrong while opening the review.");
  }
}

async function handleReview() {
  const reviewExists = await checkIfReviewExists();

  if (reviewExists) {
    alert("You already give review on this movie.");
    return;
  }
  document.body.classList.add("no-scroll");

  const form = document.createElement("form");
  form.id = "review-form";
  form.classList.add("modal-form");
  form.classList.add("modal-review");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const review = document.querySelector("textarea").value;

    if (review.length < 2) {
      alert("Review must contain atleast 2 characters.");
      return;
    }

    try {
      const response = await postReview(currentUser.id, movieId, review);
      alert("Review submitted successfully!");
      location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong while submitting the review.");
    }
  });

  const reviewWrapper = document.createElement("div");
  reviewWrapper.classList.add("review-wrapper");

  reviewWrapper.innerHTML = `
    <p> Give us a feedback: </p>
    <textarea placeholder="Enter your review"></textarea>
  `;

  const submitBtn = createButton("Submit", "submit", "modal-submit");
  const cancelBtn = createButton("Cancel", "button", "modal-cancel", () =>
    closeModal(form)
  );

  form.style.pointerEvents = "auto";

  form.appendChild(reviewWrapper);
  form.appendChild(submitBtn);
  form.appendChild(cancelBtn);

  mainContainer.appendChild(form);
}

async function checkIfRatingExists() {
  try {
    const response = await checkUserRating(currentUser.id, movieId);
    if (response) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error submitting rating:", error);
    alert("Something went wrong while submitting the rating.");
  }
}

async function handleRating() {
  const ratingExists = await checkIfRatingExists();

  if (ratingExists) {
    alert("You already rated this movie.");
    return;
  }

  document.body.classList.add("no-scroll");

  const form = document.createElement("form");
  form.id = "rating-form";
  form.classList.add("modal-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const rating = document.querySelector('input[name="rating"]:checked');

    if (!rating) {
      alert("You have to choose grade before you submit");
      return;
    }

    try {
      const response = await postRating(currentUser.id, movieId, rating.value);
      alert("Rating submitted successfully!");
      location.reload();
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Something went wrong while submitting the rating.");
    }
  });

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

  const submitBtn = createButton("Submit", "submit", "modal-submit");
  const cancelBtn = createButton("Cancel", "button", "modal-cancel", () =>
    closeModal(form)
  );

  form.style.pointerEvents = "auto";
  form.appendChild(rateWrapper);
  form.appendChild(submitBtn);
  form.appendChild(cancelBtn);

  mainContainer.appendChild(form);
}

function createButton(text, type, className, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.type = type;
  button.classList.add(className);
  if (onClick) button.addEventListener("click", onClick);
  return button;
}

function closeModal(form) {
  document.body.classList.remove("no-scroll");
  form.remove();
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
    const ratingInfoElement =
      container.lastElementChild.querySelector(".rating-info");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-rating");
    deleteButton.setAttribute("data-id", rating.id);
    deleteButton.textContent = "Delete";

    if (rating.userId === currentUser.id) {
      //mozda vratit ono
      ratingInfoElement.appendChild(deleteButton);

      deleteButton.addEventListener("click", async () => {
        try {
          await deleteRating(currentUser.id, movieId);
          ratingInfoElement.closest(".feedback-info").remove();
        } catch (error) {
          console.error("Error deleting rating:", error);
        }
      });
    }
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

    const reviewInfo = container.lastElementChild;
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-rating");
    deleteButton.setAttribute("data-id", review.id);
    deleteButton.textContent = "Delete";

    if (review.userId === currentUser.id) {
      reviewInfo.appendChild(deleteButton);

      deleteButton.addEventListener("click", async () => {
        try {
          await deleteReview(currentUser.id, movieId);
          reviewInfo.closest(".feedback-info").remove();
        } catch (error) {
          console.error("Error deleting review:", error);
        }
      });
    }
  }
}
