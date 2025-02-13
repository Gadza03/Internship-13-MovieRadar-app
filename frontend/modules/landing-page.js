const API_BASE_URL = "https://localhost:7092/api";

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes('landing.html')) {
        displayFilms();
        displayAdminButtons();  
    }
});
async function LoadFilms(){    
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
            filmGenre.innerHTML = `Zanr: ${genres[i].name}`;
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
    //let user = JSON.parse(localStorage.getItem("user")) || {};
   // if(user.isAdmin){
        const adminPanel = document.querySelector('.admin-functions');
        adminPanel.classList.remove('hidden');

       const addFilmButton = document.createElement('button');
       addFilmButton.innerHTML = 'Dodaj film';
       addFilmButton.classList.add('admin-button');
       addFilmButton.addEventListener('click', () => {
              window.location.href = './add-film.html';
        });

        const editFilmButton = document.createElement('button');
        editFilmButton.innerHTML = 'Izmjeni film';
        editFilmButton.classList.add('admin-button');
        editFilmButton.addEventListener('click', () => {
            window.location.href = './edit-film.html';
        });

        const deleteFilmButton =document.createElement('button', 'Izbrisi film');
        deleteFilmButton.innerHTML = 'Izbrisi film';
        deleteFilmButton.classList.add('admin-button');
        deleteFilmButton.addEventListener('click', () => {
            window.location.href = './delete-film.html';
        });

        adminPanel.appendChild(addFilmButton);
        adminPanel.appendChild(editFilmButton);
        adminPanel.appendChild(deleteFilmButton);


    //}
}

export{LoadFilms};