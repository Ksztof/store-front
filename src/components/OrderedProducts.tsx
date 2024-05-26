import { CheckCart, ProductInCartProps } from "../types/cartTypes";

export const OrderedProducts: React.FC<ProductInCartProps> = (props) => {
    const product: CheckCart = props.product;

    return (
        <tr>
            <td>{product.productName}</td>
            <td>{product.quantity}</td>
            <td>{product.productUnitPrice}</td>
            <td>{product.productTotalPrice}</td>
        </tr>
    );
}