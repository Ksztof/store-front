import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCartContent } from '../../api/cartService';
import { AboutCart, AdjustProductQuantityPayload, AdjustProductQuantityType } from '../../types/cartTypes';
import { addCartContentToLocStor, addProductToLocStor, getProductsFromLocStor } from '../../utils/cartUtils';
import { ProductPayloadCart, ProductPayloadLocStor } from '../../types/productTypes';
import { ApiResponse, ErrorContent } from '../../types/apiResponseTypes';
import { isApiError } from '../../utils/responseUtils';
import { decreaseQuantity, increaseQuantity, prepareProductForCart } from '../../utils/productUtils';

export const synchronizeCartWithApi = createAsyncThunk<void, void, { rejectValue: string | undefined }
>(
  'cart/synchronizeCartWithApi  ',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse<AboutCart> = await getCartContent();

      if (isApiError(response)) {
        const error: ErrorContent = response.error;
        return rejectWithValue("Error code: " + error.code + " " + "Error description: " + error.description);
      } else {
        addCartContentToLocStor(response.entity);
      }
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      return rejectWithValue("The contents of the shopping cart cannot be downloaded, an unexpected error occurred");
    }
  }
);

export const addProductToCart = createAsyncThunk<
  AboutCart | null,
  ProductPayloadCart,
  { rejectValue: string | undefined}>(
    'cart/addProduct ',
    async (payload: ProductPayloadCart, { rejectWithValue }) => {
      try {
        const product: ProductPayloadLocStor | undefined  = prepareProductForCart(payload);
        if(typeof(product) === 'undefined'){
          return rejectWithValue("product values ​​are incorrect");
        }
        console.log("product.product"+product.product+ "new product.quantity" +product.quantity);
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
  { rejectValue: string | undefined}>(
    'cart/adjustProductQuantity',
    async(payload: AdjustProductQuantityPayload, {rejectWithValue}) => {
      try{
        if(payload.operationType === AdjustProductQuantityType.Increase){
          increaseQuantity(payload.productId);
        } else{
          decreaseQuantity(payload.productId);
        }

        const updatedCart: AboutCart | null = getProductsFromLocStor();
        if(updatedCart === null){
          return rejectWithValue("There is nothing to adjust, because cart doesn't exist");
        }
        return updatedCart;
      } catch (error: unknown){
        console.error("Unexpected error:", error);
        return rejectWithValue("Cannot ajust product quantity, because unexpecter error occured");
      }
    }
  );
