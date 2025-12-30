import React, { useState } from 'react';
// import axois from 'axios'; // Uncomment when APIs are ready
import { Layout, MessageSquare, HelpCircle, Image as ImageIcon, Plus } from 'lucide-react';

const AdminCMS = () => {
    const [activeTab, setActiveTab] = useState('banners');

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Content Management</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-8">
                <TabButton
                    active={activeTab === 'banners'}
                    onClick={() => setActiveTab('banners')}
                    icon={ImageIcon}
                    label="Banners"
                />
                <TabButton
                    active={activeTab === 'testimonials'}
                    onClick={() => setActiveTab('testimonials')}
                    icon={MessageSquare}
                    label="Testimonials"
                />
                <TabButton
                    active={activeTab === 'faqs'}
                    onClick={() => setActiveTab('faqs')}
                    icon={HelpCircle}
                    label="FAQs"
                />
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
                {activeTab === 'banners' && <BannerManager />}
                {activeTab === 'testimonials' && <TestimonialManager />}
                {activeTab === 'faqs' && <FAQManager />}
            </div>
        </div>
    );
};

// Sub-components (Placeholders for now)

const BannerManager = () => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Homepage Banners</h2>
            <button className="flex items-center gap-2 bg-brand-maroon text-white px-4 py-2 rounded-lg text-sm hover:bg-red-900">
                <Plus size={16} /> Add Banner
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mock Banner Card */}
            <div className="border rounded-lg overflow-hidden group">
                <div className="h-40 bg-gray-200 relative">
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400">Image Preview</span>
                </div>
                <div className="p-4">
                    <h3 className="font-bold">Hero Banner 1</h3>
                    <p className="text-sm text-gray-500">Active • Order: 1</p>
                </div>
            </div>
        </div>
    </div>
);

const TestimonialManager = () => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
            <button className="flex items-center gap-2 bg-brand-maroon text-white px-4 py-2 rounded-lg text-sm hover:bg-red-900">
                <Plus size={16} /> Add Testimonial
            </button>
        </div>
        <div className="space-y-4">
            <div className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                    <h4 className="font-bold">Anjali Rao</h4>
                    <p className="text-gray-600 text-sm">"Beautiful stitching work!"</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">5 Stars</span>
            </div>
        </div>
    </div>
);

const FAQManager = () => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h2>
            <button className="flex items-center gap-2 bg-brand-maroon text-white px-4 py-2 rounded-lg text-sm hover:bg-red-900">
                <Plus size={16} /> Add FAQ
            </button>
        </div>
        <div className="space-y-4">
            <div className="border p-4 rounded-lg">
                <h4 className="font-bold text-sm">How do I take measurements?</h4>
                <p className="text-gray-500 text-sm mt-1">We have a guide...</p>
            </div>
        </div>
    </div>
);

const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${active ? 'bg-brand-maroon text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
    >
        <Icon size={18} /> {label}
    </button>
);

export default AdminCMS;
