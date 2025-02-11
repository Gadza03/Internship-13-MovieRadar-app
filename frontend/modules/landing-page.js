function LoadFilms(){
    //load an array with film objects
    let loadedFilms = [];
    let landinPageContainer = document.querySelector('.landing-page-container');
    landinPageContainer.style.display='block';
  
    //create a film object
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

    let registration=document.getElementById('login-register-container');
    registration.style.display='none';

    loadedFilms.forEach(film => {
        let filmCard = document.createElement('div');
        filmCard.classList.add('film-card');


        //title
        let filmTitle = document.createElement('h3');
        filmTitle.innerHTML = film.title;
        filmTitle.classList.add('film-title');

        //desc
        let filmDescription = document.createElement('p');
        filmDescription.innerHTML = film.description;

        // rating
        let filmRating = document.createElement('p');
        filmRating.innerHTML = film.rating;

        filmCard.appendChild(filmTitle);
        filmCard.appendChild(filmDescription);
        filmCard.appendChild(filmRating);

        document.querySelector('.landing-page-movies').appendChild(filmCard);
        
    });
}

export{LoadFilms};