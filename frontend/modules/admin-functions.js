import { AddFilm,UpdateFilm,RemoveFilm } from "./api.js";

export function CreateFilm(event){
    event.preventDefault();

    let inputedTitle = document.getElementById("title").value.trim();
    if(isFinite(inputedTitle) && !isNaN(parseFloat(inputedTitle))){
        alert("Title cant be all numbers!");
        return;
    }

    let inputedDescription = document.getElementById("description").value.trim();
    if(isFinite(inputedDescription) && !isNaN(parseFloat(inputedDescription))){
        alert("Description cant be all numbers!");
        return;
    }

    let inputedGenre = document.getElementById("genre").value.trim();
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

    let inputedReleaseYear = document.getElementById("releaseYear").value.trim();
    if(!isFinite(inputedReleaseYear) || isNaN(parseFloat(inputedReleaseYear))){
        alert("Release year must be a number!");
        return;
    }
    else if(parseInt(inputedReleaseYear)<1900){
        alert("Release year must be after 1900!");
        return;
    }

    if(inputedTitle==="" || inputedDescription==="" || inputedGenre==="" || inputedReleaseYear==="" || inputedPoster===""){
        alert("All fields must be filled!");
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

export function EditFilm(event){
    event.preventDefault();
    let selectedFilm = JSON.parse(localStorage.getItem("selectedFilm"));

    let inputedTitle = document.getElementById("edit-title").value.trim();
    if(inputedTitle===""){
        inputedTitle=selectedFilm.title;
    }
    else{
        if(inputedTitle===selectedFilm.title){
            alert("Title cant be the same as the old one!");
            return;
        }
        if(isFinite(inputedTitle) && !isNaN(parseFloat(inputedTitle))){
            alert("Title cant be all numbers!");
            return;
        }
    }

    let inputedDescription = document.getElementById("edit-description").value.trim();
    if(inputedDescription===""){
        inputedDescription=selectedFilm.description;
    }
    else{
        if(inputedDescription===selectedFilm.description){
            alert("Description cant be the same as the old one!");
            return;
        }
    
        if(isFinite(inputedDescription) && !isNaN(parseFloat(inputedDescription))){
            alert("Description cant be all numbers!");
            return;
        }
    }

    let inputedGenre = document.getElementById("edit-genre").value.trim();
    let checkGenre=false;
    let genres = JSON.parse(localStorage.getItem("genres")) || [];
    if(inputedGenre===""){
        inputedGenre=selectedFilm.genreId;
    }
    else{
        for (let i = 0; i < genres.length; i++) {
            if (genres[i].name === inputedGenre) {
                inputedGenre = genres[i].id;
                checkGenre=true;
                break;
            }
        }
    
        if(inputedGenre===selectedFilm.genreId){
            alert("Genre cant be the same as the old one!");
            return;
        }
        if(!checkGenre){
            alert("Pick one of the existing genres!");
            return;
        }
    }


    let inputedReleaseYear = document.getElementById("edit-releaseYear").value.trim();
    if(inputedReleaseYear===""){
        inputedReleaseYear=selectedFilm.releaseYear;
    }
    else{
        if(inputedReleaseYear===selectedFilm.releaseYear){
            alert("Release year cant be the same as the old one!");
            return;
        }
        if(!isFinite(inputedReleaseYear) || isNaN(parseFloat(inputedReleaseYear))){
            alert("Release year must be a number!");
            return;
        }
        else if(parseInt(inputedReleaseYear)<1900){
            alert("Release year must be after 1900!");
            return;
        }
    }

    let inputedPoster = document.getElementById("edit-poster").value.trim();
    if(inputedPoster===""){
        inputedPoster=selectedFilm.imageURL;
    }
    else{
        if(inputedPoster===selectedFilm.imageURL){
            alert("Poster cant be the same as the old one!");
            return;
        }
    }

    var film = {
        id: selectedFilm.id,
        title: inputedTitle,
        description: inputedDescription,
        genreId: inputedGenre,
        ReleaseYear : parseInt(inputedReleaseYear),
        averageRating: selectedFilm.averageRating,
        imageURL: selectedFilm.imageURL,
        createdAt: selectedFilm.createdAt,
        updatedAt: new Date()
    };

    UpdateFilm(film);
}

export function DeleteFilm(){

}

export function FillExisitngFilms(){
    const selectedFilm = JSON.parse(localStorage.getItem("selectedFilm"));
    const genres = JSON.parse(localStorage.getItem("genres")) || [];
    let genreName;

   for (let i = 0; i < genres.length; i++) {
        if (genres[i].id === selectedFilm.genreId) {
            genreName = genres[i].name;
            break;
        }
    }

    document.getElementById("existing-title").value = selectedFilm.title;
    document.getElementById("existing-description").value = selectedFilm.description;
    document.getElementById("existing-genre").value = genreName;
    document.getElementById("existing-releaseYear").value = selectedFilm.releaseYear;
    document.getElementById("existing-poster").value = selectedFilm.imageURL;
}