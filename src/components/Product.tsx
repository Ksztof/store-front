import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetails } from "../types/productTypes";
import { useAppDispatch } from "../hooks";
import { addProductToLocStor } from "../utils/cartUtills";
import { useState } from "react";

export const Product = ({ productId }: { productId: number }) => {
    const [productQuantity, setProductQuantity] = useState<string>('1');
    const product: ProductDetails | undefined = useSelector((state: RootState) => state.product.productsData.find((p: ProductDetails) => p.id === productId));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(event.target.value);
    };

    const addProductToCart = (Quantity: string) => {
        const parsedQuant: number = parseFloat(Quantity);
        // if (!isNaN(parsedProdQuant)) {
        //     // Jeśli parsowanie się powiodło, wykonaj odpowiednie działania
        //     console.log('Wartość została pomyślnie sparsowana:', parsedProdQuant);
        //   } 
        if (product) addProductToLocStor(product, parsedQuant);
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
                pattern="[0-9]*[.,]?[0-9]+"
                title="1"
            />
        </div>
    );
};