import React from 'react';
import ProductComponent from './ProductComponent.js';
import styles from '../machine.sass';

export default class Cart extends React.Component {
    static propTypes = {
        cart: React.PropTypes.array.isRequired,
        money: React.PropTypes.number.isRequired,
        moreMoney: React.PropTypes.func.isRequired
    };

    render() {
        const { cart, money, moreMoney } = this.props;

        return (
            <div className={styles.cart}>
                <div className={styles.balance}>
                    You have: ${Math.round(money * 100) / 100}
                    <button onClick={moreMoney}>GIB MONEY</button>
                </div>
                <div className={styles.cart__list}>
                    {cart.map((product, index) => <ProductComponent key={index} {...product.dump()} />)}
                </div>
            </div>
        );
    }
}