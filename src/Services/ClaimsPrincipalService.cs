using Posts_Website.Entities;
using Posts_Website.Repositories;
using System.Security.Claims;

namespace Posts_Website.Services
{
    public interface IClaimsPrincipalService
    {
        User ToUser(ClaimsPrincipal principal);
    }

	public class ClaimsPrincipalService(IUserRepository repo) : IClaimsPrincipalService
    {
        public User ToUser(ClaimsPrincipal principal)
        {
            Claim? email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email) ??
                throw new Exception(
                    $"JWT-токен текущего пользователя не содержит Claim-объекта типа ${ClaimTypes.Email}");

            User? user = repo.GetByEmail(email.Value) ??
                throw new Exception(
                    $"Текущий пользователь не найден в базе данных!");

            return user;
        }
    }
}
