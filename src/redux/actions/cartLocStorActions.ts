import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProductToLocStor, getProductsFromLocStor } from '../../utils/cartUtills';
import { ProductPayload } from '../../types/productTypes';
import { CheckCart } from '../../types/cartTypes';

export const addProductToRedStor = createAsyncThunk<
    CheckCart[],
    ProductPayload,
    {
        rejectValue: string
    }
>(
    'cartLocStor/addProduct ',
    async (ProductPayload, { rejectWithValue }) => {
        try {
            addProductToLocStor(ProductPayload.product, ProductPayload.quantity);

            const updatedCart = getProductsFromLocStor();

            return updatedCart;
        } catch (error: any) {
            console.error(error);

            return rejectWithValue("Can't update cart");
        }
    }
);