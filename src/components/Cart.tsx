import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AboutCart, CheckCart } from '../types/cartTypes'; // Upewnij się, że importujesz odpowiedni typ
import { useAppDispatch } from '../hooks';
import { checkCart } from '../redux/actions/cartActions';

export const Cart = () => {
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkCart())
    }, []);
    
    return (
        <div style={{
            width: '300px',
            height: 'auto',
            backgroundColor: 'lightgrey',
            border: '1px solid black',
            display: 'flex', // Dodane do wyśrodkowania zawartości
            flexDirection: 'column', // Dodane do wyśrodkowania zawartości
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px',
            padding: '20px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
        }}>
            <h4 style={{ textAlign: 'center' }}>Koszyk</h4>
            {cartContent && cartContent.aboutProductsInCart ? (
                <>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <div>
                        {cartContent.aboutProductsInCart.map((product: CheckCart, index: number) => (
                            
                        ))}
                    </div>
                </>
            ) : (
                <p>Koszyk jest pusty</p>
            )}
        </div>
    );
};
