const API_BASE_URL = "https://localhost:7092/api";
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes('landing.html')) {
        displayFilms();
    }
});
async function LoadFilms(){    
    try{
        let loadedFilms = [];
        const res=await fetch(`${API_BASE_URL}/movies`);
        if(!res.ok){
            throw new Error('Failed to load films');
        }
        const films=await res.json();
        console.log(films);
        // films.forEach(film => {
        //     loadedFilms.push(film);
        // });
        let film1={
            title:'The Dark Knight',
            description:'Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to',
            rating:9.0, 
            genre:'Action',
            year:2008
        }
        let film2={
            title:'The Dark Knight',
            description:'Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
            rating:9.0, 
            genre:'Action',
            year:2008
        }
        let film3={
            title:'The Dark Knight',
            description:'Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to',
            rating:9.0,
            genre:'Action',
            year:2008
        }
        loadedFilms.push(film1);
        loadedFilms.push(film2);
        loadedFilms.push(film3);
        localStorage.setItem("films", JSON.stringify(loadedFilms));
    
        window.location.href = './pages/landing.html';
    }
    catch(err){
        console.log(err);
    }
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
        filmTitle.classList.add('film-title');

        // Description
        let filmDescription = document.createElement('p');
        filmDescription.innerHTML = film.description;

        // Rating
        let filmRating = document.createElement('p');
        filmRating.innerHTML = `Rating: ${film.rating}`;

        // Genre
        let filmGenre = document.createElement('p');
        filmGenre.innerHTML = `Genre: ${film.genre}`;
        filmGenre.classList.add('hidden-text');

        // Year
        let filmYear = document.createElement('p');
        filmYear.innerHTML = `Year: ${film.year}`;
        filmYear.classList.add('hidden-text');

        // Append elements
        filmCard.appendChild(filmTitle);
        filmCard.appendChild(filmDescription);
        filmCard.appendChild(filmRating);
        filmCard.appendChild(filmGenre);
        filmCard.appendChild(filmYear);

        container.appendChild(filmCard);
    });
}

export{LoadFilms};