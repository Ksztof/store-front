import React, { useEffect, useState } from 'react';
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
    const isCartEmpty: boolean = useSelector((state: RootState) => state.cart.isEmpty);
    const isCartSaved: boolean = useSelector((state: RootState) => state.cart.isCartSaved);

    useEffect(() => {
        dispatch(synchronizeCart(RenderPhase.Mount));
        console.log("mounteeeed");
    }, [ dispatch])

    useEffect(() => {
        return () => {
            console.log("unmounteeeeed");
            dispatch(synchronizeCart(RenderPhase.Unmount));
        };
    }, [dispatch]);

   
    
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
