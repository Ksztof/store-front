import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCombinedCartToLocStor, addProductToLocStor, getProductsFromLocStor } from '../../utils/cartUtills';
import { ProductPayload } from '../../types/productTypes';
import { AboutCart, CheckCart } from '../../types/cartTypes';

export const addCombinedCartRedStor = createAsyncThunk<
    AboutCart,
    AboutCart,
    {
        rejectValue: string
    }
>(
    'combinedCart/addCombinedCart',
    async ( payload: AboutCart, { rejectWithValue }) => {
        try {
            addCombinedCartToLocStor(payload);

            return payload;
        } catch (error: any) {
            console.error(error);

            return rejectWithValue("Can't add combined cart to local storage");
        }
    }
);