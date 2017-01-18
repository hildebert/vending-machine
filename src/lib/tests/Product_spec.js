import Product from '../Product.js'
import { assert, expect } from 'chai';

describe('Product', () => {
    it('Should return passed values', () => {
        const product = new Product({
            title: 'test',
            price: 1,
            img: 'img'
        });

        assert(product.title === 'test');
        assert(product.price === 1);
        assert(product.img === 'img');
    });

    it('Does not mutate values', () => {
        const product = new Product({
            title: 'test',
            price: 1,
            img: 'img'
        });

        expect(() => {
            product.title = 'test 2';
        }).to.throw('Cannot set property title of #<Product> which has only a getter');
    });
});