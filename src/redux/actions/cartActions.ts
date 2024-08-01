import { createAction, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { checkCurrentCart, clearCartApi, getCartContent, saveCartContent } from '../../api/cartService';
import { AboutCart, AdjustProductQuantityPayload, AdjustProductQuantityType, ChangeProductInCartQuantityPayload, NewProductsForApi, checkCurrentCartPayload, ModifyProductInCartQuantityPayload, addProductToReduxStorePayload, increaseProductInCartQuantityStorePayload, RenderPhase } from '../../types/cartTypes';
import { addProductToCartPayload } from '../../types/productTypes';
import { isApiError, isNoContentResponse } from '../../utils/responseUtils';
import { AppDispatch, RootState } from '../store';
import { decreaseProductInCartQuantity, getCartWithNewProduct, increaseProductInCartQuantity } from '../../utils/localStorageUtils';
import { mapAboutCartToNewProductsForApi, needSynchronization, needToClearCart, needToSetCurrentCart } from '../../utils/cartUtils';
import { modifyProductInCartQuantity } from "../../utils/cartUtils";
import { NoContentApiResponse } from '../../types/noContentApiResponse';
import { OkApiResponse } from '../../types/okApiResponse';
import { ApiError } from '../../types/errorTypes';
import { isGuestUser } from '../../utils/cookiesUtils';

const getCartData = (state: RootState) => state.cart.cartData;

export const synchronizeCartWithApi = createAsyncThunk<
  void | AboutCart,
  void,
  { rejectValue: ApiError | string }
>(
  'cart/synchronizeCartWithApi',
  async (_, { rejectWithValue }) => {
    try {
      const response: NoContentApiResponse | OkApiResponse<AboutCart> | ApiError = await getCartContent();

      if (isApiError(response)) {
        return rejectWithValue(response);
      }

      if (isNoContentResponse(response)) {
        return;
      }

      return response.entity;
    } catch (error: any) {
      console.error("SynchronizeCartWithApi error: ", error);
      return rejectWithValue("The contents of the shopping cart cannot be downloaded, an unexpected error occurred");
    }
  }
);

export const setCurrentCart = createAsyncThunk<
  void | AboutCart,
  void,
  { state: RootState, rejectValue: ApiError | string }
>(
  'cart/setCurrentCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const cartCreationDate: string | undefined = getCartData(getState())?.createdAt;

      if (cartCreationDate !== undefined) {
        const payload: checkCurrentCartPayload = { createdAt: cartCreationDate };
        const response: NoContentApiResponse | OkApiResponse<AboutCart> | ApiError = await checkCurrentCart(payload);

        if (isApiError(response)) {
          return rejectWithValue(response);
        }

        if (isNoContentResponse(response)) {
          return;
        }

        return response.entity;
      }
    } catch (error: any) {
      console.error("setCurrentCart error: ", error);
      return rejectWithValue("Failed to retrive information about current cart content because of unexpected error");
    }
  }
);

export const addProductToCart = createAsyncThunk<
  AboutCart,
  addProductToCartPayload,
  { state: RootState, rejectValue: string | undefined }>(
    'cart/addProduct ',
    async (payload: addProductToCartPayload, { getState, rejectWithValue }) => {
      try {
        const currentCartContent: AboutCart = getCartData(getState());

        if (currentCartContent !== null) {
          const addProductPayload: addProductToReduxStorePayload = {
            cartContent: currentCartContent,
            newProduct: payload.product,
            newProductQuantity: payload.quantity
          }

          const updatedCart: AboutCart = getCartWithNewProduct(addProductPayload);
          return updatedCart;
        } else {
          return rejectWithValue("Cannot add product to cart, cart doesn't exsist");
        }
      } catch (error: any) {
        console.error("addProductToCart error: ", error);
        return rejectWithValue("Cannot update the shopping cart, an unexpected error occurred");
      }
    }
  );

