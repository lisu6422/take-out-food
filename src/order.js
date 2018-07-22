const datebase = require('../src/items');


module.exports = class Order{
    constructor(inputs){
     this.allItems = datebase.loadAllItems();
    }


    getOrderItems(carts){
        let orderItems = [];
        for(let i=0; i<carts.length; i++){
            let orderItem = {};
            let targetItem = this.allItems.find(item => item.id === carts[i].id);
            orderItem.id = targetItem.id;
            orderItem.count = carts[i].count;
            orderItem.name = targetItem.name;
            orderItem.price = targetItem.price;
            orderItems.push(orderItem);
        }
       
        return orderItems;
    }
}