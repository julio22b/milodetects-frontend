import api from '@/api/client';
import type { Batch } from '@/app/types';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface HomeState {
    batches: Batch[];
    loading: boolean;
}

const initialState: HomeState = {
    batches: [],
    loading: false,
};

export const getBatches = createAsyncThunk<Batch[], number | void>('home/getBatches', async (limit, thunkAPI) => {
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

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBatches.fulfilled, (state, action: PayloadAction<Batch[]>) => {
                state.batches = action.payload;
                state.loading = false;
            })
            .addCase(getBatches.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBatches.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default homeSlice.reducer;
