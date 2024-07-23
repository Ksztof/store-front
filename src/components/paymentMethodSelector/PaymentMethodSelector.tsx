import React from 'react';
import { MethodOfPayment } from '../../types/orderTypes';
import { PaymentMethodSelectorProps } from '../../props/orderProps';
import styles from './PaymentMethodSelector.module.scss';

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ setPaymentMethod }) => {

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const method = event.target.value as MethodOfPayment;
        setPaymentMethod(method);
    };

    return (
        <div className={styles.methodSelectorContainer}>
            <div className={styles.header}>Choose payment method:</div>
            <div className={styles.methods}>
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
        </div>
    );
};

export default PaymentMethodSelector;