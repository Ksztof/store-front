import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AboutCart, AboutCartApi, CheckCart } from '../types/cartTypes'; // Upewnij się, że importujesz odpowiedni typ
import { useAppDispatch } from '../hooks';
import { checkCart } from '../redux/actions/cartActions';
import { calculateTotalLocStore, getCombinedCartContent, getProductsFromLocStor } from '../utils/cartUtills';
import { addCombinedCartRedStor } from '../redux/actions/combinedCartActions';

export const Cart: React.FC = () => {
    const dispatch = useAppDispatch();

    const cartContentApi: AboutCartApi = useSelector((state: RootState) => state.cart.cartData);
    const cartContentLocStor: CheckCart[] = useSelector((state: RootState) => state.cartLocStor.cartLocStorData);
    const [combinedCartContent, setCartContent] = useState<AboutCart>({
        totalCartValue: 0,
        aboutProductsInCart: []
    });

    useEffect(() => {
        dispatch(checkCart());

        if (cartContentApi && cartContentLocStor) {
            const newCartContent = getCombinedCartContent(cartContentApi, cartContentLocStor)
            setCartContent(newCartContent);

            let combinedCartContentPayload: AboutCart= {
                totalCartValue: combinedCartContent.totalCartValue,
                aboutProductsInCart: combinedCartContent.aboutProductsInCart
            }

            dispatch(addCombinedCartRedStor(combinedCartContentPayload));
        };
    }, [cartContentLocStor]); 

   

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
            {combinedCartContent
                && combinedCartContent
                && combinedCartContent !== null
                && combinedCartContent !== undefined ? (
                <>
                    <h5>Wartość koszyka: {combinedCartContent.totalCartValue} zł</h5>
                    <div>
                        {combinedCartContent.aboutProductsInCart.map((p: CheckCart, index: number) => {
                            return <div key={p.productId + index}>
                                <p>productName: {p.productName}</p>
                                <p>manufacturer: {p.manufacturer}</p>
                                <p>quantity: {p.quantity}</p>
                                <p>unit price: {p.productUnitPrice}</p>
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
