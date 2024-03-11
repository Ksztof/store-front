import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AboutCart, AboutCartApi, CheckCart } from '../types/cartTypes'; // Upewnij się, że importujesz odpowiedni typ
import { useAppDispatch } from '../hooks';
import { checkCart } from '../redux/actions/cartActions';
import { calculateTotalLocStore, getCombinedCartContent, getProductsFromLocStor } from '../utils/cartUtills';

export const Cart: React.FC = () => {
    const dispatch = useAppDispatch();

    const cartContentApi: AboutCartApi = useSelector((state: RootState) => state.cart.cartData);
    const [cartContentLocStor, setCartContentLocStor] = useState<CheckCart[]>(getProductsFromLocStor());
    const [cartContent, setCartContent] = useState<AboutCart>({
        totalCartValue: 0,
        aboutProductsInCart: []
    });

    useEffect(() => {
        dispatch(checkCart());
    }, []);


    useEffect(() => {
        const handleProductsInLocStorUpdate = (event: StorageEvent) => {
            if (event.key == 'productsInCart') {
                setCartContentLocStor(getProductsFromLocStor());
                
            }
        };

        window.addEventListener('storage', handleProductsInLocStorUpdate);

        return () => {
            window.removeEventListener('storage', handleProductsInLocStorUpdate);
        };
        if (cartContentApi && cartContentLocStor) {//TODO: change for cartContentApi || cartContentLocStor
            const newCartContent = getCombinedCartContent(cartContentApi, cartContentLocStor)
            setCartContent(newCartContent);
        };
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
            {cartContent
                && cartContent
                && cartContent !== null
                && cartContent !== undefined ? (
                <>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <div>
                        {cartContent.aboutProductsInCart.map((p: CheckCart, index: number) => {
                            return <div key={p.productId + index}>
                                <p>productName: {p.productName}</p>
                                <p>manufacturer: {p.manufacturer}</p>
                                <p>quantity: {p.quantity}</p>
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
