using API.DTOs;
using API.Entities;
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
    }
}
