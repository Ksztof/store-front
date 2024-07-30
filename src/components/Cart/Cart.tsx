import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { AppDispatch, RootState } from '../../redux/store';
import { AboutCart, CheckCart, RenderPhase } from '../../types/cartTypes';
import { ProductInCart } from '../productInCart/ProductInCart';
import { synchronizeCart } from '../../redux/actions/cartActions';
import styles from './Cart.module.scss';

export const Cart: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isCartEmpty: boolean = useSelector((state: RootState) => state.cart.isEmpty);

    useEffect(() => {
        console.log("1111111")
        dispatch(synchronizeCart(RenderPhase.Mount));

        return () => {
            console.log("2222222222")

            dispatch(synchronizeCart(RenderPhase.Unmount));
        };
    }, [isLoggedIn]);

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
