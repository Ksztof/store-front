import { OrderDetails } from "../types/orderTypes";

export interface ShippingDetailsProps {
    handleSetOrderDetails: (value: Partial<OrderDetails>) => void;
    setIsFormValid: (value: boolean) => void;
}