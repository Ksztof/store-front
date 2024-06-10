import React from 'react';
import { MethodOfPayment } from '../types/orderTypes';
import { PaymentMethodSelectorProps } from '../props/orderProps';

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ setPaymentMethod }) => {

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const method = event.target.value as MethodOfPayment;
        setPaymentMethod(method);
    };

    return (
        <div>
            <h1>Choose your payment method</h1>

            <label>
                <input type="radio"
                    name="paymentMethod" 
                    onChange={handleRadioChange}
                    value={MethodOfPayment.Card} 
                />
                Card payment
            </label>
            <label>
                <input type="radio"
                    name="paymentMethod" 
                    onChange={handleRadioChange}
                    value={MethodOfPayment.OnDelivery} 
                />
                Pay on delivery
            </label>
        </div>
    );
};

export default PaymentMethodSelector;