import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AboutCart, CheckCart } from '../types/cartTypes'; // Upewnij się, że importujesz odpowiedni typ
import { useAppDispatch } from '../hooks';
import { getCartContentApi } from '../redux/actions/cartActions';
import { getProductsFromLocStor, isCartExistLocStor } from '../utils/cartUtills';

export const Cart: React.FC = () => {
    const dispatch = useAppDispatch();

    const cartContent: AboutCart | null = useSelector((state: RootState) => state.cartLocStor.cartLocStorData);

    useEffect(() => {
        let cartExistInLocalStorage = isCartExistLocStor();
        if(!cartExistInLocalStorage){
            dispatch(getCartContentApi());
        }

    }, []); 

    return (
        <div style={{
            width: '300px',
            height: 'auto',
            backgroundColor: 'lightgrey',
            border: '1px solid black',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px',
            padding: '20px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
        }}>
            <h4 style={{ textAlign: 'center' }}>Koszyk</h4>
            {cartContent ? (
                <>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <div>
                        {cartContent.aboutProductsInCart.map((p: CheckCart, index: number) => {
                            return <div key={p.productId + index}>
                                <p>productName: {p.productName}</p>
                                <p>manufacturer: {p.manufacturer}</p>
                                <p>quantity: {p.quantity}</p>
                                <p>unit price: {p.productUnitPrice}</p>
                                <p>total: {p.productTotalPrice}</p>
                                <p></p>
                            </div>
                        })}
                    </div>
                </>
            ) : (
                <p>Koszyk jest pusty</p>
            )}
        </div>
    );
};
