import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AboutCart, AdjustProductQuantityType, CheckCart } from '../types/cartTypes'; // Upewnij się, że importujesz odpowiedni typ
import { useAppDispatch } from '../hooks';
import { adjustProductQuantity, synchronizeCartWithApi  } from '../redux/actions/cartActions';
import { isCartExistLocStor } from '../utils/cartUtils';
import { decreaseQuantity, increaseQuantity } from '../utils/productUtils';

export const Cart: React.FC = () => {
    const dispatch = useAppDispatch();

    const cartContent: AboutCart | null = useSelector((state: RootState) => state.cart.cartContent.products);

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
