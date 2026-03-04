import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Marketplace() {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState(['Electronics', 'Home & Living', 'Fashion', 'Beauty']);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch some featured products
        fetch('http://localhost:5000/api/products?limit=4')
            .then(res => res.json())
            .then(data => setProducts(data.slice(0, 4)))
            .catch(err => console.error(err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/products?search=${encodeURIComponent(search)}`);
        }
    };

    return (
        <div className="flex-grow">
            {/* Search Header */}
            <section className="bg-primary/5 py-16 text-center px-6">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Welcome to the Marketplace</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                    Find exactly what you're looking for or let our AI assistant guide you.
                </p>
                <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-4 pl-12 pr-4 text-base focus:ring-4 focus:ring-primary/20 shadow-lg shadow-black/5 transition-all outline-none"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-primary/90">
                        <span className="material-symbols-outlined block">arrow_forward</span>
                    </button>
                </form>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Shop by Category</h2>
                    <Link to="/products" className="text-primary font-semibold hover:underline flex items-center gap-1">
                        View All Categories <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((cat, i) => (
                        <Link to={`/products?category=${encodeURIComponent(cat)}`} key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
                            <div className="h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">category</span>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{cat}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
                        <Link to="/products" className="text-primary font-semibold hover:underline flex items-center gap-1">
                            View Market <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.length > 0 ? products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        )) : (
                            <p className="text-slate-500 col-span-full py-10 text-center">No featured products available.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

function ProductCard({ product }) {
    return (
        <div className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2">
                    <span className="material-symbols-outlined text-amber-400 text-sm FILL-1">star</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{product.rating || 'New'}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{product.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4">{product.category}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-slate-900 dark:text-slate-100">${product.price.toFixed(2)}</span>
                    <Link to={`/products/${product._id}`} className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Marketplace;
