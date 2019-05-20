export const formatMoney =  (amount) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount);
}

export const pickPrice = (price, discountedPrice) => {
  if (discountedPrice > 0) {
    return `$${discountedPrice.toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
}

export const oldPrice = (price, discountedPrice) => {
  if (discountedPrice > 0) {
    return `$${price.toFixed(2)}`
  }
  return null;
}

export const getPrice = (price, discountedPrice) => {
  if (discountedPrice > 0) {
    return discountedPrice.toFixed(2);
  }
  return price.toFixed(2);
}
