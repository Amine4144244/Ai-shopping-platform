import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { API_URL } from '../config';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const { addToCart } = useStore();

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    useEffect(() => {
        fetch(`${API_URL}/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="py-20 text-center text-slate-500">Loading product...</div>;
    if (!product || product.message) return <div className="py-20 text-center text-slate-500">Product not found.</div>;

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8 md:px-10 flex-grow">
            {/* Product Hero Section */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="flex flex-col gap-4">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
                        <img src={product.image || 'https://via.placeholder.com/600'} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                </div>

                {/* Product Info & CTA */}
                <div className="flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-primary">{product.category}</span>
                        <h1 className="text-4xl font-black md:text-5xl leading-tight">{product.name}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center text-amber-500">
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined">star_half</span>
                            </div>
                            <span className="text-sm font-medium text-slate-500">{product.rating || '4.5'} (Reviews)</span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-4 border-y border-slate-200 dark:border-slate-800 py-6">
                        <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                        <div className="ml-auto rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-bold text-green-700 dark:text-green-400">IN STOCK</div>
                    </div>

                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                        {product.description}
                    </p>

                    <div className="flex flex-col gap-4 pt-4">
                        <button
                            onClick={() => navigate('/ai-assistant', { state: { productContext: product.name } })}
                            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-5 text-lg font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/30"
                        >
                            <span className="material-symbols-outlined animate-pulse">auto_awesome</span>
                            <span>Ask AI About This Product</span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                        <button onClick={handleAddToCart} className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-transparent px-8 py-4 font-bold transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
                            <span className="material-symbols-outlined">{added ? 'check' : 'shopping_cart'}</span>
                            <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetails;
