using System.Security.Claims;
using KombetoBackend.Models.Data;
using KombetoBackend.Models.Entities;
using Microsoft.IdentityModel.JsonWebTokens;

namespace KombetoBackend.Services;

public interface IUserContextService
{
    int? GetClaimedId();
    Task<Customer?> GetCustomer();
}

public class UserContextService : IUserContextService
{
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly AppDbContext db;

    public UserContextService(IHttpContextAccessor httpContextAccessor, AppDbContext db)
    {
        this.httpContextAccessor = httpContextAccessor;
        this.db = db;
    }


    public int? GetClaimedId()
    {
        string? claim = httpContextAccessor
            .HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        Console.WriteLine($"claim: {claim}");
        return int.TryParse(claim, out int userId) ? userId : null;
    }
    
    public async Task<Customer?> GetCustomer()
    {
        int? a = GetClaimedId();
        Console.WriteLine($"nadjen: {a}");
        return await db.Customers.FindAsync(a);
    }
}