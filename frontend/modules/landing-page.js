
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes('landing.html')) {
        displayFilms();
    }
});
function LoadFilms(){    
    //load an array with film objects
    let loadedFilms = [];
    let film1={
        title:'The Dark Knight',
        description:'Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to',
        rating:9.0
    }
    let film2={
        title:'The Dark Knight',
        description:'Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to',
        rating:9.0
    }
    let film3={
        title:'The Dark Knight',
        description:'Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to',
        rating:9.0
    }
    loadedFilms.push(film1);
    loadedFilms.push(film2);
    loadedFilms.push(film3);
    localStorage.setItem("films", JSON.stringify(loadedFilms));

    window.location.href = './pages/landing.html';
}

function displayFilms(){
    let films = JSON.parse(localStorage.getItem("films")) || [];

    let container = document.querySelector('.landing-page-movies');

    films.forEach(film => {
        let filmCard = document.createElement('div');
        filmCard.classList.add('film-card');

        // Title
        let filmTitle = document.createElement('h3');
        filmTitle.innerHTML = film.title;

        // Description
        let filmDescription = document.createElement('p');
        filmDescription.innerHTML = film.description;

        // Rating
        let filmRating = document.createElement('p');
        filmRating.innerHTML = `Rating: ${film.rating}`;

        // Append elements
        filmCard.appendChild(filmTitle);
        filmCard.appendChild(filmDescription);
        filmCard.appendChild(filmRating);

        container.appendChild(filmCard);
    });
}

export{LoadFilms};