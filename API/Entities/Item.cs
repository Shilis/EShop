using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Item
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public string ImagePath { get; set; }

        public ICollection<Photo> Photos { get; set; }

    }
}
