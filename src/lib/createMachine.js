import Product from './Product.js';
import VendingMachine from './VendingMachine.js';
import productsData from './productData.js';

const machine = new VendingMachine();

productsData.forEach(productData => {
    for (let i = 0; i < 10; i++) {
        machine.addProduct(new Product(productData));
    }
});

export default machine;