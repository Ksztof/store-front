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
