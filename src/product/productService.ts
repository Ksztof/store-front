import axios, { HttpStatusCode } from 'axios';
import { OkApiResponse, NoContentApiResponse, ApiError } from '../shared/sharedTypes';
import { isProductDetails, isProblemDetails } from '../shared/validation/typeGuards/typeGuardsUtils';
import { ProductDetails } from './productTypes';

axios.defaults.withCredentials = true;

export const getAllProducts = async (): Promise<OkApiResponse<ProductDetails[]> | NoContentApiResponse | ApiError> => {
  try {
    const response: ProductDetails[] | any =
      await axios.get<ProductDetails[]>('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/Products');

    if (isProductDetails(response.data)) {
      const responseDetails: OkApiResponse<ProductDetails[]> = { isSuccess: true, entity: response.data };
      return responseDetails;
    }

    if (response.status === HttpStatusCode.NoContent) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };
      return responseDetails;
    }

    throw new Error("Unexpected Http status code received from API when downloading products");
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };
      return apiError;
    }

    throw new Error(`Failed to get all products because of unexpected error, with message: ${error.message}`);
  };
};