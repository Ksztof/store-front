import { createSlice } from '@reduxjs/toolkit';
import { CombinedCartLocStorState } from '../../types/cartTypes';
import { addCombinedCartRedStor } from '../actions/combinedCartActions';

const initialState: CombinedCartLocStorState = {
  loading: false,
  combinedCartLocStorData: null,
  error: null,
};

const combinedCartLocStorSlice = createSlice({
  name: 'combinedCart',
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addCombinedCartRedStor.pending, (combinedCartLocStorState: CombinedCartLocStorState) => {
        combinedCartLocStorState.loading = true;
        combinedCartLocStorState.error = null;
      })
      .addCase(addCombinedCartRedStor.fulfilled, (combinedCartLocStorState : CombinedCartLocStorState, action) => {
        combinedCartLocStorState.loading = false;
        combinedCartLocStorState.combinedCartLocStorData = action.payload;
      })
      .addCase(addCombinedCartRedStor.rejected, (combinedCartLocStorState: CombinedCartLocStorState, action) => {
        combinedCartLocStorState.loading = false;
        combinedCartLocStorState.error = action.payload ?? "An unexpected error occurred. Please try again.";
      });
  },
});

export default combinedCartLocStorSlice.reducer;
