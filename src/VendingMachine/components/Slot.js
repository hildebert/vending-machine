import React from 'react';
import ProductComponent from './ProductComponent.js';
import styles from '../machine.sass';

export default class Slot extends React.Component {
    static propTypes = {
        list: React.PropTypes.array.isRequired,
        number: React.PropTypes.string.isRequired
    };

    shouldComponentUpdate(newProps) {
        return (newProps.number !== this.props.number || newProps.list.length !== this.props.list.length);
    }

    render() {
        const { list, number } = this.props;
        const length = list.length;

        return (
            <div className={styles.slot} ref='component'>
                <div className={styles.products}>
                    {list.map((product, index) => <ProductComponent key={index} {...product.dump()} />)}
                </div>
                {length ? <div className={styles.slot__number}>Number: {number}</div> : null}
                {length ? <div className={styles.slot__title}>{list[0].title} ({length})</div> : null}
                {length ? <div className={styles.slot__price}>${list[0].price}</div> : null}
            </div>
        );
    }
}