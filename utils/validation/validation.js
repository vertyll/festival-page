import {
  validateName,
  validateEmail,
  validateCity,
  validatePostalCode,
  validateStreetAddress,
  validateCountry,
} from "./validators";

export const validateFormValues = (values, fieldsToValidate = []) => {
  const validators = {
    name: validateName,
    email: validateEmail,
    city: validateCity,
    postalCode: validatePostalCode,
    streetAddress: validateStreetAddress,
    country: validateCountry,
  };

  return fieldsToValidate.reduce((errors, field) => {
    const validator = validators[field];
    const error = validator ? validator(values[field]) : null;
    if (error) {
      errors[field] = error;
    }
    return errors;
  }, {});
};
