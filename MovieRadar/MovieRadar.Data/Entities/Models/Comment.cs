
namespace MovieRadar.Data.Entities.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int ReviewId { get; set; }
        public int CreatorId { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
