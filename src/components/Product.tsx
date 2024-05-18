import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetails } from "../types/productTypes";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { addProductToCart } from "../redux/actions/cartActions";
import { ProductProps } from "../props/productProps";

export const Product: React.FC<ProductProps> = ({ productId }) => {
    const dispatch = useAppDispatch();

    const [productQuantity, setProductQuantity] = useState<number>(1);
    const product: ProductDetails | undefined = useSelector((state: RootState) => state.product.productsData.find((p: ProductDetails) => p.id === productId));
    
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue) && parsedValue > 0 && parsedValue < 100) {
            setProductQuantity(parsedValue);
        }
    };

    if (!product) return null;

    return (
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => dispatch(addProductToCart({product: product, quantity: productQuantity}))}>Add to cart</button>
            <input
                type="number"
                onChange={handleQuantityChange}
                value={productQuantity}
            />
        </div>
    );
};