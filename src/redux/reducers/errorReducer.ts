import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { ApiError, ErrorState } from '../../types/errorTypes';

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
    },
    extraReducers: (builder) => {
        builder
            .addMatcher((action: Action) => action.type.endsWith('/rejected'),
                (state: ErrorState, action: PayloadAction<ApiError | string | undefined>) => {
                    state.error = action.payload || 'An unknown error occurred';
                }
            );
    },
});

export const { clearError } = errorSlice.actions;
export default errorSlice.reducer;
