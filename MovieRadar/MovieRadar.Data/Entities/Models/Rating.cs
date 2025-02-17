﻿
namespace MovieRadar.Data.Entities.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int UserId   { get; set; }
        public int MovieId { get; set; }
        public int RatingValue {get; set; }

        public DateTime CreatedAt { get; set; }

    }
}
