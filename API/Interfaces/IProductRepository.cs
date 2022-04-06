using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Update(Item product);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Item>> GetProductsAsync();
        Task<Item> GetProductByIdAsync(int id);
        Task<IEnumerable<ProductDto>> GetProductsDtoAsync();
        Task<ProductDto> GetProductDtoAsync(int id);

    }
}
