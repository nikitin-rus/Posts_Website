using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Posts_Website.Services;
using Posts_Website.Repositories;
using Posts_Website.Data;
using Posts_Website.Filters;
using Microsoft.IdentityModel.Tokens;
using Posts_Website.Authentication;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(opts =>
    {
        opts.AddDefaultPolicy(policy =>
        {
            policy.WithMethods(["GET", "POST", "PUT", "DELETE"])
                .AllowAnyOrigin()
                .AllowAnyHeader();
        });
    });
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opts =>
    {
        opts.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = JwtAuthOptions.GetSymmetricSecurityKey(),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = false,
        };
    });
builder.Services.AddAuthorization();

builder.Configuration.AddJsonFile("dbconfig.json");

builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseNpgsql(builder.Configuration["connection"]));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddTransient<IClaimsPrincipalService, ClaimsPrincipalService>();

builder.Services.AddControllers(opts => opts.Filters.Add<EntityNotFoundExceptionFilter>());

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

if (builder.Environment.IsDevelopment())
{
    app.UseCors();
}

app.MapControllers();

app.Run();