import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CameraState {
    images: string[];
}

const initialState: CameraState = {
    images: [],
};

const cameraSlice = createSlice({
    name: 'camera',
    initialState,
    reducers: {
        addImage: (state, action: PayloadAction<string>) => {
            state.images.push(action.payload);
        },
        removeImage: (state, action: PayloadAction<string>) => {
            state.images = state.images.filter((img) => img !== action.payload);
        },
        clearImages: (state) => {
            state.images = [];
        },
    },
});

export const { addImage, removeImage, clearImages } = cameraSlice.actions;

export default cameraSlice.reducer;
