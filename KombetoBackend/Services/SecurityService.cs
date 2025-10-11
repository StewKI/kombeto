using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using KombetoBackend.Models.Entities;
using Microsoft.IdentityModel.Tokens;

namespace KombetoBackend.Services;

public static class SecurityService
{
    private const string Charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    public const string JwtIssuer = "KombetoBackend";
    public const string JwtAudience = "KombetoUser";

    private const string OneTimeCharset = "123456789";
    
    public static string GenerateOneTimeCode()
    {
        int length = 9;
        var bytes = new byte[length];
        var result = new StringBuilder(length);

        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(bytes);
        }

        foreach (var b in bytes)
        {
            result.Append(OneTimeCharset[b % OneTimeCharset.Length]);
        }

        var resultString = result.ToString();

        resultString = resultString.Insert(6, "-").Insert(3, "-");

        return resultString;
    }
    
    public static string GenerateSecurityCode(int length)
    {
        var bytes = new byte[length];
        var result = new StringBuilder(length);

        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(bytes);
        }

        foreach (var b in bytes)
        {
            result.Append(Charset[b % Charset.Length]);
        }

        return result.ToString();
    }

    public static string GenerateJwtCustomer(Customer customer, IConfiguration config)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, customer.Id.ToString()),
            new Claim(ClaimTypes.Role, "Customer")
        };

        return GenerateJwtFromClaims(claims, config);
    }
    
    public static string GenerateJwtOwner(Owner owner, IConfiguration config)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, owner.Id.ToString()),
            new Claim(ClaimTypes.Role, "Owner")
        };

        return GenerateJwtFromClaims(claims, config);
    }

    private static string GenerateJwtFromClaims(Claim[] claims, IConfiguration config)
    {
        var signingKey = config.GetSection("Security:JwtSigningKey").Value!;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: JwtIssuer,
            audience: JwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddYears(10),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static bool CheckIdFromClaims(ClaimsPrincipal claimsPrincipal, int id, out IResult? result)
    {
        var customerIdClaim = claimsPrincipal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (customerIdClaim is null)
        {
            result = Results.Unauthorized();
            return false;
        }

        if (!int.TryParse(customerIdClaim, out var customerIdFromToken))
        {
            result = Results.BadRequest("Invalid token data");
            return false;
        }

        if (customerIdFromToken != id)
        {
            result = Results.Forbid();
            return false;
        }

        result = null;
        return true;
    }
}