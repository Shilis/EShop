using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedRoles(UserManager<AppUser> userManager)
        {
            //var roles = new List<AppRole>
            //{
            //    new AppRole {Name = "User"},
            //    new AppRole {Name = "Admin"},
            //};

            //foreach (var role in roles)
            //{
            //    await roleManager.CreateAsync(role);
            //}

            var admin = new AppUser 
            { 
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "admin");
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}
