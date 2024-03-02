import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetails } from "../types/productTypes";
import { addProductToLocStor } from "../utils/cartUtills";
import { useState } from "react";

export const Product: React.FC<{ productId: number }> = ({ productId }: { productId: number }) => {
    const [productQuantity, setProductQuantity] = useState<string>('1');
    const product: ProductDetails | undefined = useSelector((state: RootState) => state.product.productsData.find((p: ProductDetails) => p.id === productId));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(event.target.value);
    };

    const addProductToCart = (quantity: string) => {
        let parsedQuant: number = parseFloat(quantity);
        const inputIsntNumber = !isNaN(parsedQuant);
        const productExists = product;
        const inputIsPositive = parsedQuant > 0;
        const isEmptyString = quantity === '';
        const valueIsInScope = parsedQuant < 100;

        if (
            (inputIsntNumber && productExists && inputIsPositive && valueIsInScope) ||
            (productExists && isEmptyString)
        ) {
            if (quantity === '') {
                parsedQuant = 1;
            }
            addProductToLocStor(product, parsedQuant);
        }
    };

    if (!product) return null;

    return (
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => addProductToCart(productQuantity)}>Dodaj do koszyka</button>
            <input
                type="text"
                onChange={handleInputChange}
                value={productQuantity}

            />
        </div>
    );
};