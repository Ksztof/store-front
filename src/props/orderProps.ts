import { MethodOfPayment, ShippingDetails } from "../types/orderTypes";

export interface ShippingDetailsProps {
    handleSetShippingDetails: (value: Partial<ShippingDetails>) => void;
    setIsFormValid: (value: boolean) => void;
}

export interface PaymentMethodSelectorProps {
    setPaymentMethod: (method: MethodOfPayment) => void;
}