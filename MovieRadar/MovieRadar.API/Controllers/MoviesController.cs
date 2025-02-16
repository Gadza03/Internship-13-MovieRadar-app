using Microsoft.AspNetCore.Mvc;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;
using MovieRadar.Domain.Repositories;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace MovieRadar.API.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IGenreRepository _genreRepository;
        public MoviesController(IMovieRepository movieRepository, IGenreRepository genreRepository)
        {
            _movieRepository = movieRepository;
            _genreRepository = genreRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _movieRepository.GetAllFilms();
            return Ok(movies);  
        }


        [HttpGet("id")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var movie = await _movieRepository.GetMovieById(id);
            return Ok(movie);
        }


        [HttpPost]
        public async Task<IActionResult> AddMovie([FromBody] Movie movie)
        {

            var genres = await _genreRepository.GetAllGenres();
            var movies = await _movieRepository.GetAllFilms();

            Console.WriteLine("Genres fetched: " + JsonSerializer.Serialize(genres));

            if (movie == null)
            {
                return BadRequest("Movie data is invalid.");
            }

            foreach (var existingMovie in movies)
            {
                if (existingMovie.Id == movie.Id)
                {
                    return BadRequest("Movie already exists!");
                }
            }

            if (double.TryParse(movie.Title, out _))
            {
                return BadRequest("Title cant be all numbers!");
            }

            else if (string.IsNullOrEmpty(movie.Title))
            {
                return BadRequest("Title cant be empty!");
            }

            if (double.TryParse(movie.Description, out _))
            {
                return BadRequest("Description cant be all numbers!");
            }

            else if (string.IsNullOrEmpty(movie.Description))
            {
                return BadRequest("Description cant be empty!");
            }


            foreach (var existingMovie in movies)
            {
                if (existingMovie.Title == movie.Title && existingMovie.Description == movie.Description)
                {
                    return BadRequest("Movie already exists!");
                }
            }

            if (genres.FirstOrDefault(g => g.Id == movie.GenreId) == null)
            {
                return BadRequest("Pick one of the existing genres!");
            }

            if (movie.ReleaseYear < 1900)
            {
                return BadRequest("Release year is invalid!");
            }
            if (movie.ReleaseYear.ToString().Any(char.IsLetter))
            {
                return BadRequest("Release year cant contain letters!");
            }
            if (movie.AverageRating > 5)
            {
                return BadRequest("Rating cant be higher than 5");
            }


            if (movie.Title == null || movie.Description == null || movie.GenreId == 0 || movie.ReleaseYear == 0)
            {
                return BadRequest("All fields must be filled.");
            }


            var newMovie = new Movie
            {
                Title = movie.Title,
                Description = movie.Description,
                GenreId = movie.GenreId,
                ReleaseYear = movie.ReleaseYear,
                AverageRating = movie.AverageRating,
                ImageUrl = movie.ImageUrl,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
          
            await _movieRepository.CreateMovie(newMovie);
            return Ok(newMovie);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] Movie movie)
        {
            var genres = await _genreRepository.GetAllGenres();
            var movies = await _movieRepository.GetAllFilms();

            if (movie == null)
            {
                return BadRequest("Movie data is invalid.");
            }
            var movieToUpdate = await _movieRepository.GetMovieById(id);
            if (movieToUpdate == null)
            {
                return NotFound("Movie not found.");
            }
            if(movie.Id != id)
            {
                return BadRequest("Id must be the same as the movie you want to update!");
            }
            if(movies.FirstOrDefault(m => m.Id == id) == null)
            {
                return BadRequest("Movie doesnt exist.");
            }

            if (double.TryParse(movie.Title, out _))
            {
                return BadRequest("Title cant be all numbers!");
            }
            else if(string.IsNullOrEmpty(movie.Title))
            {
                return BadRequest("Title cant be empty!");
            }

            if (double.TryParse(movie.Description, out _))
            {
                return BadRequest("Description cant be all numbers!");
            }
            else if (string.IsNullOrEmpty(movie.Description))
            {
                return BadRequest("Description cant be empty!");
            }


            if (genres.FirstOrDefault(g => g.Id == movie.GenreId) == null)
            {
                return BadRequest("Pick one of the existing genres!");
            }

            if (movie.ReleaseYear < 1900)
            {
                return BadRequest("Release year is invalid!");
            }
            if (movie.ReleaseYear.ToString().Any(char.IsLetter))
            {
                return BadRequest("Release year cant contain letters!");
            }
            if(movie.AverageRating > 5)
            {
                return BadRequest("Rating cant be higher than 5");
            }

            movieToUpdate.Title = movie.Title;
            movieToUpdate.Description = movie.Description;
            movieToUpdate.GenreId = movie.GenreId;
            movieToUpdate.ReleaseYear = movie.ReleaseYear;
            movieToUpdate.AverageRating = movie.AverageRating;
            movieToUpdate.ImageUrl = movie.ImageUrl;
            movieToUpdate.UpdatedAt = DateTime.Now;
            await _movieRepository.UpdateMovie(id, movieToUpdate);
            return Ok(movieToUpdate);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _movieRepository.GetMovieById(id);
            if (movie == null)
            {
                return BadRequest("Movie not found.");
            }
            var movies = await _movieRepository.GetAllFilms();

            if (movies.Any(m => m.Id == id))
            {
                await _movieRepository.DeleteMovie(id);
                return Ok();
            }

            return BadRequest("Movie doesn't exist.");


        }

    }
}
