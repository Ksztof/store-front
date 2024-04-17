import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProductToLocStor, getProductsFromLocStor } from '../../utils/cartUtills';
import { ProductPayload } from '../../types/productTypes';
import { AboutCart, CheckCart } from '../../types/cartTypes';

export const addProductToRedStor = createAsyncThunk<
    AboutCart | null,
    ProductPayload,
    {
        rejectValue: string
    }
>(
    'cartLocStor/addProduct ',
    async (payload: ProductPayload, { rejectWithValue }) => {
        try {
            addProductToLocStor(payload.product, payload.quantity);

            const updatedCart: AboutCart | null = getProductsFromLocStor();

            return updatedCart;
        } catch (error: any) {
            console.error(error);

            return rejectWithValue("Can't update cart");
        }
    }
);