import React, { useEffect, useState } from 'react';
import { Products } from "../../components/products/Products";
import styles from './MainPage.module.scss';
import { FaShoppingCart, FaSlidersH, FaTimes } from 'react-icons/fa';
import { Cart } from '../../components/cart/Cart';
import { useSelector } from 'react-redux';
import { AboutCart } from '../../types/cartTypes';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks';
import { changeCartContentGlobally } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
    const isCartEmpty: boolean = useSelector((state: RootState) => state.cart.isEmpty);
    const cartContent: AboutCart = useSelector((state: RootState) => state.cart.cartData);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOrder = () => {
        if (cartContent !== null) {
            dispatch(changeCartContentGlobally(cartContent))
            navigate('/order');
        };
    };
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

    useEffect(() => {
        console.log("is null: "+ cartContent.aboutProductsInCart === null);
    },[cartContent]);

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
                <div className={styles.cartHeader}>
                    <div className={styles.cartHeaderTitle}>Cart</div>
                    <div className={styles.cartHeaderContent}>
                        {cartContent && cartContent.totalCartValue !== 0 ? `Total: ${cartContent.totalCartValue} zł` : '0 zł'}
                    </div>
                </div>
                <div className={styles.cartContent}>
                    <Cart />
                    <div className={`${styles.cartFooter} ${isCartEmpty ? styles.empty : ''}`}>
                        <button type="submit" onClick={handleOrder}>Order</button>
                    </div>
                </div>
                <div className={styles.filtersContent}>
                    <p>filters</p>
                </div>
            </div>
            <div className={`${styles.searchBar} ${isCartOpen || isFiltersOpen ? styles.leftBarOpen : ''}`}></div>
            <div className={`${styles.productsContainer} ${isCartOpen || isFiltersOpen ? styles.leftBarOpen : ''}`}>
                <Products />
            </div>
        </div>
    );
};

export default Main;
