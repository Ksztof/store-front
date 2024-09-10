import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { clearCartApi, getCartContentApi, setCurrentCartApi, saveCartContentApi } from './cartService';
import { modifyProductInCartQuantity, mapAboutCartToNewProductsForApi, deleteProduct, decreaseProductInCartQuantity, getCartWithNewProduct, increaseProductInCartQuantity } from './cartUtils';
import { isGuestUser } from '../shared/cookies/cookiesUtils';
import { isApiError, isNoContentResponse } from '../shared/validation/typeGuards/typeGuardsUtils';
import { addProductToCartPayload } from '../product/productTypes';
import { RootState, AppDispatch } from '../shared/redux/store';
import { ApiError, NoContentApiResponse, OkApiResponse } from '../shared/sharedTypes';
import { AboutCart, checkCurrentCartPayload, addProductToReduxStorePayload, AdjustProductQuantityPayload, increaseProductInCartQuantityStorePayload, AdjustProductQuantityType, ChangeProductInCartQuantityPayload, ModifyProductInCartQuantityPayload, NewProductsForApi, RenderPhase } from './cartTypes';
import { deleteProductPayload } from '../cart/cartTypes'

const getCartData = (state: RootState) => state.cart.cartData;

export const getCartContent = createAsyncThunk<
  void | AboutCart,
  void,
  { rejectValue: ApiError | string }
>(
  'cart/getCartContent',
  async (_, { rejectWithValue }) => {
    try {
      const response: NoContentApiResponse | OkApiResponse<AboutCart> | ApiError = await getCartContentApi();

      if (isApiError(response)) {
        return rejectWithValue(response);
      }

      if (isNoContentResponse(response)) {
        return;
      }

      return response.entity;
    } catch (error: any) {
      console.error("getCartContent error: ", error);
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
        const response: NoContentApiResponse | OkApiResponse<AboutCart> | ApiError = await setCurrentCartApi(payload);

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
    'cart/addProductToCart ',
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

export const saveCartContent = createAsyncThunk<
  void | AboutCart,
  AboutCart,
  { rejectValue: ApiError | string }>(
    'cart/saveCartContent',
    async (payload: AboutCart, { rejectWithValue }) => {
      try {
        const newProductsForApi: NewProductsForApi = mapAboutCartToNewProductsForApi(payload);
        const response: NoContentApiResponse | OkApiResponse<AboutCart> | ApiError = await saveCartContentApi(newProductsForApi);

        if (isApiError(response)) {
          return rejectWithValue(response);
        }

        if (isNoContentResponse(response)) {

          return;
        }

        return response.entity;
      } catch (error: any) {
        console.error("saveCartContent error: ", error);
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

    const mount: boolean = renderPhase === RenderPhase.Mount;
    const cartShouldBeSynchronized: boolean = isCartEmpty && isUserOrGuest && cartContent.createdAt.trim() === "" && mount;
    const cartShouldBeSynchronizedOrUpdated: boolean = !isCartEmpty && isUserOrGuest && cartContent.createdAt.trim() === "" && mount;
    const currentCartShouldBeCheckedSaved: boolean = isUserOrGuest && cartContent.createdAt.trim() !== "" && !isCartEmpty && mount;
    const shouldCartBeSaved: boolean = !isUserOrGuest && !isCartEmpty && mount;
    const currentCartShouldBeCheckedCleared: boolean = isCartEmpty && isUserOrGuest && cartContent.createdAt.trim() !== "" && mount;

    if (cartShouldBeSynchronized) {
      await dispatch(getCartContent());
    };

    if (cartShouldBeSynchronizedOrUpdated) {
      const result: void | AboutCart = await dispatch(getCartContent()).unwrap();

      if (result === undefined) {
        await dispatch(saveCartContent(cartContent));
      }
    };

    if (currentCartShouldBeCheckedSaved) {
      const result: void | AboutCart = await dispatch(setCurrentCart()).unwrap();

      if (result === undefined && !isCartSaved) {
        await dispatch(saveCartContent(cartContent));
      }
    }

    if (shouldCartBeSaved) {
      await dispatch(saveCartContent(cartContent));
    }

    if (currentCartShouldBeCheckedCleared) {
      const result: void | AboutCart = await dispatch(setCurrentCart()).unwrap();

      if (result === undefined && !isCartCleared) {
        await dispatch(clearCart());
      }
    }

    const unmount: boolean = renderPhase === RenderPhase.Unmount;
    const cartShouldBeSavedUnmount: boolean = (!isCartEmpty && !isCartSaved) || (!isCartEmpty && !isUserOrGuest) && unmount;
    const cartShouldBeClearedUnmount: boolean = !isCartCleared && isCartEmpty && isUserOrGuest && unmount;

    if (cartShouldBeSavedUnmount) {
      await dispatch(saveCartContent(cartContent))
    }

    const updatedState: RootState = getState();
    isLoggedIn = updatedState.auth.isLoggedIn;
    isUserOrGuest = isLoggedIn || isGuestUser();

    if (cartShouldBeSavedUnmount) {
      await dispatch(saveCartContent(cartContent))
    }

    if (cartShouldBeClearedUnmount) {
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
