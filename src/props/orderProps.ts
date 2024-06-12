import { MethodOfPayment, ShippingDetails } from "../types/orderTypes";

export interface ShippingDetailsFormProps {
    handleSetShippingDetails: (value: Partial<ShippingDetails>) => void;
    setIsFormValid: (value: boolean) => void;
}

export interface PaymentMethodSelectorProps {
    setPaymentMethod: (method: MethodOfPayment) => void;
}