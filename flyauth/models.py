from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


class UserRole(models.TextChoices):
    ADMIN = "admin", "Administrateur"
    CLIENT = "client", "Client"


class FlyUser(AbstractUser):
    username = models.CharField(
        _("username"),
        max_length=150,
        validators=[ASCIIUsernameValidator()],
        help_text=_(
            "Required. 150 characters or fewer. Lowercase a-z "
            "and uppercase A-Z letters, numbers"
        ),
        null=True,
    )
    email = models.EmailField(_("email"), unique=True)
    confirm_number = models.CharField(_("confirm number"), max_length=1000, null=True)
    disabled = models.BooleanField(_("is disabled"), default=False)
    roles = models.CharField(
        max_length=50,
        choices=UserRole.choices,
        default=UserRole.CLIENT,
        verbose_name=_("role"),
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "confirm_number",
                ],
                name="confirm_number_unique",
            ),
        ]
        verbose_name = "User"

    def __str__(self):
        return self.email + " (" + ("not " if not self.disabled else "") + "confirmed)"


class UserCompany(models.Model):
    name = models.CharField(_("company name"), max_length=150)
    address = models.CharField(_("company adsress"), max_length=150, blank=True)
    sector = models.CharField(
        _("company activity sector"), max_length=150, blank=True, null=True
    )
    phone = PhoneNumberField(blank=True)
    user = models.ForeignKey(
        FlyUser,
        on_delete=models.CASCADE,
        related_name="user_company",
        verbose_name=_("user"),
    )

    class Meta:
        verbose_name = _("Company")
        verbose_name_plural = _("Company management")
        indexes = [models.Index(fields=["user"], name="company_by_user")]

    def __str__(self):
        return self.name
