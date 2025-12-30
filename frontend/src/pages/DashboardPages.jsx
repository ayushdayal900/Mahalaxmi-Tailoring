import React from 'react';

// Auth


// Customer
export const CustomerDashboard = () => <div className="p-8"><h1 className="text-2xl font-serif text-brand-maroon">My Dashboard</h1><p>Manage orders and measurements.</p></div>;
export const CustomerOrders = () => <div className="p-8"><h1 className="text-2xl font-serif text-brand-maroon">My Orders</h1><p>Track your stitching status.</p></div>;

// Admin
// Admin Imports
import AdminDashboard from './AdminDashboard';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';

export {
    AdminDashboard,
    AdminOrders,
    AdminProducts
};
