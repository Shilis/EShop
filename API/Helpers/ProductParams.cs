namespace API.Helpers
{
    public class ProductParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int MinPrice { get; set; } = 0;
        public int MaxPrice { get; set; } = 999;

        public int CategoryId { get; set; }

        public string OrderBy { get; set; } = "default";
    }
}
