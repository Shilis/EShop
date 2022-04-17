using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Item, ProductDto>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<AppUser, MemberDto>();
            CreateMap<AppUser, RegisterDto>();
        }
    }
}
