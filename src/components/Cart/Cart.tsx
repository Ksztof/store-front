import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../redux/store';
import { AboutCart, CheckCart } from '../../types/cartTypes';
import { isGuestUser } from '../../utils/cookiesUtils';
import { ProductInCart } from '../ProductInCart';
import { synchronizeCartWithApi, setCurrentCart, changeCartContentGlobally } from '../../redux/actions/cartActions';

export const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (
            (!cartContent && isLoggedIn)
            || (!cartContent && isGuestUser())
            || (cartContent.createdAt.trim() === "" && isLoggedIn)
            || (cartContent.createdAt.trim() === "" && isGuestUser())
        ) {
            dispatch(synchronizeCartWithApi());
        } else if (
            (cartContent && isLoggedIn)
            || (cartContent && isGuestUser())) {
            dispatch(setCurrentCart());
        } else {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, dispatch]);

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
                <div>
                    <p>Koszyk jest pusty</p>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
            <p>Koszyk jest pusty</p>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>

                    
                </div>
            )}
        </div>
    );
};
