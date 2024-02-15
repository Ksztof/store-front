import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { getProducts } from "../redux/actions/productActions";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetails } from "../types/productTypes";
import { Product } from "./Product";

export const Products = () => {
    const dispatch = useAppDispatch();
    const isDataLoading = useSelector((state: RootState) => state.product.loading);
    const products = useSelector((state: RootState) => state.product.productsData);
    const [number, setNumber] = useState(1);

    useEffect(() => {
        if (!isDataLoading) {
            dispatch(getProducts());
        }
    }, []);


    return (
        <div>
            {products.map((product : ProductDetails) => (
                <Product key={product.id} productId={product.id} />
            ))}
        </div>
    );
};