using FluentValidation;

namespace KombetoBackend.Models.DTOs.Validators;

public class OwnerDtoValidator: AbstractValidator<OwnerDto>
{
    public OwnerDtoValidator()
    {
        RuleFor(dto => dto.Name)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(dto => dto.Phone)
            .NotEmpty()
            .MustBeValidSerbianPhone();
    }
}