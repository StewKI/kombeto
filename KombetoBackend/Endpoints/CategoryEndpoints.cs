using FluentValidation;
using KombetoBackend.Models.Data;
using KombetoBackend.Models.DTOs;
using KombetoBackend.Models.Maps;
using Microsoft.EntityFrameworkCore;

namespace KombetoBackend.Endpoints;

public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this WebApplication app)
    {
        app.MapGet("/categories", async (AppDbContext db) =>
        {

            var cats = await db.Categories.ToListAsync();
            var catsDto = cats
                .AsParallel() // TODO: Check if good practice in endpoints
                .AsOrdered()
                .Select((c) => c.MapDto())
                .ToList();

            return Results.Ok(catsDto);

        }).RequireAuthorization("CustomerOwner");

        app.MapPost("/categories", async (CreateCategoryDto dto, AppDbContext db, IValidator<CreateCategoryDto> validator) =>
        {
            var validationResult = await validator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }

            var category = dto.MapFromDto();

            await db.Categories.AddAsync(category);
            await db.SaveChangesAsync();

            return Results.Created($"/categories/{category.Id}", category.Id);

        }).RequireAuthorization("Owner");
    }
}