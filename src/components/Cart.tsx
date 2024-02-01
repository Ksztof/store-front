import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from '../hooks';
import { checkCart } from "../redux/actions/cartActions";
import { useEffect } from "react";

export const CartForm = () => {
    const cartContent = useSelector((state: RootState) => state.cart.cartData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkCart())
    }, []);

    return (
        <div style={{
            width: '300px', 
            height: '200px',
            backgroundColor: 'lightgrey', 
            border: '1px solid black', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '20px', 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word'
        }}>
            <h4 style={{textAlign: 'center'}}>Koszyk</h4>
            <h5>{JSON.stringify(cartContent)}</h5> 
        </div>
    );
};

export default CartForm;
