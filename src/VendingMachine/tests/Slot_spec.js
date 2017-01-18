import Slot from '../components/Slot.js';
import styles from '../machine.sass';

import Product from '../../lib/Product.js';
import productData from '../../lib/productData.js';

import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

const props = {
    list: [new Product(productData[0]), new Product(productData[1])],
    number: '01'
};

describe('Slot', () => {
    it ('Should render DIV tag with correct className', () => {
        const component = shallow(<Slot {...props}/>);
        assert(component.find(`.${styles.slot}`).length === 1);
    });

    it ('Should have correct number of products', () => {
        const component = shallow(<Slot {...props}/>);
        assert(component.find('ProductComponent').length === props.list.length);
    });

    it ('Should display correct slot number', () => {
        const component = shallow(<Slot {...props}/>);
        assert(component.find(`.${styles.slot__number}`).text() === `Number: ${props.number}`);
    });

    it ('Should display correct slot title', () => {
        const component = shallow(<Slot {...props}/>);
        assert(component.find(`.${styles.slot__title}`).text() === `${props.list[0].title} (${props.list.length})`);
    });

    it ('Should display correct slot price', () => {
        const component = shallow(<Slot {...props}/>);
        assert(component.find(`.${styles.slot__price}`).text() === `$${props.list[0].price}`);
    });
});