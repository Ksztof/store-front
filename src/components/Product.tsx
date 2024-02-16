import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetails } from "../types/productTypes";
import { useAppDispatch } from "../hooks";
import { addProductToLocStor } from "../utils/cartUtills";

export const Product = ({ productId }: { productId: number }) => {
    const product: ProductDetails | undefined = useSelector((state: RootState) => state.product.productsData.find((p: ProductDetails) => p.id === productId));

    const addProductToCart = () =>{
        if (product) addProductToLocStor(product);  
    };
    
    if (!product) return null;
    
    return (
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={addProductToCart}>Dodaj do koszyka</button> 
        </div>
    );
};