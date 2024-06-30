import React, { useState } from 'react';
import { Products } from "../../components/Products";
import { Cart } from '../../components/Cart/Cart';
import styles from './MainPage.module.scss';
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa';

export const Main = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const toggleFilters = () => {
        setIsFiltersOpen(!isFiltersOpen);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.optionsCartSection} onClick={toggleCart}>
                <div className={styles.cartLogo}>
                    <FaShoppingCart size={15} />
                </div>
            </div>
            <div className={styles.optionsFiltersSection} onClick={toggleFilters}>
                <p>F</p>
            </div>
            <div className={`${styles.cartFiltersContainer} ${(isCartOpen || isFiltersOpen) ? styles.open : styles.closed}`}>
                <div className={`${styles.cartContent} ${!isCartOpen ? styles.hidden : ''}`}>
                    <Cart />
                </div>
                <div className={`${styles.filtersContent} ${!isFiltersOpen ? styles.hidden : ''}`}>
                    <p>filters</p>
                </div>
            </div>
            <div className={`${styles.productsContainer} ${(isCartOpen || isFiltersOpen) ? styles.cartOpen : styles.cartCollapsed}`}>
                <Products />
            </div>
        </div>
    );
};

export default Main;