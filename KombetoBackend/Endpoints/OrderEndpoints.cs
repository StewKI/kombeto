using System.Security.Claims;
using FluentValidation;
using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.DTOs.Validators;
using KombetoBackend.Models.Entities;
using KombetoBackend.Models.Maps;
using KombetoBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Endpoints;

public static class OrderEndpoints
{
    public static void MapOrderEndpoints(this WebApplication app)
    {
        app.MapGet("/orders", async (
            int? customerId,
            string? includeCustomer,
            string? includeItems,
            AppDbContext db) =>
        {
            IQueryable<Order> ordersSet = db.Orders
                .Include(o => o.Customer)
                .Include(o => o.Items)
                .ThenInclude(i => i.Product);

            if (customerId is not null)
            {
                ordersSet = ordersSet.Where(o => o.CustomerId == customerId);
            }

            var orders = await ordersSet.ToListAsync();

            var ordersDtos = orders.Select(o =>
            {
                var dto = o.MapDto();
                if (Check(includeCustomer))
                {
                    dto.Customer = o.Customer.MapDto();
                }
                if (Check(includeItems))
                {
                    dto.Items = o.Items.Select(i =>
                    {
                        var iDto = i.MapDto();
                        iDto.Product = i.Product.MapDto();
                        return iDto;
                    }).ToList();
                }

                return dto;
            }).ToList();
            
            

            return Results.Ok(ordersDtos);

        }).RequireAuthorization("CustomerOwner");
        
        
        app.MapPost("/orders", async (
            CreateOrderDto orderDto,
            AppDbContext db,
            IValidator<CreateOrderDto> orderValidator,
            ClaimsPrincipal claims) =>
        {
            var validationResult = await orderValidator.ValidateAsync(orderDto);
            if (!validationResult.IsValid) return Results.BadRequest(validationResult.Errors);
            
            //if (!SecurityService.CheckIdFromClaims(claims, orderDto.CustomerId, out var result)) return result!;

            var customer = await db.Customers.FindAsync(orderDto.CustomerId);
            if (customer is null) return Results.NotFound();

            var newOrder = orderDto.MapFromDto();

            await db.Orders.AddAsync(newOrder);
            await db.SaveChangesAsync();

            foreach (var itemDto in orderDto.Items)
            {
                var orderItem = itemDto.MapFromDto(newOrder.Id);
                await db.OrderItems.AddAsync(orderItem);
            }

            await db.SaveChangesAsync();

            return Results.Created($"/orders/{newOrder.Id}", new { Id = newOrder.Id });

        }).RequireAuthorization("Customer");
        
    }


    private static bool Check(string? include) => include is not null && include.ToLower() == "true";
    
}