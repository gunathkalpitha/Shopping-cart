export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateCardNumber = (cardNumber) => {
  const cardRegex = /^[0-9]{13,19}$/;
  return cardRegex.test(cardNumber.replace(/\s/g, ''));
};

export const validateZipCode = (zipCode) => {
  const zipRegex = /^[0-9]{5}(-[0-9]{4})?$/;
  return zipRegex.test(zipCode);
};
