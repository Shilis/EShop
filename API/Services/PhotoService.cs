using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Services
{
    public class PhotoService 
    {
        private readonly DataContext _context;

        public PhotoService(DataContext context)
        {
            _context = context;
        }

    }
}
