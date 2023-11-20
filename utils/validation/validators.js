const MAX_NAME_LENGTH = 30;
const MAX_CITY_LENGTH = 50;
const MAX_STREET_LENGTH = 100;
const MAX_COUNTRY_LENGTH = 50;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isTooLong = (value, maxLength) => value.trim().length > maxLength;

export const validateName = (name) => {
  if (!name.trim()) return "Proszę wpisać imię.";
  if (isTooLong(name, MAX_NAME_LENGTH))
    return `Nazwa nie może przekraczać ${MAX_NAME_LENGTH} znaków.`;

  return null;
};

export const validateEmail = (email) => {
  if (!email.trim()) return "Proszę wpisać adres email.";
  if (!EMAIL_PATTERN.test(email)) return "Nieprawidłowy format adresu email.";

  return null;
};

export const validateCity = (city) => {
  if (!city.trim()) return "Proszę wpisać nazwę miasta.";
  if (isTooLong(city, MAX_CITY_LENGTH))
    return `Nazwa miasta nie może przekraczać ${MAX_CITY_LENGTH} znaków.`;

  return null;
};

export const validatePostalCode = (postalCode) => {
  if (!postalCode.trim()) return "Proszę wpisać kod pocztowy.";

  return null;
};

export const validateStreetAddress = (streetAddress) => {
  if (!streetAddress.trim()) return "Proszę wpisać adres ulicy.";
  if (isTooLong(streetAddress, MAX_STREET_LENGTH))
    return `Adres ulicy nie może przekraczać ${MAX_STREET_LENGTH} znaków.`;

  return null;
};

export const validateCountry = (country) => {
  if (!country.trim()) return "Proszę wpisać kraj.";
  if (isTooLong(country, MAX_COUNTRY_LENGTH))
    return `Nazwa kraju nie może przekraczać ${MAX_COUNTRY_LENGTH} znaków.`;

  return null;
};
