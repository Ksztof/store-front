import { shippingDetailsInitialValues } from "../initialValues/orderInitials";
import WrappedStripeCheckout from "./stripeCheckout/StripeCheckout";

export const TestComponent: React.FC = () => {

    return (
        <div>
            <h1>test</h1>            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <WrappedStripeCheckout amount={1} orderDetails={shippingDetailsInitialValues} isFormValid={true}/>

        </div>
    );
};

export default TestComponent;