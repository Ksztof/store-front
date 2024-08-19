import styles from './OrderedProductSummary.module.scss';
import { ProductInCartProps, CheckCart } from "../../types/cartTypes";
import productImg from '../../pictures/kielbasa.jpg'
import React from 'react';

export const OrderedProductSummary: React.FC<ProductInCartProps> = (props) => {
    const product: CheckCart = props.product;

    return (
        <div className={styles.orderedProduct}>
            <div className={`${styles.imageContainer} ${styles.cell}`}>
                <img className={styles.img} src={productImg} alt="prodImg" loading="lazy" />
            </div>
            <div className={styles.cell}>
                {product.productName}
            </div>
            <div className={styles.cell}>
                {product.quantity}
            </div>
            <div className={styles.cell}>{product.productUnitPrice} zł</div>
            <div className={styles.cell}>{product.productTotalPrice} zł</div>
        </div>
    );
}
