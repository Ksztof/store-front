import axios from "axios";
import { ApiResponseWithEmpty } from "../types/apiResponseWithEmpty";
import { isErrorContent } from "../utils/responseUtils";
import { PaymentDetails } from "../types/paymentTypes";

axios.defaults.withCredentials = true;

export const payUsingCard = async (paymentDetails: PaymentDetails): Promise<ApiResponseWithEmpty<void>> => {
    try {
        const response = await axios.post('https://localhost:5004/api/Payments', paymentDetails);

        if (response.status === 204) {
            return {
              isSuccess: true,
              isEmpty: true
            };
          }

        const data = response.data;

        if (isErrorContent(data)) {
            return {
                isSuccess: false,
                error: data
            };

        } else {
            throw new Error("Invalid API response format");
        }
    } catch (error) {
        throw new Error("Failed to retrive information about payment because of unexpected error");
    }
}