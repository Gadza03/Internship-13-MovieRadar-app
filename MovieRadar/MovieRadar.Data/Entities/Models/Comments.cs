﻿
namespace MovieRadar.Data.Entities.Models
{
    public class Comments
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ReviewId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
