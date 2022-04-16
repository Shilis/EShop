using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Update(Item product);
        bool ProductExists(int id);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Item>> GetProductsAsync();
        Task<PagedList<ProductDto>> GetProductsDtoAsync(ProductParams productParams);
        Task<Item> GetProductByIdAsync(int id);
        Task<IEnumerable<ProductDto>> GetProductsDtoAsync();
        Task<ProductDto> GetProductDtoAsync(int id);
        Task<Item> PostProductAsync(Item item);
        void DeleteProduct(Item item);
        Task<bool> DeletePhotoAsync(int photoId);

    }
}
