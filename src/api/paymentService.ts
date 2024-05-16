import axios from "axios";

axios.defaults.withCredentials = true;

export const submitPayment = async (paymentMethodId: string, amount: number) => {
    try {
        const response = await axios.post('http://yourserver.com/api/payments', {
            paymentMethodId: paymentMethodId,
            amount: amount
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting payment:', error);
        throw error;
    }
};