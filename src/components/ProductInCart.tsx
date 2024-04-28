import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { AdjustProductQuantityType, CheckCart, ProductInCartProps } from "../types/cartTypes";
import { adjustProductQuantity, changeProductInCartQuantity } from "../redux/actions/cartActions";

export const ProductInCart: React.FC<ProductInCartProps> = (productProps) => {
    const dispatch = useAppDispatch();
    const product = productProps.product;
    const [inputValue, setInputValue] = useState(product.quantity.toString());
    useEffect(() => {
        setInputValue(product.quantity.toString());
      }, [product.quantity]);
      
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleBlur = () => {
        const quantity = parseInt(inputValue, 10);
        if (isNaN(quantity) || quantity < 1) {
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
        <div key={product.productId}>
            <p>productName: {product.productName}</p>
            <p>manufacturer: {product.manufacturer}</p>
            <p>quantity: {product.quantity}</p>
            <p>unit price: {product.productUnitPrice}</p>
            <p>total price: {product.productTotalPrice}</p>
            <button onClick={() => dispatch(adjustProductQuantity({ productId: product.productId, operationType: AdjustProductQuantityType.Decrease }))}>-</button>
            <button onClick={() => dispatch(adjustProductQuantity({ productId: product.productId, operationType: AdjustProductQuantityType.Increase }))}>+</button>
            <input
                type="number"
                min="1"
                onChange={handleInputChange}
                onBlur={handleBlur}
                value={inputValue}
                autoComplete='off'
                onKeyDown={handleKeyPress}
            />
            <p></p>
        </div>
    );
};