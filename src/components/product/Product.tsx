import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ProductDetails } from "../../types/productTypes";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { addProductToCart } from "../../redux/actions/cartActions";
import { ProductProps } from "../../props/productProps";
import styles from './Product.module.scss';
import productImg from '../../pictures/kielbasa.jpg'
import { Currency } from "../../types/sharedTypes";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export const Product: React.FC<ProductProps> = ({ productId }) => {
    const dispatch = useAppDispatch();
    const currency: string = Currency.PLN;
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const product: ProductDetails | undefined = useSelector((state: RootState) => state.product.productsData.find((p: ProductDetails) => p.id === productId));

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        const parsedValue: number = parseInt(value);
        if (!isNaN(parsedValue) && parsedValue > 0 && parsedValue < 100) {
            setProductQuantity(parsedValue);
        }
    };

    const increaseQuantity = () => {
        setProductQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setProductQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
    };

    if (!product) return null; //???

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
                            dispatch(addProductToCart({ product: product, quantity: productQuantity }))}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};