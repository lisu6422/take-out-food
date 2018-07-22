const Cart = require('../src/cart');
const Order = require('../src/order');
const Calculate = require('../src/calculate');

module.exports = function bestCharge(selectedItems) {
  let cartItems = Cart.getCartInfo(selectedItems);
    let order = new Order();
    let orderItems = order.getOrderItems(cartItems);
    let calculate = new Calculate();
    let calculateResult = calculate.calculate(orderItems);
    return calculate.print(orderItems, calculateResult);

}
