import { OrderDetailsInitialValues } from "../types/orderTypes";

export interface OrderDetailsProps {
    handleSetOrderDetails: (value: Partial<OrderDetailsInitialValues>) => void;
    setIsFormValid: (value: boolean) => void;
}