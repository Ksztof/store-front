import React, { useEffect, useState } from 'react';
import { Products } from "../../components/Products";
import styles from './MainPage.module.scss';
import { FaFilter, FaShoppingCart, FaSlidersH, FaTimes } from 'react-icons/fa';
import { Cart } from '../../components/cart/Cart';

export const Main = () => {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
    const [cartAndFilterOpen, setCartAndFilterOpen] = useState<boolean>(false);

    useEffect(() => {
        const areBothOpen: boolean = isCartOpen && isFiltersOpen ? true : false;
        setCartAndFilterOpen(areBothOpen);
    }, [isCartOpen, isFiltersOpen]);

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
            <div className={styles.optionsBar}>
                <div className={`${styles.optionsCartSection} ${isCartOpen || isFiltersOpen ? styles.optionBarOpen : ''}`} onClick={toggleCart}>
                    <FaShoppingCart className={styles.cartLogo}  />
                </div>
                <div className={`${styles.optionsFiltersSection} ${isCartOpen || isFiltersOpen ? styles.optionBarOpen : ''}`} onClick={toggleFilters}>
                    <FaSlidersH className={styles.filtersLogo}  />
                </div>
            </div>
            <div className={styles.cartAndFiltersContainer}>
                <div className={styles.cartContent}>
                    <div className={styles.closeButtonWrapper}>
                        <button className={styles.closeButton} onClick={closeCart}><FaTimes size={15} /></button>
                    </div>
                    <Cart />
                </div>
                {/* <div className={styles.filtersContent}>
                    <div className={styles.closeButtonWrapper}>
                        <button className={styles.closeButton} onClick={closeFilters}><FaTimes size={15} /></button>
                    </div>
                    <p>filters</p>
                </div> */}
            </div>
            <div className={styles.productsContainer}>
                <Products />
            </div>
        </div>
    );
};

export default Main;
// /${(isCartOpen || isFiltersOpen) ? styles.open : styles.closed}


// return (
//     <div className={styles.mainContainer}>
//         {!isCartOpen && (
//             <div className={styles.optionsCartSection} onClick={toggleCart}>
//                 <FaShoppingCart size={15} />
//             </div>
//         )}
//         {!isFiltersOpen && (
//             <div className={styles.optionsFiltersSection} onClick={toggleFilters}>
//                 <FaFilter size={15} />
//             </div>
//         )}
//         <div>
            
//         </div>
//         <div className={`${styles.cartAndFiltersContainer}  ${cartAndFilterOpen ? styles.bothOpen : ''}`}>
//             <div className={`${styles.cartContent} ${isCartOpen ? styles.visible : styles.hidden}`}>
//                 <div className={styles.closeButtonWrapper}>
//                     <button className={styles.closeButton} onClick={closeCart}><FaTimes size={15} /></button>
//                 </div>
//                 <Cart />
//             </div>
//             <div className={`${styles.filtersContent} ${isFiltersOpen ? styles.visible : styles.hidden}`}>
//                 <div className={styles.closeButtonWrapper}>
//                     <button className={styles.closeButton} onClick={closeFilters}><FaTimes size={15} /></button>
//                 </div>
//                 <p>filters</p>
//             </div>
//         </div>
//         <div className={`${styles.productsContainer} ${(isCartOpen || isFiltersOpen) ? styles.cartOpen : styles.collapsed}`}>
//             <Products />
//         </div>
//     </div>
// );
// };