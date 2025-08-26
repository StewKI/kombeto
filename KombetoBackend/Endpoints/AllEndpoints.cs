namespace KombetoBackend.Endpoints;

public static class AllEndpoints
{
    public static void MapAllEndpoints(this WebApplication app)
    {
        app.MapProductEndpoints();
        app.MapCustomerEndpoints();
        app.MapOrderEndpoints();
        app.MapLoginEndpoints();
        app.MapOwnerEndpoints();
        app.MapDiscountEndpoints();
    }
}