import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.tsx';
import { Home } from './pages/Home.tsx';
import { History } from './pages/History.tsx';
import { ROUTES } from './lib/constants.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename='/milodetects-frontend'>
            <Routes>
                <Route element={<App />}>
                    <Route index element={<Home />} />
                    <Route path={ROUTES.HISTORY} element={<History />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