export const adjustProductQuantity = createAsyncThunk<
  AboutCart,
  AdjustProductQuantityPayload,
  { state: RootState, rejectValue: string | undefined }>(
    'cart/adjustProductQuantity',
    async (payload: AdjustProductQuantityPayload, { getState, rejectWithValue }) => {
      try {
        const currentCartContent: AboutCart = getCartData(getState());
        const changeQuantityPayload: increaseProductInCartQuantityStorePayload = {
          productId: payload.productId,
          cartContent: currentCartContent,
        }

        if (payload.operationType === AdjustProductQuantityType.Increase) {
          const updatedCart: AboutCart = increaseProductInCartQuantity(changeQuantityPayload);
          return updatedCart;
        } else {
          const updatedCart: AboutCart = decreaseProductInCartQuantity(changeQuantityPayload);
          return updatedCart;
        }
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
        const currentCartContent: AboutCart | null = getCartData(getState());

        if (currentCartContent) {
          const modifyProductInCartQuantityPayload: ModifyProductInCartQuantityPayload = {
            productId: payload.productId,
            productQuantity: payload.productQuantity,
            aboutCart: (currentCartContent)
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
  void | AboutCart,
  AboutCart,
  { rejectValue: ApiError | string }>(
    'cart/changeCartContentGlobally',
    async (payload: AboutCart, { rejectWithValue }) => {
      try {
        const newProductsForApi: NewProductsForApi = mapAboutCartToNewProductsForApi(payload);
        const response: NoContentApiResponse | OkApiResponse<AboutCart> | ApiError = await saveCartContent(newProductsForApi);

        if (isApiError(response)) {
          return rejectWithValue(response);
        }

        if (isNoContentResponse(response)) {

          return;
        }

        return response.entity;
      } catch (error: any) {
        console.error("changeCartContentGlobally error: ", error);
        return rejectWithValue("Failed to update cart content globally, because of unexpected error");
      }
    }
  );

export const clearCart = createAsyncThunk<
  void,
  void,
  { rejectValue: ApiError | string }
>(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      console.log("CART CLEARED");

      const response: NoContentApiResponse | ApiError = await clearCartApi();

      if (isApiError(response)) {
        return rejectWithValue(response);
      }

      if (isNoContentResponse(response)) {
        return;
      }
    } catch (error: any) {
      console.error("clearCart error:", error);
      return rejectWithValue(`Unexpected error occured while clearing cart with message: ${error.message}`);
    }
  }
);

export const synchronizeCart = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch, state: RootState }
>(
  'cart/synchronizeCart',
  async (renderPhase: string, { dispatch, getState }) => {
    const state: RootState = getState();
    const isCartEmpty: boolean = state.cart.isEmpty;
    const isLoggedIn: boolean = state.auth.isLoggedIn;
    const cartContent: AboutCart = state.cart.cartData;
    const isCartCleared: boolean = state.cart.isCartCleared;
    const isCartSaved: boolean = state.cart.isCartSaved;

    if (needSynchronization(isLoggedIn, cartContent) && renderPhase === RenderPhase.Mount) {
      console.log("synchronizeCartWithApi");
      await dispatch(synchronizeCartWithApi());
    };

    if (needToSetCurrentCart(isCartEmpty, isLoggedIn) && renderPhase === RenderPhase.Mount) {
      console.log("setCurrentCart");
      const result: void | AboutCart = await dispatch(setCurrentCart()).unwrap();
      if(result === undefined && !isCartSaved){
        console.log("additional cart saving after setting cart");

        await dispatch(changeCartContentGlobally(cartContent));
      }
    }

    if (needToClearCart(isCartEmpty, isLoggedIn, cartContent) && renderPhase === RenderPhase.Mount && !isCartCleared) {
      console.log("needToClearCart");
      const result: void | AboutCart = await dispatch(setCurrentCart()).unwrap();

      console.log(`needToClearCart result: ${result}`)
      if (result === undefined) {
        await dispatch(clearCart());
      }
    }

    if (!isCartEmpty && !isLoggedIn && !isGuestUser() && renderPhase === RenderPhase.Mount) {
      console.log("changeCartContentGlobally")
      await dispatch(changeCartContentGlobally(cartContent))
    }

    if (!isCartEmpty && !isCartSaved && renderPhase === RenderPhase.Unmount) {
      console.log("changeCartContentGlobally")
      await dispatch(changeCartContentGlobally(cartContent))
    }

    if (needToClearCart(isCartEmpty, isLoggedIn, cartContent) && renderPhase === RenderPhase.Unmount && !isCartCleared){
      await dispatch(clearCart());
    }
  }
);

export const resetCart = createAction('cart/reset');
