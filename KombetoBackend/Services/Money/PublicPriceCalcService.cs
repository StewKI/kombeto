namespace KombetoBackend.Services.Money;

public class PublicPriceCalcService
{
    private readonly IConfiguration config;

    public PublicPriceCalcService(IConfiguration config)
    {
        this.config = config;
    }

    public decimal Increase(decimal basePrice)
    {
        var newPrice = basePrice * GetIncreasePercentage();
        return Round(newPrice);
    }

    private decimal Round(decimal value)
    {
        if (value < 40.0M)
        {
            var decimalPart = value - (int)value;
            if (decimalPart is > 0.4M and < 0.6M)
            {
                return decimal.Floor(value) + 0.5M;
            }
        }
        return decimal.Round(value);
    }


    private decimal GetIncreasePercentage()
    {
        int increase = GetIncrease();
        return (increase + 100) / 100.0M;
    }
    
    private int GetIncrease()
    {
        return config.GetValue<int>("BusinessLogic:Money:PublicPriceIncrease");
    }
}