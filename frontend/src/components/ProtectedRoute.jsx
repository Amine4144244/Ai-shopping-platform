import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../store';

const ProtectedRoute = () => {
    const user = useStore(state => state.user);

    if (!user) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the child components
    return <Outlet />;
};

export default ProtectedRoute;
