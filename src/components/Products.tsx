import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { getProducts } from "../redux/actions/productActions";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetails, ProductInCart } from "../types/productTypes";

export const Products = () => {
    const dispatch = useAppDispatch();
    const isDataLoading = useSelector((state: RootState) => state.product.loading);
    const products = useSelector((state: RootState) => state.product.productsData);

    useEffect(() => {
        if(!isDataLoading){
            dispatch(getProducts());
        }
    }, []);
    
    const addToCart = (product: ProductInCart, quantity: number) => {
        const itemsInCart = JSON.parse(localStorage.getItem('cart') || '[]');

        const existingItem: ProductInCart = itemsInCart.find((item: ProductInCart) => item.id === product.id);
        if(existingItem){
            existingItem.quantity += 1
            
        }

    }

    return (
        <div>
            {products.map((product: ProductDetails) => (
                <div key={product.id}>
                    <h3>Name: {product.name}</h3>
                    <p>Description: {product.description}</p>
                    <p>price: {product.price}</p>
                    <input></input>
                    <button >dodaj do koszyka</button>
                </div>
            ))}
        </div>
    );
}