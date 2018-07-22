module.exports = class Cart{
    constructor(){
     
    }

     static getCartInfo(inputs){
        let cartItems = [];
        for(let i=0; i<inputs.length; i++){
            let cartItem = {};
            if (inputs[i].includes('x')) {
                let cart = inputs[i].split('x');
                cartItem.id = cart[0].trim();
                cartItem.count = parseInt(cart[1].trim());
            } 
            cartItems.push(cartItem);
        }
        
        return cartItems;
    }
}