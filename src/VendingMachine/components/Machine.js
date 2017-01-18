import React from 'react';
import map from 'lodash/map';
import Slot from './Slot.js';
import styles from '../machine.sass';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default class Machine extends React.Component {
    static propTypes = {
        products: React.PropTypes.object.isRequired,
        buyClick: React.PropTypes.func.isRequired,
        clearClick: React.PropTypes.func.isRequired,
        buttonClick: React.PropTypes.func.isRequired,
        number: React.PropTypes.string.isRequired,
        error: React.PropTypes.string
    };

    render() {
        const { products, buttonClick, buyClick, clearClick, number, error } = this.props;

        const getClickHandler = number => e => buttonClick(e, number);

        return (
            <div className={styles.machine}>
                <div className={styles.slots}>
                    {map(products, (list, number) => <Slot key={number} number={number} list={list} />)}
                </div>
                <div className={styles.controls}>
                    <div className={styles.display}>
                        {number}
                    </div>
                    <div className={styles.buttons}>
                        {numbers.map((number, index) =>
                            <a href='#' key={index} className={styles.button} onClick={getClickHandler(number)}>{number}</a>
                        )}
                    </div>
                    <div className={styles.actions}>
                        <a href='#' className={styles.action} onClick={buyClick}>Buy</a>
                        <a href='#' className={styles.action} onClick={clearClick}>Clear</a>
                    </div>
                    { error ? <div className={styles.error}>{error}</div> : null }
                </div>
            </div>
        );
    }
}