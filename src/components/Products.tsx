import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { getProducts } from "../redux/actions/productActions";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetails } from "../types/productTypes";

export const Products = () => {
    const dispatch = useAppDispatch();
    const isDataLoading = useSelector((state: RootState) => state.product.loading);
    const products = useSelector((state: RootState) => state.product.productsData);


    useEffect(() => {
        if(!isDataLoading){
            dispatch(getProducts());
        }
    }, []);
    
    return (
        <div>
            {products.map((product: ProductDetails) => (
                <div key={product.id}>
                    <h3>Name: {product.name}</h3>
                    <p>Description: {product.description}</p>
                    <p>price: {product.price}</p>
                    <button >+</button>
                </div>
            ))}
        </div>
    );
}