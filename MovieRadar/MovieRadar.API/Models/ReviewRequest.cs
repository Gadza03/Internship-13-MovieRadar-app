using System.ComponentModel.DataAnnotations;

namespace MovieRadar.API.Models
{
    public class ReviewRequest
    {
        [Required(ErrorMessage = "Content is required.")]

        [MinLength(2, ErrorMessage = "Content must be at least 2 characters long.")]

        public string? Content { get; set; }

        [Required(ErrorMessage = "UserId is required.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "MovieId is required.")]
        public int MovieId { get; set; }
    }
}
