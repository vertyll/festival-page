import {
  validateName,
  validateEmail,
  validateCity,
  validatePostalCode,
  validateStreetAddress,
  validateCountry,
} from "./validators";

export const validateFormValues = (values, fieldsToValidate = []) => {
  let errors = {};

  if (fieldsToValidate.includes("name")) {
    const nameError = validateName(values.name);
    if (nameError) errors.name = nameError;
  }

  if (fieldsToValidate.includes("email")) {
    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;
  }

  if (fieldsToValidate.includes("city")) {
    const cityError = validateCity(values.city);
    if (cityError) errors.city = cityError;
  }

  if (fieldsToValidate.includes("postalCode")) {
    const postalCodeError = validatePostalCode(values.postalCode);
    if (postalCodeError) errors.postalCode = postalCodeError;
  }

  if (fieldsToValidate.includes("streetAddress")) {
    const streetAddressError = validateStreetAddress(values.streetAddress);
    if (streetAddressError) errors.streetAddress = streetAddressError;
  }

  if (fieldsToValidate.includes("country")) {
    const countryError = validateCountry(values.country);
    if (countryError) errors.country = countryError;
  }

  return errors;
};
