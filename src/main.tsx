import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import './index.css';
import App from './App.tsx';
import { Home } from './pages/Home.tsx';
import { ROUTES } from './app/constants.ts';
import Camera from './pages/Camera.tsx';
import Review from './pages/Review.tsx';
import Results from './pages/Results.tsx';
import History from './pages/History.tsx';
import BatchDetail from './pages/BatchDetail.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <Routes>
                    <Route element={<App />}>
                        <Route index element={<Home />} />
                        <Route path={ROUTES.HISTORY} element={<History />} />
                        <Route path={ROUTES.CAMERA} element={<Camera />} />
                        <Route path={ROUTES.REVIEW} element={<Review />} />
                        <Route path={ROUTES.RESULTS} element={<Results />} />
                        <Route path={`${ROUTES.BATCH}/:id`} element={<BatchDetail />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
