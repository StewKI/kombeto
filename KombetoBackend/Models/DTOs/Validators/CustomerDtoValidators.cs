using FluentValidation;

namespace KombetoBackend.Models.DTOs.Validators;

public class CreateCustomerDtoValidator : AbstractValidator<CreateCustomerDto>
{
    public CreateCustomerDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Address)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Phone)
            .NotEmpty()
            .MustBeValidSerbianPhone();

        RuleFor(x => x.Discount)
            .InclusiveBetween(0, 100);
    }
}

public class UpdateCustomerDtoValidator : AbstractValidator<UpdateCustomerDto>
{
    public UpdateCustomerDtoValidator()
    {
        RuleFor(x => x.Address)
            .MaximumLength(200);

        RuleFor(x => x.Phone)
            .MustBeValidSerbianPhone()
            .When(x => !string.IsNullOrWhiteSpace(x.Phone));

        RuleFor(x => x.Discount)
            .InclusiveBetween(0, 100)
            .When(x => x.Discount.HasValue);
    }
}