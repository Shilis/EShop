using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Update(Item product);
        bool ProductExists(int id);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Item>> GetProductsAsync();
        Task<Item> GetProductByIdAsync(int id);
        Task<IEnumerable<ProductDto>> GetProductsDtoAsync();
        Task<ProductDto> GetProductDtoAsync(int id);
        Task<Item> PostProductAsync(Item item);

    }
}
