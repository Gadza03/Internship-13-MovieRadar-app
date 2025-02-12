namespace MovieRadar.API.DTOs
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int GenreId { get; set; }
        public int ReleaseYear { get; set; }
        //public string ImgUrl    { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime EditedAt { get; set; }

    }
}
