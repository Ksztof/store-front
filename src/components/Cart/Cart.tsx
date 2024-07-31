import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { AppDispatch, RootState } from '../../redux/store';
import { AboutCart, CheckCart, RenderPhase } from '../../types/cartTypes';
import { ProductInCart } from '../productInCart/ProductInCart';
import { clearCart, synchronizeCart } from '../../redux/actions/cartActions';
import styles from './Cart.module.scss';
import { isGuestUser } from '../../utils/cookiesUtils';

export const Cart: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isCartEmpty: boolean = useSelector((state: RootState) => state.cart.isEmpty);
    //const [hasBeenMounted, setHasBeenMounted] = useState<boolean>(false);

    useEffect(() => {
            dispatch(synchronizeCart(RenderPhase.Mount));
        
        return () => {
            dispatch(synchronizeCart(RenderPhase.Unmount));
        };
    }, []);

    useEffect(() => {
        if((isCartEmpty && isGuestUser()) || (isCartEmpty && isLoggedIn )){
            dispatch(clearCart());
        }
    }, [isCartEmpty, isLoggedIn, dispatch])

    

    return (
        <>
            {cartContent && cartContent.totalCartValue !== 0 ? (
                <>
                    {cartContent.aboutProductsInCart.map((p: CheckCart) => (
                        <ProductInCart key={p.productId} product={p} />
                    ))}
                </>
            ) : (
                <div className={styles.emptyInfo}>
                    <h2>Cart is empty</h2>
                </div>
            )}
        </>
    );
};
