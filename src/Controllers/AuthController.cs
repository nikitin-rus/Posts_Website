using Microsoft.AspNetCore.Mvc;
using Posts_Website.Helpers;
using Posts_Website.Dtos;
using Posts_Website.Entities;
using Posts_Website.Mappers;
using Posts_Website.Repositories;

namespace Posts_Website.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController(IUserRepository repo) : ControllerBase
    {
        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            User? user = repo.GetByEmail(dto.Email);

            if (
                user == null
                || user.Email != dto.Email
                || user.Password != dto.Password
            )
            {
                return Ok(new AuthDto(
                    IsSuccessful: false,
                    Message: "Неверная почта и/или пароль",
                    JwtToken: null,
                    User: null
                ));
            }

            return Ok(new AuthDto(
                IsSuccessful: true,
                JwtToken: JwtAuthHelper.GenerateToken(user),
                Message: null,
                User: user.ToUserDto()
            ));
        }

        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] RegisterDto dto)
        {
            var user = new User(
                Guid.NewGuid(),
                dto.UserName,
                dto.Email,
                dto.Password
            );

            var users = repo.GetAll();

            if (users.Any(u => u.UserName == dto.UserName || u.Email == dto.Email))
            {
                return Ok(new AuthDto(
                    IsSuccessful: false,
                    Message: "Почта и/или имя пользователя уже заняты",
                    JwtToken: null,
                    User: null
                ));
            }

            repo.Insert(user);
            repo.Save();

            return Ok(new AuthDto(
                IsSuccessful: true,
                JwtToken: JwtAuthHelper.GenerateToken(user),
                Message: null,
                User: user.ToUserDto()
            ));
        }
    }
}