import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { AdjustProductQuantityType, CheckCart, ProductInCartProps } from "../../cartTypes";
import styles from './ProductInCart.module.scss';
import React from 'react';
import productImg from '../../../shared/pictures/kielbasa.png'
import { FaCaretLeft, FaCaretRight, FaTimes } from "react-icons/fa";
import { deleteProductFromCart, adjustProductQuantity, changeProductInCartQuantity } from "../../cartActions";

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

    const handleDeleteProductFromCart = async () => {
        await dispatch(deleteProductFromCart({ productId: product.productId }));
    };

    const handleAdjustProductQuantity = async (operationType: AdjustProductQuantityType) => {
        await dispatch(adjustProductQuantity({ productId: product.productId, operationType: operationType }));
    }

    const handleBlur = async () => {
        const quantity = parseInt(inputValue, 10);
        if (isNaN(quantity) || quantity < 1 || quantity > 1000 || product.quantity > 1000) {
            setInputValue(product.quantity.toString());
            await dispatch(changeProductInCartQuantity({ productId: product.productId, productQuantity: product.quantity }));
        } else {
            await dispatch(changeProductInCartQuantity({ productId: product.productId, productQuantity: quantity }));
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
                    <FaCaretLeft className={styles.quantityLeftArrow} onClick={() => handleAdjustProductQuantity(AdjustProductQuantityType.Decrease)} />
                    <input
                        type="number"
                        min="1"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={inputValue}
                        autoComplete='off'
                        onKeyDown={handleKeyPress}
                    />
                    <FaCaretRight className={styles.quantityRightArrow} onClick={() => handleAdjustProductQuantity(AdjustProductQuantityType.Increase)} />
                    <div className={styles.productName}>
                        <div className={styles.nameWriting}>x {product.productName} </div>
                    </div>
                    <div className={styles.deletProductIcon} onClick={() => handleDeleteProductFromCart()}><FaTimes /></div>
                </div>
                <div className={styles.totalSummary}>
                    <p className={styles.unitPriceInfo}>unit price:  {product.productUnitPrice} zł</p>
                    <p className={styles.totalTitle}>Product total: {product.productTotalPrice} zł</p>
                </div>
            </div>
        </div>
    );
};