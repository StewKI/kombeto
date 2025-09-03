using KombetoBackend.Services.Entities.Product;

namespace KombetoBackend.Services;

public static class Register
{
    public static void AddMyServices(this IServiceCollection services)
    {
        services.AddScoped<HomeService>();
        services.AddScoped<SearchService>();
        
        services.AddHttpContextAccessor();
        services.AddScoped<IUserContextService, UserContextService>();
    }
}