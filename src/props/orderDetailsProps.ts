import { OrderDetailsInitialValues } from "../types/orderTypes";

export interface OrderDetailsProps {
    setOrderDetails: (value: Partial<OrderDetailsInitialValues>) => void;
}