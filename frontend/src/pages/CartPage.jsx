import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { API_URL } from '../config';

function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useStore();

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
            <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Your Cart</h1>
            {cart.length === 0 ? (
                <div className="py-20 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="material-symbols-outlined text-4xl mb-4 text-slate-300">shopping_cart</span>
                    <p>Your cart is empty.</p>
                    <Link to="/products" className="mt-4 inline-block text-primary font-bold hover:underline">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        {cart.map((item) => (
                            <div key={item.product._id} className="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 items-center">
                                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg bg-slate-100" />
                                <div className="flex-1 text-center sm:text-left">
                                    <Link to={`/products/${item.product._id}`} className="font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">
                                        {item.product.name}
                                    </Link>
                                    <p className="text-sm text-slate-500">{item.product.category}</p>
                                    <p className="font-bold text-primary mt-1">${item.product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1 bg-slate-50 dark:bg-slate-800">
                                        <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-700 dark:text-slate-300">-</button>
                                        <span className="w-8 text-center text-sm font-medium text-slate-900 dark:text-white">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-700 dark:text-slate-300">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.product._id)} className="text-red-500 hover:text-red-700 p-2 transition-colors">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full lg:w-80 h-fit bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Order Summary</h3>
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-500">Subtotal</span>
                            <span className="font-bold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                            <span className="text-slate-500">Shipping</span>
                            <span className="font-bold text-slate-900 dark:text-white">Free</span>
                        </div>
                        <div className="flex justify-between mb-6 text-lg">
                            <span className="font-bold text-slate-900 dark:text-white">Total</span>
                            <span className="font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default CartPage;
