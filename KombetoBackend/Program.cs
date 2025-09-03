using System.Reflection;
using System.Text;
using FluentValidation;
using KombetoBackend.Endpoints;
using KombetoBackend.Models.Data;
using KombetoBackend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddDbContext<AppDbContext>((options) =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    if (connectionString is null) throw new Exception("DefaultConnection in ConnectionStrings is not set.");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var signingKey = builder.Configuration.GetSection("Security:JwtSigningKey").Value;
        if (signingKey is null) throw new Exception("Security:JwtSigningKey in appsettings.json is not set.");
        
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = SecurityService.JwtIssuer,
            ValidAudience = SecurityService.JwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(signingKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("Owner", policy => policy.RequireRole("Owner", "Admin"));
    options.AddPolicy("Customer", policy => policy.RequireRole("Customer", "Admin"));
    options.AddPolicy("CustomerOwner", policy => policy.RequireRole("Customer", "Owner", "Admin"));
});

builder.Services.AddMyServices();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
    
app.MapAllEndpoints();
app.AddDummyData();

app.Run();