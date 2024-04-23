import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AboutCart, AdjustProductQuantityType, CheckCart } from '../types/cartTypes'; // Upewnij się, że importujesz odpowiedni typ
import { useAppDispatch } from '../hooks';
import { adjustProductQuantity, changeProductInCartQuantity, synchronizeCartWithApi  } from '../redux/actions/cartActions';
import { isCartExistLocStor } from '../utils/cartUtils';

export const Cart: React.FC = () => {
    const dispatch = useAppDispatch();

    const cartContent: AboutCart | null = useSelector((state: RootState) => state.cart.cartContent.products);
     const handleQuantityChange = (productId: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let quantity: number = parseInt(value, 10);
        quantity = isNaN(quantity) || quantity <= 0 ? 1 : quantity;
        if (value === '') {
            return;
        }
        if(!isNaN(quantity) && quantity > 0){
            dispatch(changeProductInCartQuantity({productId: productId, productQuantity: quantity}));
        } else {
            dispatch(changeProductInCartQuantity({ productId: productId, productQuantity: 1 }));
        }
     };
     
    useEffect(() => {
        let cartExistInLocalStorage = isCartExistLocStor();
        if(!cartExistInLocalStorage){
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
                        {cartContent.aboutProductsInCart.map((p: CheckCart, index: number) => {
                            return <div key={p.productId + index}>
                                <p>productName: {p.productName}</p>
                                <p>manufacturer: {p.manufacturer}</p>
                                <p>quantity: {p.quantity}</p>
                                <input
                                    type="number"
                                    min="1"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityChange(p.productId, event)}
                                    value={p.quantity}
                                    autoComplete='off'
                                />
                                <p>unit price: {p.productUnitPrice}</p>
                                <p>total price: {p.productTotalPrice}</p>
                                <button onClick={() => dispatch(adjustProductQuantity({productId: p.productId, operationType: AdjustProductQuantityType.Decrease}))}>-</button>
                                <button onClick={() => dispatch(adjustProductQuantity({productId: p.productId, operationType: AdjustProductQuantityType.Increase}))}>+</button>
                                <p></p>
                            </div>
                        })}
                    </div>
                </>
            ) : (
                <p>Koszyk jest pusty</p>
            )}
        </div>
    );
};
