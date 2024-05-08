import React from 'react';
import { Products } from "../components/Products";
import { Cart } from "../components/Cart";



export const Main = () => {    
    return (
        <div>
            <h1> Main Page</h1>
            <Cart /> 
            <Products />
        </div>
    );
}