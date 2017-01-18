////import { Layout } from '../Layout.js';
//import { initialState } from '../reducer.js';
//import styles from '../colors.sass';
//
//import React from 'react';
//import chai, { assert } from 'chai';
//import { shallow, mount } from 'enzyme';
//
//import spies from 'chai-spies';
//
//chai.use(spies);
//const should = chai.should();
//
//const increment = () => {};
//const incrementSpy = chai.spy(increment);
//
//const decrement = () => {};
//const decrementSpy = chai.spy(decrement);
//
//const props = {
//    ...initialState,
//    increment: incrementSpy,
//    decrement: decrementSpy
//};
//
//describe('Layout', () => {
//    it('renders DIV tag with correct className', () => {
//        const component = shallow(<Layout {...props}/>);
//        assert.equal(component.find('.' + styles.container).length, 1);
//    });
//
//    it('renders one main component', () => {
//        const component = mount(<Layout {...props}/>);
//        assert.equal(component.find('.' + styles.main).find('Component').length, 1);
//    });
//
//    it('renders initialState.count secondary components', () => {
//        const component = mount(<Layout {...props}/>);
//        assert.equal(component.find('.' + styles.secondary).find('Component').length, initialState.secondaryCount);
//    });
//
//    it('handles increment click', () => {
//        const component = mount(<Layout {...props}/>);
//        component.find('button').first().simulate('click');
//        incrementSpy.should.have.been.called();
//    });
//
//    it('handles decrement click', () => {
//        const component = mount(<Layout {...props}/>);
//        component.find('button').last().simulate('click');
//        decrementSpy.should.have.been.called();
//    });
//});
