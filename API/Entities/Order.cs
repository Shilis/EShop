namespace API.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public string Status { get; set; }
    }
}
