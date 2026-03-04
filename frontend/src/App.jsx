import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './store';
import ProtectedRoute from './components/ProtectedRoute';

// We will create these pages next
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Marketplace from './pages/Marketplace';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AIAssistant from './pages/AIAssistant';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    const initTheme = useStore((state) => state.initTheme);

    useEffect(() => {
        initTheme();
    }, [initTheme]);

    return (
        <BrowserRouter>
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/marketplace" element={<Marketplace />} />
                            <Route path="/products" element={<ProductList />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/ai-assistant" element={<AIAssistant />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/cart" element={<CartPage />} />
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
