import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

function ProfilePage() {
    const { user, logout } = useStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (err) {
            console.error(err);
        }
        logout();
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12">
                <h2 className="text-2xl font-bold mb-4">Please log in to view your profile.</h2>
                <button onClick={() => navigate('/login')} className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Log In</button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 flex-grow">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-6 mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
                    <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl font-bold shadow-inner">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                        <p className="text-slate-500">{user.email}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold">Account Settings</h3>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <div>
                            <p className="font-semibold">Chat History</p>
                            <p className="text-sm text-slate-500">View your past conversations with ShopAI</p>
                        </div>
                        <button className="text-primary hover:underline font-bold text-sm">View History</button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <div>
                            <p className="font-semibold text-red-600">Logout</p>
                            <p className="text-sm text-slate-500">Sign out of your account on this device</p>
                        </div>
                        <button onClick={handleLogout} className="bg-red-500/10 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-colors text-sm">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
