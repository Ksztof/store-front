import { useSelector } from "react-redux";
import { AboutCart, CheckCart } from "../types/cartTypes";
import { RootState } from "../redux/store";
import { OrderedProducts } from "./OrderedProducts";

export const ProductsToOrder: React.FC = () => {
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);

    return (
        <div>
            <h1>Order Summary</h1>
            <p>Total Amount: {cartContent.totalCartValue}</p>
            <p>Products</p>
            <div>
                <table>
                    <thead>
                        <tr>
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
            </div>
        </div>
    );
};

export default ProductsToOrder;