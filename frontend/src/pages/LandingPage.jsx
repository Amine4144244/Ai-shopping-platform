import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    const [chatStep, setChatStep] = useState(0);

    useEffect(() => {
        let isActive = true;
        const runSequence = async () => {
            while (isActive) {
                setChatStep(0); // Only User message
                await new Promise(r => setTimeout(r, 1500));
                if (!isActive) break;

                setChatStep(1); // User message + AI typing
                await new Promise(r => setTimeout(r, 1500));
                if (!isActive) break;

                setChatStep(2); // User message + AI Response
                await new Promise(r => setTimeout(r, 1000));
                if (!isActive) break;

                setChatStep(3); // User message + AI Response + Card
                await new Promise(r => setTimeout(r, 4500));
            }
        };
        runSequence();
        return () => { isActive = false; };
    }, []);

    const categories = [
        { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop' },
        { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop' },
        { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop' },
        { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop' }
    ];

    return (
        <div className="flex-grow">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="flex flex-col gap-8">
                        <div className="inline-flex max-w-max items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary dark:bg-primary/20 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-sm">auto_awesome</span>
                            Next-Gen E-Commerce
                        </div>
                        <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-6xl">
                            Shop Smarter with an <span className="text-primary">AI Shopping</span> Assistant
                        </h1>
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
                            Discover the best products with natural language search and AI-driven recommendations. Personalized shopping, simplified.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/ai-assistant" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-base font-bold shadow-xl shadow-primary/25 transition-all">
                                <span className="material-symbols-outlined">forum</span>
                                Ask AI to Help Me Shop
                            </Link>
                            <Link to="/products" className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 bg-white dark:bg-background-dark px-8 py-4 rounded-xl text-base font-bold transition-all">
                                Browse Products
                            </Link>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                <div className="h-8 w-8 rounded-full border-2 border-background-light bg-slate-200 dark:border-background-dark"></div>
                                <div className="h-8 w-8 rounded-full border-2 border-background-light bg-slate-300 dark:border-background-dark"></div>
                                <div className="h-8 w-8 rounded-full border-2 border-background-light bg-slate-400 dark:border-background-dark"></div>
                            </div>
                            <span>Joined by 10k+ shoppers this month</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-transparent blur-2xl"></div>
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-2xl shadow-primary/10 aspect-video lg:aspect-square flex flex-col">
                            {/* Chat Header */}
                            <div className="bg-white dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 shrink-0">
                                <div className="bg-primary p-1.5 rounded-lg text-white">
                                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">ShopAI Assistant</h3>
                                    <p className="text-[10px] text-slate-500">Always online</p>
                                </div>
                            </div>

                            {/* Chat Body */}
                            <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden relative">
                                <div className="flex justify-end animate-fade-in-up">
                                    <div className="bg-primary text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-none shadow-md max-w-[85%]">
                                        Find me the best wireless headphones for under $200
                                    </div>
                                </div>

                                {chatStep === 1 && (
                                    <div className="flex justify-start animate-fade-in-up">
                                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                        </div>
                                    </div>
                                )}

                                {chatStep >= 2 && (
                                    <div className="flex justify-start animate-fade-in-up">
                                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[90%] space-y-3">
                                            <p className="text-slate-700 dark:text-slate-300">I found some great options! The <strong>SonicPro Wireless</strong> is currently the top-rated choice in your budget with 30-hour battery life.</p>

                                            {chatStep >= 3 && (
                                                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700 flex gap-3 animate-fade-in-up">
                                                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop" alt="Headphones" className="w-12 h-12 rounded-lg object-cover" />
                                                    <div>
                                                        <p className="font-bold text-xs text-slate-900 dark:text-white">SonicPro Wireless</p>
                                                        <p className="text-[10px] text-slate-500">Noise Cancelling • 30h Battery</p>
                                                        <p className="text-primary font-bold text-xs mt-1">$149.99</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Chat Input */}
                            <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shrink-0">
                                <div className="relative flex items-center">
                                    <div className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-4 pr-10 text-xs text-slate-400 flex items-center h-8">
                                        {chatStep === 1 ? <span className="animate-pulse">AI is typing...</span> : "Ask a follow up..."}
                                    </div>
                                    <div className="absolute right-1 w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-[12px]">send</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Categories */}
            <section className="bg-white dark:bg-background-dark/50 py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Product Categories</h2>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">Explore curated collections for every need.</p>
                        </div>
                        <Link to="/products" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
                        {categories.map((cat, i) => (
                            <Link to={`/products?category=${encodeURIComponent(cat.name)}`} key={i} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transition-transform hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-80"></div>
                                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <p className="text-lg font-bold text-white mb-1 drop-shadow-md">{cat.name}</p>
                                    <p className="text-xs text-slate-200 font-medium drop-shadow-md">Explore Products</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="mx-auto max-w-7xl px-6 pb-20 mt-20">
                <div className="rounded-3xl bg-primary px-8 py-12 md:py-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold md:text-4xl">Experience the future of shopping</h2>
                        <p className="mt-4 text-white/90">Join thousands of smart shoppers who save time and money with our AI assistant.</p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/register" className="w-full sm:w-auto bg-white text-primary hover:bg-slate-100 px-8 py-4 rounded-xl font-bold transition-all">
                                Get Started Free
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
