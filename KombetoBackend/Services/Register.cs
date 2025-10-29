using KombetoBackend.Services.Entities.Product;
using KombetoBackend.Services.Money;

namespace KombetoBackend.Services;

public static class Register
{
    public static void AddMyServices(this IServiceCollection services)
    {
        services.AddScoped<HomeService>();
        services.AddScoped<SearchService>();

        services.AddSingleton<PublicPriceCalcService>();
        
        services.AddHttpContextAccessor();
        services.AddScoped<IUserContextService, UserContextService>();
    }
}