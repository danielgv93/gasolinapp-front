import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import AboutPage from './about/AboutPage';
import { DefaultSkeleton } from '../components/DefaultSkeleton';

const MainPage = lazy(() => import('./main/MainPage'));

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Suspense fallback={<DefaultSkeleton />}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
