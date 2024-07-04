import React, { useState } from 'react';
import { Products } from "../../components/Products";
import styles from './MainPage.module.scss';
import { FaShoppingCart, FaSlidersH, FaTimes } from 'react-icons/fa';
import { Cart } from '../../components/cart/Cart';

export const Main = () => {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

    const toggleCart = () => {
        if (isFiltersOpen)
            setIsFiltersOpen(false);
        setIsCartOpen(!isCartOpen);
    };

    const toggleFilters = () => {
        if (isCartOpen)
            setIsCartOpen(false);
        setIsFiltersOpen(!isFiltersOpen);
    };

    const closeOption = () => {
        if (isCartOpen)
            setIsCartOpen(false);
        else
            setIsFiltersOpen(false);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.optionsBar}>
                <div className={`${styles.showCartButton} ${isCartOpen ? styles.optionBarOpen : ''}`} onClick={toggleCart}>
                    <FaShoppingCart className={styles.cartLogo} />
                    {isCartOpen && <FaTimes className={styles.closeLogo} />}
                </div>
                <div className={`${styles.showFiltersButton} ${isFiltersOpen ? styles.optionBarOpen : ''}`} onClick={toggleFilters}>
                    <FaSlidersH className={styles.filtersLogo} />
                    {isFiltersOpen && <FaTimes className={styles.closeLogo} />}
                </div>
            </div>
            <div className={
                `
                ${styles.cartAndFiltersContainer} 
                ${isCartOpen ? styles.cartContentOpen : ''}
                ${isFiltersOpen ? styles.filtersContentOpen : ''}
                `
            }>
                <button className={styles.closeButton} onClick={closeOption}><FaTimes className={`${styles.closeButtonLogo} ${isCartOpen || isFiltersOpen ? styles.optionOpen : ''}`} /></button>
                <div className={styles.cartContent}>
                    <Cart />
                </div>
                <div className={styles.filtersContent}>
                    <p>filters</p>
                </div>
            </div>
            <div className={`${styles.productsContainer} ${isCartOpen || isFiltersOpen ? styles.leftBarOpen : ''}`}>
                <Products />
            </div>
        </div>
    );
};

export default Main;
