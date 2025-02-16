using Microsoft.AspNetCore.Mvc;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;
using System.Text.Json;

namespace MovieRadar.API.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        public MoviesController(IMovieRepository movieRepository) => _movieRepository = movieRepository;

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
            if (movie == null)
            {
                return BadRequest("Movie data is invalid.");
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
            Console.WriteLine($"New Movie -{newMovie.Id} Title: {newMovie.Title}, Description: {newMovie.Description}, GenreId: {newMovie.GenreId}, ReleaseYear: {newMovie.ReleaseYear}, AverageRating: {newMovie.AverageRating}, ImageUrl: {newMovie.ImageUrl}, CreatedAt: {newMovie.CreatedAt}, UpdatedAt: {newMovie.UpdatedAt}");
            await _movieRepository.CreateMovie(newMovie);
            return Ok(newMovie);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] Movie movie)
        {
            if (movie == null)
            {
                return BadRequest("Movie data is invalid.");
            }
            var movieToUpdate = await _movieRepository.GetMovieById(id);
            if (movieToUpdate == null)
            {
                return NotFound("Movie not found.");
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
                return NotFound("Movie not found.");
            }
            await _movieRepository.DeleteMovie(id);
            return Ok();
        }

    }
}
