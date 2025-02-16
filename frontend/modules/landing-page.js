export function Show(){
    document.addEventListener("DOMContentLoaded", function () {
        if (window.location.pathname.includes('landing.html')) {
            displayFilms()
            displayAdminButtons();  
        }
    });
}

function displayFilms(){
    let films = JSON.parse(localStorage.getItem("films")) || [];
    let genres = JSON.parse(localStorage.getItem("genres")) || [];

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
        filmRating.innerHTML = `Rating: ${film.averageRating}`;

        // Genre
        let filmGenre = document.createElement('p');
        for (let i = 0; i < genres.length; i++) {
            if (genres[i].id === film.genreId) {
            filmGenre.innerHTML = `Genre: ${genres[i].name}`;
            filmGenre.classList.add('hidden-text');
            break;
            }
        }

        // Year
        let filmYear = document.createElement('p');
        filmYear.innerHTML = `Year: ${film.releaseYear}`;
        filmYear.classList.add('hidden-text');

        //Picture 
        let filmPicture = document.createElement('img');
        //filmPicture.src = film.imageUrl;
        filmPicture.src = '../assets/images/interstellar-movie.jpg';
        filmPicture.classList.add('film-picture-hidden');
        

        // Append elements
        filmCard.appendChild(filmTitle);
        filmCard.appendChild(filmDescription);
        filmCard.appendChild(filmRating);
        filmCard.appendChild(filmGenre);
        filmCard.appendChild(filmYear);
        filmCard.appendChild(filmPicture);
        filmCard.appendChild(filmPicture);

        container.appendChild(filmCard);
    });
}

function displayAdminButtons(){
    let user = JSON.parse(localStorage.getItem("user")) || {};
    
    if(user.isAdmin){
        const getAllUsers=document.getElementById('show-users');
        getAllUsers.classList.remove('hidden');

        const adminPanel = document.querySelector('.admin-functions');
        adminPanel.classList.remove('hidden');

       const addFilmButton = document.createElement('button');
       addFilmButton.innerHTML = 'Dodaj film';
       addFilmButton.classList.add('admin-button');
       addFilmButton.addEventListener('click', () => {
        window.location.replace('./add-film.html');
    });

        const editFilmButton = document.createElement('button');
        editFilmButton.innerHTML = 'Izmjeni film';
        editFilmButton.classList.add('admin-button');
        editFilmButton.addEventListener('click', () => {
            window.location.replace('./edit-film.html');
        });

        const deleteFilmButton =document.createElement('button', 'Izbrisi film');
        deleteFilmButton.innerHTML = 'Izbrisi film';
        deleteFilmButton.classList.add('admin-button');
        deleteFilmButton.addEventListener('click', () => {
            window.location.replace('./delete-film.html');
        });

        adminPanel.appendChild(addFilmButton);
        adminPanel.appendChild(editFilmButton);
        adminPanel.appendChild(deleteFilmButton);
    }
}
