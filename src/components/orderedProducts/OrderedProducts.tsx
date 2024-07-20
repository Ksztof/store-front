import { CheckCart, ProductInCartProps } from "../../types/cartTypes";
import styles from './OrderedProducts.module.scss';
import productImg from '../../pictures/kielbasa.jpg'

export const OrderedProducts: React.FC<ProductInCartProps> = (props) => {
    const product: CheckCart = props.product;

    return (
        <tr className={styles.tableRow}>
            <td>
                <img className={styles.img} src={productImg} alt="prodImg" loading="lazy" />
            </td>
            <td className={styles.prodNameCol}>{product.productName}</td>
            <td>{product.quantity}</td>
            <td>{product.productUnitPrice}</td>
            <td>{product.productTotalPrice}</td>
        </tr>
    );
}