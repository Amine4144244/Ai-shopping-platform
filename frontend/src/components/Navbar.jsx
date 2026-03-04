import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

function Navbar() {
    const { user, darkMode, toggleDarkMode, cart } = useStore();
    const totalItems = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                        <span className="material-symbols-outlined">shopping_cart_checkout</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ShopAI</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/products" className="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">
                        Products
                    </Link>
                    <Link to="/ai-assistant" className="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">
                        AI Assistant
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 -mr-1 -mt-1 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={toggleDarkMode}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined">
                            {darkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    {user ? (
                        <Link to="/profile" className="flex items-center gap-2 font-bold text-sm">
                            <span className="material-symbols-outlined">account_circle</span>
                            {user.name}
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="hidden sm:flex px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                                Login
                            </Link>
                            <Link to="/register" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </header>
    );
}

export default Navbar;
