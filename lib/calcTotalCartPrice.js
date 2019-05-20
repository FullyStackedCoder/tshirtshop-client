import { getPrice } from './formatMoney';

export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * getPrice(cartItem.product.price, cartItem.product.discounted_price);
  }, 0);
}
