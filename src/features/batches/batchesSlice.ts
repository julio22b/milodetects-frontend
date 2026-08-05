import api from '@/api/client';
import type { Batch } from '@/app/types';
import { createAsyncThunk, createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface BatchesState {
    batches: Batch[];
    loading: boolean;
}

const initialState: BatchesState = {
    batches: [],
    loading: false,
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

const batchesSlice = createSlice({
    name: 'batches',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBatches.fulfilled, (state, action: PayloadAction<Batch[]>) => {
                state.batches = action.payload;
                state.loading = false;
            })
            .addCase(deleteBatch.fulfilled, (state, action: PayloadAction<string>) => {
                state.batches = state.batches.filter((batch) => batch.batch_id !== action.payload);
                state.loading = false;
            })
            .addMatcher(isAnyOf(getBatches.pending, deleteBatch.pending), (state) => {
                state.loading = true;
            })
            .addMatcher(isAnyOf(getBatches.rejected, deleteBatch.rejected), (state) => {
                state.loading = false;
            });
    },
});

export default batchesSlice.reducer;
