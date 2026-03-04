import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const setUser = useStore((state) => state.setUser);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setUser(data);
            navigate('/marketplace');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6 mt-10 mb-20">
            <div className="w-full max-w-md relative z-10">
                <div className="bg-white dark:bg-slate-900/50 rounded-xl shadow-xl shadow-primary/5 border border-primary/5 p-8 md:p-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-4">
                            <span className="material-symbols-outlined text-3xl">lock_open</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Please enter your details to access your AI shopping assistant</p>
                    </div>

                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-background-light dark:bg-slate-800 border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold">Password</label>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">key</span>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-background-light dark:bg-slate-800 border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className={`w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Logging in...' : 'Login to Platform'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-primary/10 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Don't have an account?
                            <Link to="/register" className="text-primary font-bold hover:underline ml-1">Register Now</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
}

export default LoginPage;
