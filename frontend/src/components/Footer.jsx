import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark py-12">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2">

                    <div className="flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                                <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
                            </div>
                            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">ShopAI</span>
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Revolutionizing e-commerce with artificial intelligence to help you find exactly what you need.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Product</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link to="/products" className="hover:text-primary transition-colors">Categories</Link></li>
                            <li><Link to="/products" className="hover:text-primary transition-colors">Trending Now</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Company</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">AI Assistant</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link to="/ai-assistant" className="hover:text-primary transition-colors">How it works</Link></li>
                            <li><Link to="/ai-assistant" className="hover:text-primary transition-colors">Chat Interface</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400">© 2024 ShopAI Platform Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">public</span></a>
                        <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">alternate_email</span></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
