import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { ProductProps } from "../../productProps";
import styles from './Product.module.scss';
import productImg from '../../pictures/kielbasa.png'
import { Currency } from "../../../shared/sharedTypes";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import React from 'react';
import { addProductToCart } from "../../../cart/cartActions";
import { RootState } from "../../../shared/redux/store";
import { ProductDetails } from "../../productTypes";

export const Product: React.FC<ProductProps> = ({ productId }) => {
    const dispatch = useAppDispatch();
    const currency: string = Currency.PLN;
    const [productQuantity, setProductQuantity] = useState<number | string>(1);
    const product: ProductDetails | undefined = useSelector((state: RootState) => state.product.productsData.find((p: ProductDetails) => p.id === productId));
    const [productQuantityNum, setProductQuantityNum] = useState<number>(1);

    useEffect(() => {
        if (productQuantity === '') {
            setProductQuantityNum(1);
        }
        if (typeof (productQuantity) === "number" && productQuantity < 1000) {
            setProductQuantityNum(productQuantity);
        }

    }, [productQuantity]);


    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;

        if (value === '') {
            setProductQuantity('');
            return;
        }

        const parsedValue: number = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue > 0 && parsedValue < 1000) {
            setProductQuantity(parsedValue);
        }
    };

    const increaseQuantity = () => {
        setProductQuantity((prevQuantity) => {
            const quantity = typeof prevQuantity === 'number' ? prevQuantity : parseInt(prevQuantity, 10);
            if (isNaN(quantity)) {
                return 1;
            }
            return quantity + 1;
        });
    };

    const decreaseQuantity = () => {
        setProductQuantity((prevQuantity) => {
            const quantity = typeof prevQuantity === 'number' ? prevQuantity : parseInt(prevQuantity, 10);
            if (isNaN(quantity) || quantity <= 1) {
                return 1;
            }
            return quantity - 1;
        });
    };

    if (!product) return null;

    return (
        <div className={styles.productContainer}>
            <div className={styles.imageContainer}>
                <img className={styles.img} src={productImg} alt="prodImg" loading="lazy" />
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.nameContainer}>
                    <h2 className={styles.productName}>{product.name}</h2>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.productPrice}>
                        <span className={styles.price}>{product.price}</span>
                        <span className={styles.currency}>{currency}</span>
                    </div>

                    <div className={styles.quantityContainer}>
                        <FaCaretLeft className={styles.quantityLeftArrow} onClick={decreaseQuantity} />
                        <input
                            type="number"
                            onChange={handleQuantityChange}
                            value={productQuantity}
                        />
                        <FaCaretRight className={styles.quantityRightArrow} onClick={increaseQuantity} />
                    </div>
                    <div className={styles.addBtnContainer}>
                        <button onClick={() =>
                            dispatch(addProductToCart({ product: product, quantity: productQuantityNum }))}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};