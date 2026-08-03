import { configureStore } from '@reduxjs/toolkit';
import cameraSlice from '@/features/camera/cameraSlice';
import homeSlice from '@/features/home/homeSlice';

export const store = configureStore({
    reducer: {
        camera: cameraSlice,
        home: homeSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
