import axios, { HttpStatusCode } from 'axios';
import { AboutCart, NewProductsForApi, checkCurrentCartPayload } from './cartTypes';
import { isAboutCart, isProblemDetails } from '../shared/validation/typeGuards/typeGuardsUtils';
import { NoContentApiResponse, OkApiResponse, ApiError } from '../shared/sharedTypes';

axios.defaults.withCredentials = true;

export const getCartContentApi = async (): Promise<NoContentApiResponse | OkApiResponse<AboutCart> | ApiError> => {
  try {
    const response: AboutCart | any =
      await axios.get<AboutCart>('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/Carts', {});

    if (response.status === HttpStatusCode.NoContent) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };

      return responseDetails;
    }

    if (isAboutCart(response.data)) {
      const responseDetails: OkApiResponse<AboutCart> = { isSuccess: true, entity: response.data };

      return responseDetails;
    }

    throw new Error("Unexpected Http status code received from API when getting cart content");
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {

      const apiError: ApiError = { isSuccess: false, error: data };

      return apiError;
    }

    throw new Error(`Failed to get cart content because of unexpected error with message: ${error.message}`);
  };
};

export const saveCartContentApi = async (cartContent: NewProductsForApi): Promise<NoContentApiResponse | OkApiResponse<AboutCart> | ApiError> => {
  try {
    const response: AboutCart | any =
      await axios.put<AboutCart>('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/Carts', cartContent);

    if (response.status === HttpStatusCode.NoContent) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };

      return responseDetails;
    }

    if (isAboutCart(response.data)) {
      const responseDetails: OkApiResponse<AboutCart> = { isSuccess: true, entity: response.data };

      return responseDetails;
    }

    throw new Error("Unexpected Http status code received from API when saving cart content");
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      console.error(`Failed to save cart content with message: ${error.message}`);

      const apiError: ApiError = { isSuccess: false, error: data };

      return apiError;
    }

    console.error(`Failed to save cart content with message: ${error.message}`);
    throw new Error(`Failed to save cart content because of unexpected error, with message: ${error.message}`);
  };
};

export const setCurrentCartApi = async (payload: checkCurrentCartPayload): Promise<NoContentApiResponse | OkApiResponse<AboutCart> | ApiError> => {
  try {
    const response: AboutCart | any =
      await axios.post<AboutCart>('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/Carts/check-current-cart', payload);

    if (response.status === HttpStatusCode.NoContent) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };

      return responseDetails;
    }

    if (isAboutCart(response.data)) {
      const responseDetails: OkApiResponse<AboutCart> = { isSuccess: true, entity: response.data };

      return responseDetails;
    }

    throw new Error("Unexpected Http status code received from API when checking current cart");
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };

      return apiError;
    }

    throw new Error(`Failed to check current cart because of unexpected error with message: ${error.message}`);
  };
};

export const clearCartApi = async (): Promise<NoContentApiResponse | ApiError> => {
  try {
    const response: void | any =
      await axios.delete('https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/api/Carts', {});

    if (response.status === HttpStatusCode.NoContent) {
      const responseDetails: NoContentApiResponse = { isSuccess: true, isEmpty: true };

      return responseDetails;
    }

    throw new Error("Unexpected Http status code received from API while clearing cart");
  } catch (error: any) {
    const data = error.response?.data;

    if (isProblemDetails(data)) {
      const apiError: ApiError = { isSuccess: false, error: data };

      return apiError;
    }

    throw new Error(`Failed to clear cart because of unexpected error with message: ${error.message}`);
  };
};