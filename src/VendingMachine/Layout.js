import React from 'react';
import styles from './machine.sass';

import Cart from './components/Cart.js';
import Machine from './components/Machine.js';

export default class Layout extends React.Component {
    static propTypes = {
        machine: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            number: '--',
            error: null,
            cart: [],
            money: 10
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleBuyClick = this.handleBuyClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleMoreMoneyClick = this.handleMoreMoneyClick.bind(this);
    }

    handleButtonClick(e, number) {
        e && e.preventDefault();

        this.setState(Object.assign({}, this.state, {
            number: this.state.number.replace(/-/, number)
        }));
    }

    handleBuyClick(e) {
        e && e.preventDefault();

        const { machine } = this.props;
        const { number, money } = this.state;

        try {
            const price = machine.getPriceByNumber(number);

            if (price > money) {
                throw new Error('Not enough money');
            }

            const product = machine.buy(number);

            this.setState(Object.assign({}, this.state, {
                cart: [...this.state.cart, product],
                money: this.state.money - product.price,
                number: '--',
                error: null
            }));
        } catch (e) {
            this.setState(Object.assign({}, this.state, { error: e.message }));
        }
    }

    handleClearClick(e) {
        e && e.preventDefault();
        this.setState(Object.assign({}, this.state, { number: '--', error: null }));
    }

    handleMoreMoneyClick(e) {
        e && e.preventDefault();
        this.setState(Object.assign({}, this.state, { money: this.state.money + 10 }));
    }

    render() {
        const { number, error } = this.state;
        const { machine } = this.props;

        return (
            <div className={styles.container}>
                <Machine products={machine.products} error={error} buyClick={this.handleBuyClick} clearClick={this.handleClearClick} buttonClick={this.handleButtonClick} number={number} />
                <Cart money={this.state.money} cart={this.state.cart} moreMoney={this.handleMoreMoneyClick} />
            </div>
        );
    }
}
