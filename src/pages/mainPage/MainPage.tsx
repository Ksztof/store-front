import React, { useState } from 'react';
import { Products } from "../../components/Products";
import styles from './MainPage.module.scss';
import { FaFilter, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { Cart } from '../../components/cart/Cart';

export const Main = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const toggleFilters = () => {
        setIsFiltersOpen(!isFiltersOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const closeFilters = () => {
        setIsFiltersOpen(false);
    };

    return (
        <div className={styles.mainContainer}>
            {!isCartOpen && (
                <div className={styles.optionsCartSection} onClick={toggleCart}>
                        <FaShoppingCart size={15}/>
                </div>
            )}
            {!isFiltersOpen && (
                <div className={styles.optionsFiltersSection} onClick={toggleFilters}>
                   <FaFilter size={15}/>
                </div>
            )}
            <div className={`${styles.cartAndFiltersContainer} ${(isCartOpen || isFiltersOpen) ? styles.open : styles.closed}`}>
                <div className={`${styles.cartContent} ${isCartOpen ? styles.visible : styles.hidden}`}>
                    <div className={styles.closeButtonWrapper}>
                        <button className={styles.closeButton} onClick={closeCart}><FaTimes size={15} /></button>
                    </div>
                    <Cart />
                </div>
                <div className={`${styles.filtersContent} ${isFiltersOpen ? styles.visible : styles.hidden}`}>
                    <div className={styles.closeButtonWrapper}>
                        <button className={styles.closeButton} onClick={closeFilters}><FaTimes size={15} /></button>
                    </div>
                    <p>filters</p>
                </div>
            </div>
            <div className={`${styles.productsContainer} ${(isCartOpen || isFiltersOpen) ? styles.cartOpen : styles.collapsed}`}>
                <Products />
            </div>
        </div>
    );
};

export default Main;