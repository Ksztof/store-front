import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AboutCart, CheckCart } from '../types/cartTypes';
import { useAppDispatch } from '../hooks';
import { changeCartContentGlobally, setCurrentCart, synchronizeCartWithApi } from '../redux/actions/cartActions';
import { ProductInCart } from './ProductInCart';
import { isGuestUser } from '../utils/cookiesUtils';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartDetails.aboutCart);
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (
            (!cartContent && isLoggedIn)
             || (!cartContent && isGuestUser())) {
            dispatch(synchronizeCartWithApi());
        } else if(
            (cartContent && isLoggedIn)
             || (cartContent && isGuestUser())){
            dispatch(setCurrentCart());
        } else {

        }
    }, [isLoggedIn, cartContent, dispatch]);
    
    const handleOrder = () => {
        if (cartContent !== null) {
            navigate('/order');
        }
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
            {cartContent && cartContent.totalCartValue !== 0 ? (
                <>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <div>
                        {cartContent.aboutProductsInCart.map((p: CheckCart) => (
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
