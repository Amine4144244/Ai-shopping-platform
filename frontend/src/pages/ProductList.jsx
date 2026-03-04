import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { API_URL } from '../config';

function ProductList() {
    const [params] = useSearchParams();
    const initialCategory = params.get('category') || '';
    const initialSearch = params.get('search') || '';

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [search, setSearch] = useState(initialSearch);
    const [sortBy, setSortBy] = useState('Newest');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        setLoading(true);
        let url = `${API_URL}/api/products?`;
        if (selectedCategory) url += `category=${encodeURIComponent(selectedCategory)}&`;
        if (search) url += `search=${encodeURIComponent(search)}&`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let sorted = [...data];
                if (sortBy === 'Price: Low to High') {
                    sorted.sort((a, b) => a.price - b.price);
                } else if (sortBy === 'Price: High to Low') {
                    sorted.sort((a, b) => b.price - a.price);
                } else if (sortBy === 'Top Rated') {
                    sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                }
                setProducts(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [selectedCategory, search, sortBy]);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Search</h3>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="Search products..."
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Category</h3>
                        <div className="space-y-2">
                            <label
                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${!selectedCategory ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                                onClick={() => setSelectedCategory('')}
                            >
                                <span className="material-symbols-outlined text-lg">apps</span>
                                <span className="text-sm">All Categories</span>
                            </label>
                            {categories.map((cat, i) => (
                                <label
                                    key={i}
                                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${selectedCategory === cat ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    <span className="material-symbols-outlined text-lg">category</span>
                                    <span className="text-sm">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {selectedCategory || 'All Products'} {search && `for "${search}"`}
                            </h1>
                            <p className="text-sm text-slate-500">Showing {products.length} products</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative inline-block text-left">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none"
                                >
                                    <option>Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Top Rated</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="py-20 text-center text-slate-500">Loading products...</div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map(product => (
                                <div key={product._id} className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full">
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
                                            <Link to={`/products/${product._id}`} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                            <span className="material-symbols-outlined text-4xl mb-4 text-slate-300">inventory_2</span>
                            <p>No products found matching your criteria.</p>
                            <button
                                onClick={() => { setSelectedCategory(''); setSearch(''); }}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default ProductList;
