import { useSelector } from "react-redux";
import { AboutCart, CheckCart } from "../../../cart/cartTypes";
import styles from './ProductsToOrder.module.scss';
import { OrderedProduct } from "../orderedProduct/OrderedProduct";
import React from 'react';
import { RootState } from "../../../shared/redux/store";

export const ProductsToOrder: React.FC = () => {
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);

    return (
        <>
            <div className={styles.summaryHeader}>
                <div className={styles.title}></div>
                <div className={styles.title}>Name</div>
                <div className={styles.title}>Quantity</div>
                <div className={styles.title}>Unit Price</div>
                <div className={styles.title}>Total Price</div>
            </div>
            <div className={styles.orderedProductsContainer}>
                {cartContent.aboutProductsInCart.map((product: CheckCart) => (
                    <OrderedProduct key={product.productId} product={product} />
                ))}
            </div>
            <div className={styles.amountRow}>
                <div className={styles.amountTitle}>Total:</div>
                <div className={styles.amountValue}>{cartContent.totalCartValue.toFixed(2)} zł</div>
            </div>
        </>
    );
};

export default ProductsToOrder;
