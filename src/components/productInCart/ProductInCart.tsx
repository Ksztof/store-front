import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { AdjustProductQuantityType, CheckCart, ProductInCartProps } from "../../types/cartTypes";
import { adjustProductQuantity, changeProductInCartQuantity } from "../../redux/actions/cartActions";
import styles from './ProductInCart.module.scss';
import productImg from '../../pictures/kielbasa.jpg'
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import React from 'react';

export const ProductInCart: React.FC<ProductInCartProps> = (props) => {
    const dispatch = useAppDispatch();
    const product: CheckCart = props.product;
    const [inputValue, setInputValue] = useState(product.quantity.toString());

    useEffect(() => {
        setInputValue(product.quantity.toString());
    }, [product.quantity]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleBlur = () => {
        const quantity = parseInt(inputValue, 10);
        if (isNaN(quantity) || quantity < 1 || quantity > 1000 || product.quantity > 1000) {
            setInputValue(product.quantity.toString());

            dispatch(changeProductInCartQuantity({ productId: product.productId, productQuantity: product.quantity }));
        } else {
            dispatch(changeProductInCartQuantity({ productId: product.productId, productQuantity: quantity }));
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleBlur();
        }
    };
    
    return (
        <div className={styles.productInCartContainer} key={product.productId}>
            <div className={styles.imageContainer}>
                <img className={styles.img} src={productImg} alt="prodImg" loading="lazy" />
            </div>
            <div className={styles.summaryContainer}>
                <div className={styles.summaryTitle}>
                    <FaCaretLeft className={styles.quantityLeftArrow} onClick={() => dispatch(adjustProductQuantity({ productId: product.productId, operationType: AdjustProductQuantityType.Decrease }))} />
                    <input
                        type="number"
                        min="1"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={inputValue}
                        autoComplete='off'
                        onKeyDown={handleKeyPress}
                    />
                    <FaCaretRight className={styles.quantityRightArrow} onClick={() => dispatch(adjustProductQuantity({ productId: product.productId, operationType: AdjustProductQuantityType.Increase }))} />
                    <div className={styles.productName}>
                        <div className={styles.nameWriting}>x {product.productName} </div>
                    </div>
                </div>
                <div className={styles.totalSummary}>
                    <p className={styles.totalTitle}>Product total: {product.productTotalPrice} zł</p>
                    <p className={styles.unitPriceInfo}>unit price: <br></br> {product.productUnitPrice} zł</p>
                </div>
            </div>
        </div>
    );
};