import { configureStore } from '@reduxjs/toolkit';
import cameraSlice from '@/features/camera/cameraSlice';
import batchesSlice from '@/features/batches/batchesSlice';

export const store = configureStore({
    reducer: {
        camera: cameraSlice,
        batches: batchesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
