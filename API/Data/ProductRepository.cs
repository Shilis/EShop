using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _imapper;

        public ProductRepository(DataContext context, IMapper imapper)
        {
            _context = context;
            _imapper = imapper;
        }

        public async Task<Item> GetProductByIdAsync(int id)
        {
            var product = await _context.Items.Include(p => p.Photos).SingleOrDefaultAsync(x => x.Id == id);

            if(product == null) return null;

            return product;
        }

        public async Task<ProductDto> GetProductDtoAsync(int id)
        {
            return await _context.Items
                .Where(x => x.Id == id).ProjectTo<ProductDto>(_imapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<Item> PostProductAsync(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }

        public async Task<IEnumerable<Item>> GetProductsAsync()
        {
            return await _context.Items
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<IEnumerable<ProductDto>> GetProductsDtoAsync()
        {
            return await _context.Items
                .ProjectTo<ProductDto>(_imapper.ConfigurationProvider)
                .ToListAsync();
        }

        public void DeleteProduct(Item item)
        {
            _context.Items.Remove(item);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Item product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }

        public bool ProductExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }

        public async Task<bool> DeletePhotoAsync(int photoId)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(x => x.Id == photoId);

            if (photo == null) return false;

            _context.Remove(photo);

            return true;
        }

        public async Task<PagedList<ProductDto>> GetProductsDtoAsync(ProductParams productParams)
        {
            var query = _context.Items.AsQueryable();

            query = query.Where(p => p.Price >= productParams.MinPrice && p.Price <= productParams.MaxPrice);

            if(productParams.OrderBy != "default")
            {
                query = productParams.OrderBy switch
                {
                    "priceDescending" => query.OrderByDescending(p => p.Price),
                    "priceAscending" => query.OrderBy(p => p.Price),
                    _ => query.OrderBy(p => p.Price)
                };
            }
            

            if(productParams.CategoryId != 0) query = query.Where(p => p.CategoryId == productParams.CategoryId);

            return await PagedList<ProductDto>.CreateAsync(query.ProjectTo<ProductDto>(
                _imapper.ConfigurationProvider).AsNoTracking(), 
                productParams.PageNumber, productParams.PageSize);
        }
    }
}
