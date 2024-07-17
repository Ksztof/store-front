import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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



    return (
        <>
            {cartContent && cartContent.totalCartValue !== 0 ? (
                <>
                    {cartContent.aboutProductsInCart.map((p: CheckCart) => (
                        <ProductInCart key={p.productId} product={p} />
                    ))}
                    <p>{cartContent.createdAt.toString()}</p>

                </>
            ) : (
                <div className={styles.emptyInfo}>
                    <h2>Cart is empty</h2>
                </div>
            )}
        </>
    );
};
