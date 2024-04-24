import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AboutCart, AdjustProductQuantityType, CheckCart } from '../types/cartTypes';
import { useAppDispatch } from '../hooks';
import { adjustProductQuantity, changeProductInCartQuantity, synchronizeCartWithApi } from '../redux/actions/cartActions';
import { isCartExistLocStor } from '../utils/cartUtils';

export const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartContent: AboutCart | null = useSelector((state: RootState) => state.cart.cartContent.products);

    // Użycie funkcji wewnętrznej do generacji komponentów produktów
    const ProductInput = ({ product }: { product: CheckCart }) => {
        const [inputValue, setInputValue] = useState(product.quantity.toString());

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value); // Aktualizacja stanu lokalnego
        };

        const handleBlur = () => {
            const quantity = parseInt(inputValue, 10);
            if (isNaN(quantity) || quantity < 1) {
                dispatch(changeProductInCartQuantity({ productId: product.productId, productQuantity: product.quantity }));
            } else {
                dispatch(changeProductInCartQuantity({ productId: product.productId, productQuantity: quantity }));
            }
        };

        const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Zablokuj domyślną akcję, aby uniknąć niechcianego zachowania formularza
                handleBlur(); // Wywołanie funkcji handleBlur do przetworzenia danych
            }
        };
        return (
            <input
                type="number"
                min="1"
                onChange={handleInputChange}
                onBlur={handleBlur}
                value={inputValue}
                autoComplete='off'
                onKeyDown={handleKeyPress}
            />
        );
    };

    useEffect(() => {
        let cartExistInLocalStorage = isCartExistLocStor();
        if (!cartExistInLocalStorage) {
            dispatch(synchronizeCartWithApi());
        }
    }, []);

    return (
        <div style={{
            width: '300px',
            height: 'auto',
            backgroundColor: 'lightgrey',
            border: '1px solid black',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px',
            padding: '20px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
        }}>
            <h4 style={{ textAlign: 'center' }}>Koszyk</h4>
            {cartContent ? (
                <>
                    <h5>Wartość koszyka: {cartContent.totalCartValue} zł</h5>
                    <div>
                        {cartContent.aboutProductsInCart.map((p: CheckCart, index: number) => (
                            <div key={p.productId + index}>
                                <p>productName: {p.productName}</p>
                                <p>manufacturer: {p.manufacturer}</p>
                                <p>quantity: {p.quantity}</p>
                                <ProductInput product={p} />
                                <p>unit price: {p.productUnitPrice}</p>
                                <p>total price: {p.productTotalPrice}</p>
                                <button onClick={() => dispatch(adjustProductQuantity({ productId: p.productId, operationType: AdjustProductQuantityType.Decrease }))}>-</button>
                                <button onClick={() => dispatch(adjustProductQuantity({ productId: p.productId, operationType: AdjustProductQuantityType.Increase }))}>+</button>
                                <p></p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Koszyk jest pusty</p>
            )}
        </div>
    );
};
