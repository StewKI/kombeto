using FluentValidation;
using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Entities;
using KombetoBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Endpoints;

public static class OwnerEndpoints
{
    public static void MapOwnerEndpoints(this WebApplication app)
    {
        app.MapPost("/owners", async (
            AppDbContext db, 
            OwnerDto dto, 
            IValidator<OwnerDto> validator) =>
        {
            var validationResult = await validator.ValidateAsync(dto);
            if (!validationResult.IsValid) return Results.BadRequest(validationResult.Errors);
            
            string securityCode;
            do
            {
                securityCode = SecurityService.GenerateSecurityCode(12);
            }
            while(await db.Owners.AnyAsync(o => o.SecurityCode == securityCode));

            var owner = new Owner
            {
                Name = dto.Name,
                Phone = dto.Phone,
                SecurityCode = securityCode,
                DeviceId = null
            };
            db.Owners.Add(owner);
            await db.SaveChangesAsync();
            
            return Results.Created($"/owners/{owner.Id}", owner);
            
        }).RequireAuthorization("Owner");
    }
}