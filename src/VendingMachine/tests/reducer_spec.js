//import * as actions from '../actions.js';
//import { assert } from 'chai';
//import reducer, { initialState } from '../reducer.js';
//
//describe('Colors reducer', () => {
//    it('processes increment action', () => {
//        const resultState = Object.assign({}, initialState, { count: initialState.count + 1 });
//        assert.deepEqual(reducer(initialState, actions.increment()), resultState);
//    });
//
//    it('processes decrement action', () => {
//        const resultState = Object.assign({}, initialState, { count: initialState.count - 1 });
//        assert.deepEqual(reducer(initialState, actions.decrement()), resultState);
//    });
//
//    it('processes lock stipe action', () => {
//        const resultState = Object.assign({}, initialState, {
//            lockedColors: {
//                1: { 1: 'red' },
//                2: { 2: 'green' }
//            }
//        });
//
//        let state = reducer(initialState, actions.lockStripe(1, 1, 'red'));
//        state = reducer(state, actions.lockStripe(2, 2, 'green'));
//
//        assert.deepEqual(state, resultState);
//    });
//});
