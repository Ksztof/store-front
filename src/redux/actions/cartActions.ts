import { createAction, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { checkCurrentCart, clearCartApi, getCartContent, saveCartContent } from '../../api/cartService';
import { AboutCart, AdjustProductQuantityPayload, AdjustProductQuantityType, ChangeProductInCartQuantityPayload, NewProductsForApi, checkCurrentCartPayload, ModifyProductInCartQuantityPayload, addProductToReduxStorePayload, increaseProductInCartQuantityStorePayload, RenderPhase, deleteProductPayload } from '../../types/cartTypes';
import { addProductToCartPayload } from '../../types/productTypes';
import { isApiError, isNoContentResponse } from '../../utils/responseUtils';
import { AppDispatch, RootState } from '../store';
import { decreaseProductInCartQuantity, getCartWithNewProduct, increaseProductInCartQuantity } from '../../utils/localStorageUtils';
import { deleteProduct, mapAboutCartToNewProductsForApi, needSynchronization, needToClearCart, needToSetCurrentCart } from '../../utils/cartUtils';
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
        console.log(`Payload for  checkCurrentCart: ${JSON.stringify(payload)}`)
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
    let isLoggedIn: boolean = state.auth.isLoggedIn;
    const cartContent: AboutCart = state.cart.cartData;
    const isCartCleared: boolean = state.cart.isCartCleared;
    const isCartSaved: boolean = state.cart.isCartSaved;
    let isUserOrGuest: boolean = isLoggedIn || isGuestUser();

    if (isCartEmpty && isUserOrGuest && cartContent.createdAt.trim() === "" && renderPhase === RenderPhase.Mount) {
      console.log("synchronizeCartWithApi");
      await dispatch(synchronizeCartWithApi());
    };

    if (!isCartEmpty && isUserOrGuest && cartContent.createdAt.trim() === "" && renderPhase === RenderPhase.Mount) {
      console.log("synchronizeCartWithApi with cartContent");
      const result: void | AboutCart = await dispatch(synchronizeCartWithApi()).unwrap();

      if (result === undefined) {
        await dispatch(changeCartContentGlobally(cartContent));
        console.log("synchronizeCartWithApi with cartContent ADDING TO DATABASE");
      }
    };

    if (isUserOrGuest && cartContent.createdAt.trim() !== "" && !isCartEmpty && renderPhase === RenderPhase.Mount) {
      console.log("setCurrentCart");
      const result: void | AboutCart = await dispatch(setCurrentCart()).unwrap();
      if (result === undefined && !isCartSaved) {
        console.log("additional cart saving after setting cart");
        await dispatch(changeCartContentGlobally(cartContent));
      }
    }

    if (!isUserOrGuest && !isCartEmpty && renderPhase === RenderPhase.Mount) {
      console.log("changeCartContentGlobally for new user");

      await dispatch(changeCartContentGlobally(cartContent));
    }

    if (isCartEmpty && isUserOrGuest && cartContent.createdAt.trim() !== "" && renderPhase === RenderPhase.Mount) {
      console.log("setting empty cart")
      const result: void | AboutCart = await dispatch(setCurrentCart()).unwrap();

      console.log(`needToClearCart result: ${result}`)
      if (result === undefined && !isCartCleared) {
        console.log("cartClearing");
        await dispatch(clearCart());
      }


    }

    if (!isCartEmpty && !isCartSaved && renderPhase === RenderPhase.Unmount) {
      console.log("changeCartContentGlobally")
      await dispatch(changeCartContentGlobally(cartContent))
    }
    const updatedState: RootState = getState();
    isLoggedIn = updatedState.auth.isLoggedIn;
    isUserOrGuest = isLoggedIn || isGuestUser();

    if (!isCartEmpty && !isUserOrGuest && renderPhase === RenderPhase.Unmount) {
      console.log("changeCartContentGlobally")
      await dispatch(changeCartContentGlobally(cartContent))
    }

    if (!isCartCleared && isCartEmpty && isUserOrGuest && renderPhase === RenderPhase.Unmount) {
      console.log("clear at unmount");
      await dispatch(clearCart());
    }
  }
);

export const deleteProductFromCart = createAsyncThunk<
  AboutCart,
  { productId: number },
  { state: RootState, rejectValue: string | undefined }>(
    'cart/deleteProductFromCart',
    async ({ productId }, { getState, rejectWithValue }) => {
      try {
        const currentCartContent: AboutCart | null = getCartData(getState());

        if (currentCartContent) {
          const deleteProductPayload: deleteProductPayload = {
            cartContent: currentCartContent,
            productId: productId
          }
          
          const modifiedCartContent: AboutCart = deleteProduct(deleteProductPayload);
          return modifiedCartContent;
        }

        return rejectWithValue("Cart content not found");
      } catch (error: unknown) {
        console.error("deleteProductFromCart Unexpected error:", error);
        return rejectWithValue("Cannot delete product from cart, because unexpected error occured");
      }
    }
  )

export const resetCart = createAction('cart/reset');
