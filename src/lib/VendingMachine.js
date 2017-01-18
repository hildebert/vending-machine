import Product from './Product.js';

export default function VendingMachine() {
    let products = {};
    let money = 0;
    let productsNumberMap = {};
    let nextNumber = 1;

    /**
     * Add new product
     * @param product
     */
    this.addProduct = product => {
        if (!(product instanceof Product)) {
            throw new Error('product is not instance of Product');
        }

        const { title } = product;

        if (!productsNumberMap[title]) {
            productsNumberMap[title] = nextNumber++;

            if (productsNumberMap[title] < 10) {
                productsNumberMap[title] = '0' + productsNumberMap[title];
            }
        }

        const key = productsNumberMap[title];

        if (!products[key]) {
            products[key] = [];
        }

        products[key].push(product);
    };

    /**
     * Set new products from array
     * @param newProducts
     */
    this.setProducts = newProducts => {
        // clear existing products
        products = {};
        newProducts.forEach(this.addProduct.bind(this));
    };

    const checkNumber = number => {
        if (!products[number]) throw new Error('Wrong number');
        if (products[number].length === 0) throw new Error('Out of stock, sorry');
    };

    this.getPriceByNumber = number => {
        checkNumber(number);
        return products[number][0].price;
    };

    this.buy = number => {
        checkNumber(number);

        const product = products[number].pop();
        money += product.price;
        return product;
    };

    this.extractMoney = () => {
        const retval = money;
        money = 0;
        return retval;
    };

    /**
     * Products list getter. Deep copy so that local products
     * object is not mutated from outside.
     */
    Object.defineProperty(this, 'products', { get: () => {
        const retval = {};

        for (var i in products) {
            retval[i] = products[i].slice();
        }

        return retval;
    } });

    Object.defineProperty(this, 'money', { get: () => money });
}