using FluentValidation;

namespace KombetoBackend.Models.DTOs.Validators;

public class CreateDiscountDtoValidator : AbstractValidator<CreateDiscountDto>
{
    public CreateDiscountDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(100);
        
        RuleFor(x => x.Products)
            .NotEmpty();
        
        RuleFor(x => x.Color)
            .NotEmpty()
            .Length(7);
        
        RuleFor(x => x.Discount)
            .InclusiveBetween(0, 100);
    }
}