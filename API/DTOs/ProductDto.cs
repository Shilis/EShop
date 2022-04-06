namespace API.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public string ImagePath { get; set; }

        public ICollection<PhotoDto> Photos { get; set; }
    }
}
