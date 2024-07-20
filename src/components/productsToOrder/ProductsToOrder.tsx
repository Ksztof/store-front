import { useSelector } from "react-redux";
import { OrderedProducts } from "../orderedProducts/OrderedProducts";
import { AboutCart, CheckCart } from "../../types/cartTypes";
import { RootState } from "../../redux/store";
import styles from './ProductsToOrder.module.scss';

export const ProductsToOrder: React.FC = () => {
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);

    return (
        <>
            <>
                <table className={styles.summaryTable}>
                    <thead className={styles.tableHeader}>
                        <tr className={styles.headerRow}>
                            <th></th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartContent.aboutProductsInCart.map((product: CheckCart) => (
                            <OrderedProducts key={product.productId} product={product} />
                        ))}
                    </tbody>
                </table>

                <p className={styles.amountRow}>Total Amount: {cartContent.totalCartValue}</p>

            </>
        </>
    );
};

export default ProductsToOrder;