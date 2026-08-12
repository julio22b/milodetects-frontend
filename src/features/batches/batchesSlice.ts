import api from '@/api/client';
import type { Batch, BatchDetail } from '@/app/types';
import type { RootState } from '@/app/store';
import { createAsyncThunk, createSelector, createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const RECENT_LIMIT = 3;

interface BatchesState {
    batches: Batch[];
    loading: boolean;
    batchDetail: BatchDetail | null;
    detailLoading: boolean;
}

const initialState: BatchesState = {
    batches: [],
    loading: false,
    batchDetail: null,
    detailLoading: false,
};

export const getBatches = createAsyncThunk<Batch[], number | void>('batches/getBatches', async (limit, thunkAPI) => {
    try {
        const response = await api.get('/batches', { params: { limit }, signal: thunkAPI.signal });
        return response.data.batches as Batch[];
    } catch (error) {
        if (!thunkAPI.signal.aborted) {
            toast.error('Something went wrong during batch retrieval. Please try again.');
        }
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteBatch = createAsyncThunk<string, string>('batches/deleteBatch', async (batchId, thunkAPI) => {
    try {
        await api.delete(`/batches/${batchId}`);
        return batchId;
    } catch (error) {
        toast.error('Something went wrong during batch deletion. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const getBatchById = createAsyncThunk<BatchDetail, string>('batches/getBatchById', async (batchId, thunkAPI) => {
    try {
        const response = await api.get(`/batches/${batchId}`);
        return response.data as BatchDetail;
    } catch (error) {
        toast.error('Something went wrong while opening the analysis. Please try again.');

        return thunkAPI.rejectWithValue(error);
    }
});

const batchesSlice = createSlice({
    name: 'batches',
    initialState,
    reducers: {
        clearBatchDetail: (state) => {
            state.batchDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBatches.fulfilled, (state, action: PayloadAction<Batch[]>) => {
                state.batches = action.payload;
                state.loading = false;
            })
            .addCase(deleteBatch.fulfilled, (state, action: PayloadAction<string>) => {
                state.batches = state.batches.filter((batch) => batch.batch_id !== action.payload);
                if (state.batchDetail?.batch_id === action.payload) {
                    state.batchDetail = null;
                }
                state.loading = false;
            })
            .addCase(getBatchById.pending, (state) => {
                state.detailLoading = true;
                state.batchDetail = null;
            })
            .addCase(getBatchById.fulfilled, (state, action: PayloadAction<BatchDetail>) => {
                state.batchDetail = action.payload;
                state.detailLoading = false;
            })
            .addCase(getBatchById.rejected, (state) => {
                state.detailLoading = false;
            })
            .addMatcher(isAnyOf(getBatches.pending, deleteBatch.pending), (state) => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(getBatches.rejected, deleteBatch.rejected), (state) => {
                state.loading = false;
            });
    },
});

export const { clearBatchDetail } = batchesSlice.actions;

export const selectAllBatches = (state: RootState) => state.batches.batches;
export const selectBatchesLoading = (state: RootState) => state.batches.loading;
export const selectRecentBatches = createSelector([selectAllBatches], (batches) => batches.slice(0, RECENT_LIMIT));
export const selectBatchDetail = (state: RootState) => state.batches.batchDetail;
export const selectBatchDetailLoading = (state: RootState) => state.batches.detailLoading;

export default batchesSlice.reducer;
