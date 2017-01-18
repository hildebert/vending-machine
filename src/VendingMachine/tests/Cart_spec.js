import Cart from '../components/Cart.js';
import styles from '../machine.sass';

import Product from '../../lib/Product.js';
import productData from '../../lib/productData.js';

import React from 'react';
import chai, { assert } from 'chai';
import { shallow } from 'enzyme';

import spies from 'chai-spies';

chai.use(spies);
const should = chai.should();

const moreMoney = () => {};
const moreMoneySpy = chai.spy(moreMoney);

const props = {
    cart: [new Product(productData[0]), new Product(productData[1])],
    money: 10,
    moreMoney: moreMoneySpy
};

describe('Cart', () => {
    it ('Should render DIV tag with corrent className', () => {
        const component = shallow(<Cart {...props}/>);
        assert(component.find(`.${styles.cart}`).length === 1);
    });

    it ('Should have correct number of products', () => {
        const component = shallow(<Cart {...props}/>);
        assert(component.find('ProductComponent').length === props.cart.length);
    });

    it ('Should display correct amount of money', () => {
        const component = shallow(<Cart {...props}/>);
        assert(component.find(`.${styles.balance}`).text().match(new RegExp(`\\$${props.money}`)));
    });

    it ('Should call moreMoney handler', () => {
        const component = shallow(<Cart {...props}/>);
        component.find('button').last().simulate('click');
        moreMoneySpy.should.have.been.called();
    });
});