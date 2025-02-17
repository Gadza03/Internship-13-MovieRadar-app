
namespace MovieRadar.Data.Entities.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId {  get; set; }
        public int MovieId { get; set; }  
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<Comment>? Comments { get; set; }
    }

}
