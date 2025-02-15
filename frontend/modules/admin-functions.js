import { AddFilm } from "./api.js";

export function CreateFilm(event){
    event.preventDefault();

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

    var film = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        genreId: inputedGenre,
        release_year: document.getElementById("releaseYear").value,
        averageRating: 0.0,
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