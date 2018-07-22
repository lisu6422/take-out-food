const bestCharge = require('../src/best-charge');
const Cart = require('../src/cart');
const Order = require('../src/order');
const Calculate = require('../src/calculate');


describe('Take out food', function () {

  it('should output cartItems ', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expected = [{
      id: 'ITEM0001',
      count: 1
    },
    {
      id: 'ITEM0013',
      count: 2
    },
    {
      id: 'ITEM0022',
      count: 1
    }];

    let cartItems = Cart.getCartInfo(inputs);
    for (let i = 0; i < cartItems.length; i++) {
      expect(cartItems[i]).toEqual(expected[i]);
    }
  });

  it('should output orderItems ', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expected = [{
      id: 'ITEM0001',
      count: 1,
      name: '黄焖鸡',
      price: 18
    },
    {
      id: 'ITEM0013',
      count: 2,
      name: '肉夹馍',
      price: 6
    },
    {
      id: 'ITEM0022',
      count: 1,
      name: '凉皮',
      price: 8
    }];

    let cartItems = Cart.getCartInfo(inputs);
    let order = new Order();
    let orderItems = order.getOrderItems(cartItems);
    for (let i = 0; i < orderItems.length; i++) {
      expect(orderItems[i]).toEqual(expected[i]);
    }
  });

  it('should get min totalprice when best is 满30减6元', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let cartItems = Cart.getCartInfo(inputs);
    let order = new Order();
    let orderItems = order.getOrderItems(cartItems);
    let calculate = new Calculate();
    let summary = calculate.calculate(orderItems);
    let expected = {
      totalPrice: 26,
      discountType: '满30减6元',
      freePrice: 6
    };
    expect(summary).toEqual(expected)
  });

  it('should get min totalprice when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = Cart.getCartInfo(inputs);
    let order = new Order();
    let orderItems = order.getOrderItems(cartItems);
    let calculate = new Calculate();
    let summary = calculate.calculate(orderItems);
    let expected = {
      totalPrice: 25,
      discountType: '指定菜品半价',
      freePrice: 13
    };
    expect(summary).toEqual(expected);
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let cartItems = Cart.getCartInfo(inputs);
    let order = new Order();
    let orderItems = order.getOrderItems(cartItems);
    let calculate = new Calculate();
    let summary = calculate.calculate(orderItems);
    let expected = {
      totalPrice: 24,
      discountType: '',
      freePrice: 0
    };
    expect(summary).toEqual(expected);
  });

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = Cart.getCartInfo(inputs);
    let order = new Order();
    let orderItems = order.getOrderItems(cartItems);
    let calculate = new Calculate();
    let calculateResult = calculate.calculate(orderItems);
    let str = calculate.print(orderItems, calculateResult);
    let expected = `
  ============= 订餐明细 =============
  黄焖鸡 x 1 = 18元
  肉夹馍 x 2 = 12元
  凉皮 x 1 = 8元
  -----------------------------------
  使用优惠:
  指定菜品半价(黄焖鸡，凉皮)，省13元
  -----------------------------------
  总计：25元
  ===================================`.trim();
    expect(str).toEqual(expected);
  });

  it('should generate best charge when best is 满30减6元', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let cartItems = Cart.getCartInfo(inputs);
    let order = new Order();
    let orderItems = order.getOrderItems(cartItems);
    let calculate = new Calculate();
    let calculateResult = calculate.calculate(orderItems);
    let str = calculate.print(orderItems, calculateResult);
    let expected = `
  ============= 订餐明细 =============
  肉夹馍 x 4 = 24元
  凉皮 x 1 = 8元
  -----------------------------------
  使用优惠:
  满30减6元，省6元
  -----------------------------------
  总计：26元
  ===================================`.trim()
    expect(str).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let cartItems = Cart.getCartInfo(inputs);
    let order = new Order();
    let orderItems = order.getOrderItems(cartItems);
    let calculate = new Calculate();
    let calculateResult = calculate.calculate(orderItems);
    let str = calculate.print(orderItems, calculateResult);
    let expected = `
  ============= 订餐明细 =============
  肉夹馍 x 4 = 24元
  -----------------------------------
  总计：24元
  ===================================`.trim()
    expect(str).toEqual(expected)
  });


    it('should generate best charge when best is 指定菜品半价', function () {
      let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
      let summary = bestCharge(inputs).trim();
      let expected = `
  ============= 订餐明细 =============
  黄焖鸡 x 1 = 18元
  肉夹馍 x 2 = 12元
  凉皮 x 1 = 8元
  -----------------------------------
  使用优惠:
  指定菜品半价(黄焖鸡，凉皮)，省13元
  -----------------------------------
  总计：25元
  ===================================`.trim()
      expect(summary).toEqual(expected)
    });

    it('should generate best charge when best is 满30减6元', function () {
      let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
      let summary = bestCharge(inputs).trim();
      let expected = `
  ============= 订餐明细 =============
  肉夹馍 x 4 = 24元
  凉皮 x 1 = 8元
  -----------------------------------
  使用优惠:
  满30减6元，省6元
  -----------------------------------
  总计：26元
  ===================================`.trim()
      expect(summary).toEqual(expected)
    });

    it('should generate best charge when no promotion can be used', function () {
      let inputs = ["ITEM0013 x 4"];
      let summary = bestCharge(inputs).trim();
      let expected = `
  ============= 订餐明细 =============
  肉夹馍 x 4 = 24元
  -----------------------------------
  总计：24元
  ===================================`.trim()
      expect(summary).toEqual(expected)
    });

});