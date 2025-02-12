

namespace MovieRadar.Data.Entities.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int GenreId { get; set; }  
        public int ReleaseYear { get; set; }
        public float AverageRating { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }



        public List<Review>? Reviews { get; set; }
        public List<Comment>? CommentsOnReview { get; set; }

    }

}
