export const validateName = (name) => {
  if (!name.trim()) {
    return "Proszę wpisać imię.";
  } else if (name.trim().length > 30) {
    return "Nazwa nie może przekraczać 30 znaków.";
  }

  return null;
};

export const validateEmail = (email) => {
  // Jeśli email jest pusty lub składa się tylko z białych znaków
  if (!email.trim()) {
    return "Proszę wpisać adres email.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "Nieprawidłowy format adresu email.";
  }

  return null;
};

export const validateCity = (city) => {
  if (!city.trim()) {
    return "Proszę wpisać nazwę miasta.";
  } else if (city.trim().length > 50) {
    return "Nazwa miasta nie może przekraczać 50 znaków.";
  }

  return null;
};

export const validatePostalCode = (postalCode) => {
  if (!postalCode.trim()) {
    return "Proszę wpisać kod pocztowy.";
  }

  return null;
};

export const validateStreetAddress = (streetAddress) => {
  if (!streetAddress.trim()) {
    return "Proszę wpisać adres ulicy.";
  } else if (streetAddress.trim().length > 100) {
    return "Adres ulicy nie może przekraczać 100 znaków.";
  }

  return null;
};

export const validateCountry = (country) => {
  if (!country.trim()) {
    return "Proszę wpisać kraj.";
  } else if (country.trim().length > 50) {
    return "Nazwa kraju nie może przekraczać 50 znaków.";
  }

  return null;
};
