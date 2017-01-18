import React from 'react';
import styles from '../machine.sass';

export default class ProductComponent extends React.PureComponent {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        img: React.PropTypes.string.isRequired
    };

    render() {
        const { title, price, img } = this.props;

        return (
            <div className={styles.product}>
                <img src={img} />
                <span className={styles.title}>{title}</span>
                <span className={styles.price}>${price}</span>
            </div>
        );
    }
}