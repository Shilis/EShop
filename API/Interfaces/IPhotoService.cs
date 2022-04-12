using API.Entities;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<ICollection<Photo>> AddPhotoAsync(IFormFile file);
        Task<ICollection<Photo>> DeletePhotoAsync(string publicId);
    }
}
