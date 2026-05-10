export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPrice = (price) => {
  return `$${parseFloat(price).toFixed(2)}`;
};

export const addTaxAndShipping = (subtotal, taxRate = 0.1, shippingCost = 5) => {
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;
  return {
    subtotal,
    tax,
    shipping: shippingCost,
    total,
  };
};
