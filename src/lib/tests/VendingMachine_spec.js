import VendingMachine from '../VendingMachine.js'
import Product from '../Product.js'
import productsData from '../productData.js';
import { assert, expect } from 'chai';

const getMachine = () => {
    const machine = new VendingMachine();
    machine.addProduct(new Product(productsData[0]));
    machine.addProduct(new Product(productsData[1]));

    return machine;
};

describe('Vending Machine ', () => {
    it('Should add products', () => {
        const machine = getMachine();

        assert(machine.products['01'].length === 1);
        assert(machine.products['01'][0].title === productsData[0].title);
        assert(machine.products['02'].length === 1);
        assert(machine.products['02'][0].title === productsData[1].title);
    });

    it('Should sell products', () => {
        const machine = getMachine();

        const product = machine.buy('01');

        assert(machine.products['01'].length === 0);
        assert(machine.products['02'].length === 1);
        assert(machine.products['02'][0].title === productsData[1].title);
    });

    it('Should return price by slot number products', () => {
        const machine = getMachine();

        assert(machine.getPriceByNumber('01') === productsData[0].price);
        assert(machine.getPriceByNumber('02') === productsData[1].price);
    });

    it('Should count and extract money', () => {
        const machine = getMachine();

        machine.buy('01');
        machine.buy('02');

        assert(machine.money === productsData[0].price + productsData[1].price);
        assert(machine.extractMoney() === productsData[0].price + productsData[1].price);
        assert(machine.money === 0);
    });

    it('Should not allow products mutation', () => {
        const machine = getMachine();

        machine.products['01'] = [];
        machine.products['02'] = [new Product(productsData[2])];

        assert(machine.products['01'].length === 1);
        assert(machine.products['01'][0].title === productsData[0].title);
        assert(machine.products['02'].length === 1);
        assert(machine.products['02'][0].title === productsData[1].title);
    });
});