import { ProductInCartProps, CheckCart, AdjustProductQuantityType } from "../../../cart/cartTypes";
import styles from './OrderedProduct.module.scss';
import productImg from '../../pictures/kielbasa.png'
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useState, useEffect } from "react";
import React from 'react';
import { changeProductInCartQuantity, adjustProductQuantity } from "../../../cart/cartActions";
import { AppDispatch } from "../../../shared/redux/store";


export const OrderedProduct: React.FC<ProductInCartProps> = (props) => {
    const product: CheckCart = props.product;
    const dispatch: AppDispatch = useAppDispatch();

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
        <div className={styles.orderedProduct}>
            <div className={`${styles.imageContainer} ${styles.cell}`}>
                <img className={styles.img} src={productImg} alt="prodImg" loading="lazy" />
            </div>
            <div className={styles.cell}>
                {product.productName}
            </div>
            <div className={`${styles.quantityCell} ${styles.cell}`}>
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
            </div>
            <div className={styles.cell}>{product.productUnitPrice} zł</div>
            <div className={styles.cell}>{product.productTotalPrice} zł</div>
        </div>
    );
}
