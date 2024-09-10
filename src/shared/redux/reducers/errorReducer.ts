import { createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { ApiError, ErrorState } from '../../sharedTypes';

const initialState: ErrorState = {
    error: null,
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        clearError: (state: ErrorState) => {
            state.error = null;
        },
        addError: (state, action: PayloadAction<ApiError | string | undefined>) => {
            if (action.payload) {
                state.error = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action: PayloadAction<ApiError | string | undefined>) => isRejectedWithValue(action),
            (state, action: PayloadAction<ApiError | string | undefined>) => {
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = 'An unknown error occurred';
                }
            }
        );
    },
});

export const { clearError, addError } = errorSlice.actions;
export default errorSlice.reducer;
