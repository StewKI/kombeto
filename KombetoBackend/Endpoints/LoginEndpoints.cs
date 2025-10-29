using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Maps;
using KombetoBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Endpoints;

public static class LoginEndpoints
{
    public static void MapLoginEndpoints(this WebApplication app)
    {
        app.MapPost("login/customer/first", async (AppDbContext db, [FromBody] OneTimeLoginDto dto) =>
        {
            //TEST

            if (dto.Code == "123-789-456")
            {
                var customer = await db.Customers.FindAsync(1);
                
                return Results.Ok(new
                {
                    SecurityCode = customer.SecurityCode,
                    Valid = true
                });
            }
            
            //NORMAL
            var oneTimeLogin = await db.OneTimeLogins
                .Include(l => l.Customer)
                .Where(l => l.LoginCode == dto.Code)
                .ToListAsync();

            if (oneTimeLogin.Count == 0)
            {
                return Results.Unauthorized();
            }
            var login = oneTimeLogin.First();
            
            if (login.Used || login.ValidUntil < DateTime.Now)
            {
                return Results.Ok(new
                {
                    Valid = false
                });
            }
            
            login.Used = true;
            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                SecurityCode = login.Customer.SecurityCode,
                Valid = true
            });

        });
        
        app.MapPost("/login/customer", async (AppDbContext db, LoginDto dto, IConfiguration config) =>
        {
            var customer = await db.Customers
                .Where(c => c.SecurityCode == dto.SecurityCode)
                .FirstOrDefaultAsync();
            
            if (customer is null) return Results.Unauthorized();

            if (customer.Id != 1)
            {
                
                if (customer.DeviceId is null)
                {
                    customer.DeviceId = dto.DeviceId;
                    await db.SaveChangesAsync();
                }
            
                if (customer.DeviceId != dto.DeviceId) return Results.Unauthorized();

            }
            
            var jwt = SecurityService.GenerateJwtCustomer(customer, config);
            
            return Results.Ok(new JwtDto() {Token = jwt});
        });

        app.MapPost("/login/owner", async (AppDbContext db, LoginDto dto, IConfiguration config) =>
        {
            var owner = await db.Owners
                .Where(o => o.SecurityCode == dto.SecurityCode)
                .FirstOrDefaultAsync();
            
            if (owner is null) return Results.Unauthorized();

            if (owner.DeviceId is null)
            {
                owner.DeviceId = dto.DeviceId;
                await db.SaveChangesAsync();
            }

            if (owner.DeviceId != dto.DeviceId) return Results.Unauthorized();
            
            var jwt = SecurityService.GenerateJwtOwner(owner, config);
            
            return Results.Ok(new JwtDto() {Token = jwt});
        });
        
        app.MapGet("/logged_in/customer", async (IUserContextService userContextService) =>
        {

            var loggedCustomer = await userContextService.GetCustomer();
            
            if (loggedCustomer is null) return Results.Unauthorized();
            
            return Results.Ok(loggedCustomer.MapDto());

        }).RequireAuthorization("Customer");
    }
}