import type { AnalysisStatus, AnalyzedImage, CapturedImage } from '@/app/types';
import { api } from '@/api/client';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export interface CameraState {
    images: CapturedImage[];
    analyzedImages: AnalyzedImage[];
    status: AnalysisStatus;
    uploadProgress: number;
}

const initialState: CameraState = {
    images: [],
    analyzedImages: [],
    status: 'idle',
    uploadProgress: 0,
};

export const analyzeImages = createAsyncThunk<AnalyzedImage[], FormData>(
    'camera/analyzeImages',
    async (formData, thunkAPI) => {
        try {
            const response = await api.post('/analyze', formData, {
                onUploadProgress: (event) => {
                    const percent = event.total ? Math.round((event.loaded / event.total) * 100) : 0;
                    thunkAPI.dispatch(setUploadProgress(percent));
                },
            });

            return response.data.results as AnalyzedImage[];
        } catch (error) {
            toast.error('Something went wrong during analysis. Please try again.');
            return thunkAPI.rejectWithValue(error);
        }
    },
);

const cameraSlice = createSlice({
    name: 'camera',
    initialState,
    reducers: {
        addImage: (state, action: PayloadAction<CapturedImage>) => {
            state.images.push(action.payload);
        },
        removeImage: (state, action: PayloadAction<CapturedImage>) => {
            state.images = state.images.filter((img) => img.id !== action.payload.id);
        },
        clearImages: (state) => {
            state.images = [];
            state.analyzedImages = [];
        },
        setUploadProgress: (state, action: PayloadAction<number>) => {
            state.uploadProgress = action.payload;
            // as upload finishes, switch to analyzing
            if (action.payload >= 100) {
                state.status = 'analyzing';
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(analyzeImages.pending, (state) => {
            state.status = 'uploading';
            state.uploadProgress = 0;
        });
        builder.addCase(analyzeImages.fulfilled, (state, action: PayloadAction<AnalyzedImage[]>) => {
            state.status = 'idle';
            state.uploadProgress = 0;
            state.analyzedImages = action.payload;
            state.images = [];
        });
        builder.addCase(analyzeImages.rejected, (state) => {
            state.status = 'error';
            state.uploadProgress = 0;
        });
    },
});

export const { addImage, removeImage, clearImages, setUploadProgress } = cameraSlice.actions;

export default cameraSlice.reducer;
