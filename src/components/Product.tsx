import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetails } from "../types/productTypes";
import { useState } from "react";
import { addProductToCart, decreaseQuantity, increaseQuantity } from "../utils/productUtils";
import { useAppDispatch } from "../hooks";

export const Product: React.FC<{ productId: number }> = ({ productId }: { productId: number }) => {
    const dispatch = useAppDispatch();

    const [productQuantity, setProductQuantity] = useState<string>('1');
    const product: ProductDetails | undefined = useSelector((state: RootState) => state.product.productsData.find((p: ProductDetails) => p.id === productId));
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(event.target.value);
    };

    if (!product) return null;

    return (
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => decreaseQuantity(productId)}>-</button>
            <button onClick={() => increaseQuantity(productId)}>+</button>
            <button onClick={() => addProductToCart(productQuantity, product, dispatch)}>Dodaj do koszyka</button>
            <input
                type="text"
                onChange={handleInputChange}
                value={productQuantity}
            />
        </div>
    );
};