import React from 'react';
import { MethodOfPayment, OrderResponse, OrderSummaryProps } from '../types/orderTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { OrderedProducts } from './orderedProducts/OrderedProducts';
import { CheckCart } from '../types/cartTypes';

export const OrderSummary: React.FC<OrderSummaryProps> = ({ paymentMethod }) => {
    const orderSummary: OrderResponse = useSelector((state: RootState) => state.order.orderData);

    return (
        <div>
            <h1>Order Summary</h1>
            <p>Order ID: {orderSummary.id}</p>
            <p>Total Amount: {orderSummary.totalCartValue}</p>
            <p>
                Payment status: {paymentMethod === MethodOfPayment.Card ? (
                    <>Paid</>
                ) : (
                    <>Payment upon delivery</>
                )}
            </p>
            <p>Products</p>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderSummary.aboutProductsInCart.map((product: CheckCart) => (
                            <OrderedProducts key={product.productId} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderSummary;