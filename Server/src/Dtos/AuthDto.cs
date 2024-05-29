namespace Posts_Website.Dtos
{
    public record class LoginDto
    (
        string Email,
        string Password
    );

    public record class RegisterDto
    (
        string UserName,
        string Email,
        string Password
    );

    public record class AuthDto
    (
        bool IsSuccessful,
        string? JwtToken,
        string? Message,
        UserDto? User
    );
}