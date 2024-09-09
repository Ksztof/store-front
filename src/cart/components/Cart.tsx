import React, { useEffect } from 'react';
import { ProductInCart } from "../../product/components/productInCart/ProductInCart";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { AboutCart, RenderPhase, CheckCart } from "../cartTypes";
import styles from './Cart.module.scss'
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../shared/redux/store';
import { synchronizeCart } from '../cartActions';

export const Cart: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);
   
    useEffect(() => {
        dispatch(synchronizeCart(RenderPhase.Mount));
    }, [ dispatch])

    useEffect(() => {
        return () => {
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



