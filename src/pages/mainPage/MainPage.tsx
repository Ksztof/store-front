import React, { useState } from 'react';
import { Products } from "../../components/Products";
import { Cart } from '../../components/Cart/Cart';
import styles from './MainPage.module.scss';
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa';

export const Main = () => {
    const [isCartOpen, setIsCartOpen] = useState(true);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.optionsBar}>
                <div className={styles.optionsCartSection}>
                    <div className={styles.cartLogo}>
                        <FaShoppingCart size={25} />
                    </div>
                </div>
                <div className={styles.optionsFiltersSection}>

                </div>
            </div>

            <div className={`${styles.cartContainer} ${isCartOpen ? '' : styles.collapsed}`}>
                <div className={styles.cartContent}>
                    <Cart />
                </div>
            </div>
            <div className={`${styles.productsContainer} ${isCartOpen ? styles.cartOpen : styles.cartCollapsed}`}>
                <Products />
            </div>
        </div>
    );
}