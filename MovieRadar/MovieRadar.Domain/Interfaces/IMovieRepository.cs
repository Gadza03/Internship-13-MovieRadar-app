﻿
using MovieRadar.Data.Entities.Models;

namespace MovieRadar.Domain.Interfaces
{
    public interface IMovieRepository
    {

        public Task<Movie> GetSingleMovieInfo(int id);
        public Task<IEnumerable<Movie>> GetAllFilms();
        public Task<Movie> GetMovieById(int id);
        public Task CreateMovie(Movie movie);

        public Task DeleteMovie(int id);
        public Task UpdateMovie(int id,Movie movie);

        public Task<IEnumerable<Movie>> GetFilteredMovies(int? genreId, int? releaseYear, float? minRating, string sortBy);

    }
}
