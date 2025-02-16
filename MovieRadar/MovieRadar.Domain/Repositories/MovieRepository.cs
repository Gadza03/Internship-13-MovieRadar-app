using MovieRadar.Data;
using MovieRadar.Data.Entities.Models;
using MovieRadar.Domain.Interfaces;
using Dapper;


namespace MovieRadar.Domain.Repositories
{
    public class MovieRepository : IMovieRepository
    {

        private readonly DbConnectionFactory _dbConnection;

        private readonly IGenreRepository _genreRepository;

        public MovieRepository(DbConnectionFactory dbConnection, IGenreRepository genreRepository) {
            _dbConnection = dbConnection;
            _genreRepository = genreRepository;

        } 
        public async Task<Movie> GetSingleMovieInfo(int id)
        {
            var query = @"
                SELECT * FROM Movies WHERE Id = @id;
                SELECT AVG(RatingValue) FROM Ratings WHERE MovieId = @id;
                SELECT * FROM Ratings WHERE MovieId = @id; 
                SELECT * FROM Reviews WHERE MovieId = @id;
                SELECT * FROM Comments WHERE ReviewId IN (SELECT Id FROM Reviews WHERE MovieId = @id);
                ";

            using (var connection = _dbConnection.CreateConnection())
            using (var multi = await connection.QueryMultipleAsync(query, new { id }))
            {
                var movie = await multi.ReadSingleOrDefaultAsync<Movie>();
                if (movie is not null)
                {
                    var avgRating = await multi.ReadSingleOrDefaultAsync<float>();
                    movie.AverageRating = avgRating;

                    var ratings = (await multi.ReadAsync<Rating>()).ToList();
                    movie.Ratings = ratings;

                    var genreName = await _genreRepository.GetGenreNameById(movie.GenreId);
                    movie.GenreName = genreName;

                    var reviews = (await multi.ReadAsync<Review>()).ToList();
                    movie.Reviews = reviews;

                    var comments = (await multi.ReadAsync<Comment>()).ToList();
                    
                    foreach (var review in movie.Reviews)
                    {
                        review.Comments = comments.Where(c => c.ReviewId == review.Id).ToList();
                    }


                }

                return movie;
            }
        }

  

        public async Task<IEnumerable<Movie>> GetAllFilms()
        {
            var sql = "SELECT * FROM MOVIES";
            using (var connection = _dbConnection.CreateConnection())
            {
                var movies = await connection.QueryAsync<Movie>(sql);
                return movies.ToList();


            }
        }
    }
}
