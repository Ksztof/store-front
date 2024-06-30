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
            <div className={styles.optionsCartSection}>
                <div className={styles.cartLogo}>
                    <FaShoppingCart size={15} />
                </div>
            </div>
            <div className={styles.optionsFiltersSection}>
                <p>F</p>
            </div>

            <div className={styles.cartFiltersContainer}>
                <div className={styles.cartContent}>
                    <Cart />
                </div>
                <div className={styles.filtersContent}>
                    <p>fitlers</p>
                </div>
            </div>

            <div className={`${styles.productsContainer} ${isCartOpen ? styles.cartOpen : styles.cartCollapsed}`}>
                <Products />
            </div>
        </div>
    );
}

            /* <div className={styles.optionsBar}> */
            /* </div> */
