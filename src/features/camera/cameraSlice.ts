import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    images: [],
};

const cameraSlice = createSlice({
    name: 'camera',
    initialState,
    reducers: {},
});

export default cameraSlice.reducer;
