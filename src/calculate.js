const datebase = require('../src/promotions');

module.exports = class Calculate {
    constructor() {
        this.promotionsItems = datebase.loadPromotions();
    }

    calculate(orderItems) {
        let totalPrice = 0;
        let tpWithType1 = 0, tpWithType2 = 0;
        for (let i = 0; i < orderItems.length; i++) {
            totalPrice += orderItems[i].price * orderItems[i].count;
        }
        tpWithType1 = totalPrice;
        tpWithType2 = totalPrice;
        if (totalPrice >= 30) {
            tpWithType1 = totalPrice - 6;
        }

        for (let i = 0; i < orderItems.length; i++) {
            if (this.promotionsItems[1].items.includes(orderItems[i].id)) {
                tpWithType2 = tpWithType2 - orderItems[i].price * orderItems[i].count / 2;
            }
        }

        let calculateResult = {};
        if (tpWithType1 < tpWithType2) {
            calculateResult.totalPrice = tpWithType1;
            calculateResult.discountType = '';
            calculateResult.freePrice = totalPrice - tpWithType1;
            if (calculateResult.freePrice > 0) {
                calculateResult.discountType = '满30减6元';
            }

        }
        else {
            calculateResult.totalPrice = tpWithType2;
            calculateResult.discountType = '';
            calculateResult.freePrice = totalPrice - tpWithType2;
            if (calculateResult.freePrice > 0) {
                calculateResult.discountType = "指定菜品半价";
            }
        }
        return calculateResult;
    }

    print(orderItems, calculateResult) {
        let resultStr = '============= 订餐明细 =============\n';
        for (let i = 0; i < orderItems.length; i++) {
            let price = orderItems[i].price * orderItems[i].count;
            resultStr += `${orderItems[i].name} x ${orderItems[i].count} = ${price}元\n`;
        }
       
        if (calculateResult.discountType.length > 0) {
            resultStr += '-----------------------------------\n';
            resultStr += '使用优惠:\n';
            let freeItemName = '';
            for (let i = 0; i < orderItems.length; i++) {
                if (this.promotionsItems[1].items.includes(orderItems[i].id)) {
                    freeItemName += orderItems[i].name;
                    if (i < orderItems.length - 1) {
                        freeItemName += '，';
                    }
                }
            }
            if (calculateResult.discountType === '满30减6元') {
                resultStr += `${calculateResult.discountType}，省${calculateResult.freePrice}元\n`;

            }
            if (calculateResult.discountType === '指定菜品半价') {
                resultStr += `${calculateResult.discountType}(${freeItemName})，省${calculateResult.freePrice}元\n`;

            }
        }
        //resultStr += `${calculateResult.discountType}(${freeItemName})，省${calculateResult.freePrice}元\n`;
        resultStr += '-----------------------------------\n';
        resultStr += `总计：${calculateResult.totalPrice}元\n`;
        resultStr += '===================================\n';

        return resultStr;
    }
}