#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using AutoMapper;
using API.DTOs;
using API.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ItemsController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetItems()
        {
            var products = await _productRepository.GetProductsDtoAsync();
            foreach (var product in products)
            {
                product.ImagePath = product.Photos.FirstOrDefault(x => x.IsMain)?.Url;
            }
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetItem(int id)
        {
            var item = await _productRepository.GetProductDtoAsync(id);
            item.ImagePath = item.Photos.FirstOrDefault(x => x.IsMain)?.Url;
            return item;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _productRepository.Update(item);

            try
            {
                if (await _productRepository.SaveAllAsync()) return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_productRepository.ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Items
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            await _productRepository.PostProductAsync(item);

            return CreatedAtAction("GetItem", new { id = item.Id }, item);
        }

        [HttpPut("set-main-photo")]
        public async Task<ActionResult> SetMainPhoto(int productId, int photoId)
        {
            var product = await _productRepository.GetProductByIdAsync(productId);

            var photo = product.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = product.Photos.FirstOrDefault(x => x.IsMain);

            if (currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            if(await _productRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        //// DELETE: api/Items/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteItem(int id)
        //{
        //    var item = await _context.Items.FindAsync(id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Items.Remove(item);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}
    }
}
