using Microsoft.IdentityModel.Tokens;
using Posts_Website.Entities;
using Posts_Website.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Posts_Website.Helpers
{
	public static class JwtAuthHelper
	{
		public static string GenerateToken(User user)
		{
			var claims = new Claim[] {
				new(ClaimTypes.Name, user.UserName),
				new(ClaimTypes.Email, user.Email)
			};

			var jwt = new JwtSecurityToken(
				claims: claims,
				signingCredentials: new SigningCredentials(
					JwtAuthOptions.GetSymmetricSecurityKey(),
					algorithm: SecurityAlgorithms.HmacSha256
				)
			);

			return new JwtSecurityTokenHandler().WriteToken(jwt);
		}
	}
}