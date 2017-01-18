import Machine from '../components/Machine.js';
import styles from '../machine.sass';

import Product from '../../lib/Product.js';
import productData from '../../lib/productData.js';
import machine from '../../lib/createMachine.js';

import React from 'react';
import chai, { assert } from 'chai';
import { shallow } from 'enzyme';

import spies from 'chai-spies';

chai.use(spies);
const should = chai.should();

const buyClick = () => {};
const buyClickSpy = chai.spy(buyClick);

const clearClick = () => {};
const clearClickSpy = chai.spy(clearClick);

const buttonClick = () => {};
const buttonClickSpy = chai.spy(buttonClick);

const props = {
    products: machine.products,
    buyClick: buyClickSpy,
    clearClick: clearClickSpy,
    buttonClick: buttonClickSpy,
    number: '01',
    error: null
};

describe('Machine', () => {
    it ('Should render DIV tag with correct className', () => {
        const component = shallow(<Machine {...props}/>);
        assert(component.find(`.${styles.machine}`).length === 1);
    });

    it ('Should have correct number of slots', () => {
        const component = shallow(<Machine {...props}/>);
        assert(component.find('Slot').length === Object.keys(props.products).length);
    });

    it ('Should display correct number of buttons', () => {
        const component = shallow(<Machine {...props}/>);
        assert(component.find(`.${styles.button}`).length === 10);
    });

    it ('Should display correct number in display', () => {
        const component = shallow(<Machine {...props}/>);
        assert(component.find(`.${styles.display}`).text() === props.number);
    });

    it ('Should display error message', () => {
        const propsWithError = Object.assign({}, props, { error: 'Error' });
        const component = shallow(<Machine {...propsWithError}/>);
        assert(component.find(`.${styles.error}`).text() === 'Error');
    });

    it ('Should call buy handler', () => {
        const component = shallow(<Machine {...props}/>);
        component.find(`.${styles.action}`).first().simulate('click');
        buyClickSpy.should.have.been.called();
    });

    it ('Should call clear handler', () => {
        const component = shallow(<Machine {...props}/>);
        component.find(`.${styles.action}`).last().simulate('click');
        clearClickSpy.should.have.been.called();
    });

    it ('Should call button click handler', () => {
        const component = shallow(<Machine {...props}/>);
        component.find(`.${styles.button}`).first().simulate('click');
        component.find(`.${styles.button}`).last().simulate('click');
        buttonClickSpy.should.have.been.called(2);
    });
});