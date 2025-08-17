using FluentValidation;
using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Entities;
using KombetoBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Endpoints;

public static class CustomerEndpoints
{
    public static void MapCustomerEndpoints(this WebApplication app)
    {
        app.MapPost("/customers", async (
            AppDbContext db, 
            CreateCustomerDto dto, 
            IValidator<CreateCustomerDto> validator) =>
        {
            var validationResult = await validator.ValidateAsync(dto);
            if (!validationResult.IsValid) return Results.BadRequest(validationResult.Errors);
            
            string securityCode;
            do
            {
                securityCode = SecurityService.GenerateSecurityCode(12);
            }
            while(await db.Customers.AnyAsync(c => c.SecurityCode == securityCode));

            var customer = new Customer
            {
                Name = dto.Name,
                Address = dto.Address,
                Phone = dto.Phone,
                Discount = dto.Discount,
                SecurityCode = securityCode,
                DeviceId = null
            };
            db.Customers.Add(customer);
            await db.SaveChangesAsync();
            
            return Results.Created($"/customers/{customer.Id}", customer);
            
        }).RequireAuthorization("Owner");

        app.MapPatch("/customers/{id:int}", async (
            int id,
            UpdateCustomerDto dto,
            AppDbContext db,
            IValidator<UpdateCustomerDto> validator) =>
        {
            var customer = await db.Customers.FindAsync(id);
            if (customer is null) return Results.NotFound();

            var validationResult = await validator.ValidateAsync(dto);
            if (!validationResult.IsValid) return Results.BadRequest(validationResult.Errors);

            if (dto.Address is not null) customer.Address = dto.Address;
            if (dto.Phone is not null) customer.Phone = dto.Phone;
            if (dto.Discount.HasValue) customer.Discount = dto.Discount.Value;
            
            await db.SaveChangesAsync();
            return Results.Ok();
            
        }).RequireAuthorization("Owner");
    }
}