import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AboutCart, AdjustProductQuantityType, CheckCart } from '../types/cartTypes';
import { useAppDispatch } from '../hooks';
import { changeCartContentGlobally, synchronizeCartWithApi } from '../redux/actions/cartActions';
import { isCartExistLocStor } from '../utils/cartUtils';
import { ProductInCart } from './ProductInCart';

export const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartContent: AboutCart | null = useSelector((state: RootState) => state.cart.cartContent.products);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
        const cartExistInLocalStorage = isCartExistLocStor();
        if (!cartExistInLocalStorage && isLoggedIn) {
            dispatch(synchronizeCartWithApi());
        }
    }, [isLoggedIn, dispatch]);
    
    const handleOrder = () => {
        if (cartContent !== null) {
            dispatch(changeCartContentGlobally(cartContent))
        }
    };

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
            {cartContent && cartContent.totalCartValue !== 0 && cartContent.createdAt ? (
                <>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <div>
                        {cartContent.aboutProductsInCart.map((p: CheckCart, index: number) => (
                            <ProductInCart key={p.productId} product={p} />
                        ))}
                        <p>{cartContent.createdAt.toString()}</p>
                        
                    </div>
                    <button type="submit" onClick={handleOrder}>Order</button>
                </>
            ) : (
                <p>Koszyk jest pusty</p>
            )}
        </div>
    );
};
