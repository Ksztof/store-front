import { useSelector } from "react-redux";
import { AboutCart, CheckCart } from "../../types/cartTypes";
import { RootState } from "../../redux/store";
import styles from './ProductsToOrder.module.scss';
import { OrderedProduct } from "../orderedProduct/OrderedProduct";

export const ProductsToOrder: React.FC = () => {
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);

    return (
        <>
            <div className={styles.summaryHeader}>
                <div className={styles.title}>picture</div>
                <div className={styles.title}>Product Name</div>
                <div className={styles.title}>   Quantity</div>
                <div className={styles.title}>  Unit Price</div>
                <div className={styles.title}>  Total Price</div>
            </div>
            <div className={styles.orderedProductsContainer}>
                {cartContent.aboutProductsInCart.map((product: CheckCart) => (
                    <OrderedProduct key={product.productId} product={product} />
                ))}

                <p className={styles.amountRow}>Total Amount: {cartContent.totalCartValue}</p>
            </div>
        </>
    );
};

export default ProductsToOrder;