import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetails } from "../types/productTypes";

export const Product = ({ productId }: { productId: number }) => {
    const product: ProductDetails | undefined = useSelector((state: RootState) => state.product.productsData.find((p: ProductDetails) => p.id === productId));

    const addProductToCart = () =>{
        if (product) addProductToLocalStorage(product);  
    };

    //TODO: export to separated service
    const addProductToLocalStorage = (product: ProductDetails) => {
        const productsInCartStorJson = localStorage.getItem('productsInCart');
        const productsInCartStor = productsInCartStorJson ? JSON.parse(productsInCartStorJson) : [];
        
        productsInCartStor.push(product);

        localStorage.setItem('productsInCart', JSON.stringify(productsInCartStor))
    };

    if (!product) return null;
    
    console.log(localStorage.getItem('productsInCart'));

    return (
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={addProductToCart}>Dodaj do koszyka</button> 
        </div>
    );
};