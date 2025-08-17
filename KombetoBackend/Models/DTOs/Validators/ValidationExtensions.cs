using FluentValidation;

namespace KombetoBackend.Models.DTOs.Validators;

public static class ValidationExtensions
{
    public static IRuleBuilderOptions<T, string?> MustBeValidSerbianPhone<T>(
        this IRuleBuilder<T, string?> ruleBuilder)
    {
        return ruleBuilder
            .Matches(@"^\+3816\d{7,8}$")
            .WithMessage("Phone number must be in format +3816XXXXXXX or +3816XXXXXXXX");
    }
}