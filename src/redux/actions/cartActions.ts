import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkCurrentCart, getCartContent, saveCartContent } from '../../api/cartService';
import { AboutCart, AdjustProductQuantityPayload, AdjustProductQuantityType, ChangeProductInCartQuantityPayload, NewProductsForApi, checkCurrentCartPayload, ModifyProductInCartQuantityPayload } from '../../types/cartTypes';
import { ProductPayloadCart, ProductPayloadLocStor } from '../../types/productTypes';
import { ApiResponse, ErrorContent } from '../../types/apiResponseTypes';
import { isApiError, isApiSuccessEmpty } from '../../utils/responseUtils';
import { prepareProductForCart } from '../../utils/productUtils';
import { RootState } from '../store';
import { addCartContentToLocStor, addProductToLocStor, clearCartContentInLocStor, decreaseProductInCartQuantityLs, getProductsFromLocStor, increaseProductInCartQuantityLs } from '../../utils/localStorageUtils';
import { mapAboutCartToNewProductsForApi } from '../../utils/cartUtils';
import { modifyProductInCartQuantity } from "../../utils/cartUtils";

export const synchronizeCartWithApi = createAsyncThunk<AboutCart | null, void, { rejectValue: string | undefined }
>(
  'cart/synchronizeCartWithApi',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse<AboutCart> = await getCartContent();
      if (isApiError(response)) {
        const error: ErrorContent = response.error;
        return rejectWithValue("Error code: " + error.code + " " + "Error description: " + error.description);
      }
      else if (isApiSuccessEmpty(response)) {
        return null;
      } else {
        //addCartContentToLocStor(response.entity);
        return response.entity;
      }
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      return rejectWithValue("The contents of the shopping cart cannot be downloaded, an unexpected error occurred");
    }
  }
);

export const setCurrentCart = createAsyncThunk<AboutCart | null, void, { state: RootState, rejectValue: string | undefined }
>(
  'cart/setCurrentCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState();
      const cartCreationDate: string | undefined = state.cart.cartDetails.aboutCart?.createdAt;
      if (cartCreationDate !== undefined) {
        const payload: checkCurrentCartPayload = { createdAt: cartCreationDate };

        const response: ApiResponse<AboutCart> = await checkCurrentCart(payload);

        if (isApiError(response)) {
          const error: ErrorContent = response.error;
          return rejectWithValue("Error code: " + error.code + " " + "Error description: " + error.description);
        }
        else if (isApiSuccessEmpty(response)) {
          return null;
        } else {
          return response.entity;
        }
      }
      else {
        return rejectWithValue('Invalid cart creation date');
      }
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      return rejectWithValue("Failed to retrive information about cart content because of unexpected error");
    }
  }
);

export const addProductToCart = createAsyncThunk<
  AboutCart | null,
  ProductPayloadCart,
  { rejectValue: string | undefined }>(
    'cart/addProduct ',
    async (payload: ProductPayloadCart, { rejectWithValue }) => {
      try {
        const product: ProductPayloadLocStor | undefined = prepareProductForCart(payload);
        if (typeof (product) === 'undefined') {
          return rejectWithValue("product values ​​are incorrect");
        }
        addProductToLocStor(product.product, product.quantity);

        const updatedCart: AboutCart | null = getProductsFromLocStor();

        return updatedCart;
      } catch (error: unknown) {
        console.error("Unexpected error:", error);
        return rejectWithValue("Cannot update the shopping cart, an unexpected error occurred");
      }
    }
  );

export const adjustProductQuantity = createAsyncThunk<
  AboutCart | null,
  AdjustProductQuantityPayload,
  { rejectValue: string | undefined }>(
    'cart/adjustProductQuantity',
    async (payload: AdjustProductQuantityPayload, { rejectWithValue }) => {
      try {
        if (payload.operationType === AdjustProductQuantityType.Increase) {
          increaseProductInCartQuantityLs(payload.productId);
        } else {
          decreaseProductInCartQuantityLs(payload.productId);
        }

        const updatedCart: AboutCart | null = getProductsFromLocStor();
        if (updatedCart === null) {
          return rejectWithValue("There is nothing to adjust, because cart doesn't exist");
        }
        return updatedCart;
      } catch (error: unknown) {
        console.error("Unexpected error:", error);
        return rejectWithValue("Cannot adjust product quantity, because of unexpected error occured");
      }
    }
  );

export const changeProductInCartQuantity = createAsyncThunk<
  AboutCart,
  ChangeProductInCartQuantityPayload,
  { state: RootState, rejectValue: string | undefined }>(
    'cart/changeProductInCartQuantity',
    async (payload: ChangeProductInCartQuantityPayload, { getState, rejectWithValue }) => {
      try {
        const state: RootState = getState();
        const currentCartContent: AboutCart | null = state.cart.cartDetails.aboutCart;
        if(currentCartContent){
          const modifyProductInCartQuantityPayload: ModifyProductInCartQuantityPayload = {
            productId: payload.productId,
            productQuantity: payload.productQuantity,
            aboutCart: currentCartContent
          }

          const changedCartContent: AboutCart = modifyProductInCartQuantity(modifyProductInCartQuantityPayload);
          
          return changedCartContent;
        } else {
          return rejectWithValue("Cannot change product in cart quantity, because cart is empty.");
        }
      } catch (error: unknown) {
        console.error("Unexpected error:", error);
        return rejectWithValue("Cannot change product in cart quantity, because of unexpected error occured");
      }
    }
  )

export const changeCartContentGlobally = createAsyncThunk<
  AboutCart | null,
  AboutCart,
  { rejectValue: string | undefined }>(
    'cart/changeCartContentGlobally',
    async (payload: AboutCart, { rejectWithValue }) => {
      try {
        const newProductsForApi: NewProductsForApi = mapAboutCartToNewProductsForApi(payload);
        const response: ApiResponse<AboutCart> = await saveCartContent(newProductsForApi);
        if (isApiError(response)) {
          const error: ErrorContent = response.error;
          return rejectWithValue("Error code: " + error.code + " " + "Error description: " + error.description);
        } else if (isApiSuccessEmpty(response)) {
          return null;
        } else {
          return response.entity;
        }
      } catch (error: unknown) {
        console.error("Unexpected error:", error);
        return rejectWithValue("Api cannot be updated with new cart content, an unexpected error occurred");
      }
    }
  );
