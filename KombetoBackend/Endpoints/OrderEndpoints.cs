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
            AppDbContext db) =>
        {
            IQueryable<Order> ordersSet = db.Orders.Include(o => o.Items);

            if (customerId is not null)
            {
                ordersSet = ordersSet.Where(o => o.CustomerId == customerId);
            }

            var orders = await ordersSet.ToListAsync();

            var ordersDtos = orders.Select(o => o.MapDto()).ToList();

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
    
}