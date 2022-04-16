using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly DataContext _context;

        public UploadController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> UploadAsync(int id)
        {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                Photo photo = new Photo();
                photo.Url = dbPath.Replace(@"\", @"/");
                photo.IsMain = false;
                photo.ItemId = id;
                await _context.Photos.AddAsync(photo);
                await _context.SaveChangesAsync();

                return Ok(new { dbPath });
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
