namespace API.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int Quantity { get; set; }
    }
}
