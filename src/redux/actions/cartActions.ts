import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCartContent, saveCartContent } from '../../api/cartService';
import { AboutCart, AdjustProductQuantityPayload, AdjustProductQuantityType, ChangeProductInCartQuantityPayload, NewProductsForApi } from '../../types/cartTypes';
import { addCartContentToLocStor, addProductToLocStor, changeProductInCartQuantityLs, clearCartContentInLocStor, decreaseProductInCartQuantityLs, getProductsFromLocStor, increaseProductInCartQuantityLs, mapAboutCartToNewProductsForApi } from '../../utils/cartUtils';
import { ProductPayloadCart, ProductPayloadLocStor } from '../../types/productTypes';
import { ApiResponse, ErrorContent } from '../../types/apiResponseTypes';
import { isApiError } from '../../utils/responseUtils';
import { prepareProductForCart } from '../../utils/productUtils';

export const synchronizeCartWithApi = createAsyncThunk<AboutCart, void, { rejectValue: string | undefined }
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
        return response.entity;
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
          increaseProductInCartQuantityLs(payload.productId);
        } else{
          decreaseProductInCartQuantityLs(payload.productId);
        }

        const updatedCart: AboutCart | null = getProductsFromLocStor();
        if(updatedCart === null){
          return rejectWithValue("There is nothing to adjust, because cart doesn't exist");
        }
        return updatedCart;
      } catch (error: unknown){
        console.error("Unexpected error:", error);
        return rejectWithValue("Cannot adjust product quantity, because of unexpected error occured");
      }
    }
  );

  export const changeProductInCartQuantity = createAsyncThunk<
  AboutCart | null, 
  ChangeProductInCartQuantityPayload,
  {rejectValue: string | undefined}>(
    'cart/changeProductInCartQuantity',
    async(payload: ChangeProductInCartQuantityPayload, {rejectWithValue}) => {
      try{
        changeProductInCartQuantityLs(payload.productId, payload.productQuantity);
        const updatedCart: AboutCart | null = getProductsFromLocStor();
        if(updatedCart === null){
          return rejectWithValue("Cannot change product in cart quantity, cart doesn't exist");
        }

        return updatedCart;
      }catch(error: unknown){
        console.error("Unexpected error:", error);
        return rejectWithValue("Cannot change product in cart quantity, because of unexpected error occured");
      }
    }
  )

  export const changeCartContentGlobally = createAsyncThunk<
  AboutCart, 
  AboutCart,
  {rejectValue: string | undefined}>(
    'cart/changeCartContentGlobally',
    async(payload: AboutCart, {rejectWithValue}) => {
      try{
        const newProductsForApi: NewProductsForApi = mapAboutCartToNewProductsForApi(payload);
        const response: ApiResponse<AboutCart> = await saveCartContent(newProductsForApi);
        if (isApiError(response)) {
          const error: ErrorContent = response.error;
          return rejectWithValue("Error code: " + error.code + " " + "Error description: " + error.description);
        } else {
          clearCartContentInLocStor();
          addCartContentToLocStor(response.entity);
          return response.entity;
        }
      } catch (error: unknown) {
        console.error("Unexpected error:", error);
        return rejectWithValue("Api cannot be updated with new cart content, an unexpected error occurred");
      }
    }
  );
