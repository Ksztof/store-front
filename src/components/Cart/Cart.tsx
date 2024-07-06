import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../redux/store';
import { AboutCart, CheckCart } from '../../types/cartTypes';
import { isGuestUser } from '../../utils/cookiesUtils';
import { ProductInCart } from '../productInCart/ProductInCart';
import { synchronizeCartWithApi, setCurrentCart, changeCartContentGlobally } from '../../redux/actions/cartActions';
import styles from './Cart.module.scss';

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
        <>
            {cartContent && cartContent.totalCartValue !== 0 ? (
                <>
                    {cartContent.aboutProductsInCart.map((p: CheckCart) => (
                        <ProductInCart key={p.productId} product={p} />
                    ))}
                    <p>{cartContent.createdAt.toString()}</p>

                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>

                    <button type="submit" onClick={handleOrder}>Order</button>
                </>
            ) : (
                <div>
                    <p>Koszyk jest pusty</p>
                </div>
            )}
        </>
    );
};
