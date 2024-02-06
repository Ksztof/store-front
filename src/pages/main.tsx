import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React from 'react';
import { Cart } from "../components/Cart";
import { Products } from "../components/Products";



export const Main = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <div>
            <h1> Main Page</h1>
            <Cart /> 
            <Products />
        </div>
    );
}