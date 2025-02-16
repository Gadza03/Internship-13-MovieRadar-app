import { AddFilm, LoadFilms } from "./api.js";

export function CreateFilm(event){
    event.preventDefault();

    let inputedTitle = document.getElementById("title").value;
    if(isFinite(inputedTitle) && !isNaN(parseFloat(inputedTitle))){
        alert("Title cant be all numbers!");
        return;
    }

    let inputedDescription = document.getElementById("description").value;
    if(isFinite(inputedDescription) && !isNaN(parseFloat(inputedDescription))){
        alert("Description cant be all numbers!");
        return;
    }

    let inputedGenre = document.getElementById("genre").value;
    let checkGenre=false;
    let genres = JSON.parse(localStorage.getItem("genres")) || [];
    for (let i = 0; i < genres.length; i++) {
        if (genres[i].name === inputedGenre) {
            inputedGenre = genres[i].id;
            checkGenre=true;
            break;
        }
    }

    if(!checkGenre){
        alert("Pick one of the existing genres!");
        return;
    }

    let inputedReleaseYear = document.getElementById("releaseYear").value;
    if(!isFinite(inputedReleaseYear) || isNaN(parseFloat(inputedReleaseYear))){
        alert("Release year must be a number!");
        return;
    }
    else if(parseInt(inputedReleaseYear)<1900){
        alert("Release year must be after 1900!");
        return;
    }

    var film = {
        title: inputedTitle,
        description: inputedDescription,
        genreId: inputedGenre,
        ReleaseYear : parseInt(inputedReleaseYear),
        averageRating: 0.00,
        imageURL: null, //samo skupit url s inputa za dobit sliku
        createdAt: new Date(),
        updatedAt: new Date()
    };

    AddFilm(film);
}

export function EditFilm(){

}

export function DeleteFilm(){

}