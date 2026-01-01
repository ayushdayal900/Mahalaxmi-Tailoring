import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader } from 'lucide-react';

const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await api.get('/cms/gallery');
                setGalleryItems(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching gallery:", error);
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    // Get unique categories from items
    const categories = ['All', ...new Set(galleryItems.map(item => item.category).filter(Boolean))];

    const filteredItems = filter === 'All' ? galleryItems : galleryItems.filter(item => item.category === filter);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader className="animate-spin text-brand-maroon" size={40} /></div>;

    return (
        <div className="pt-20 pb-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-brand-maroon mb-4">Customer Gallery</h1>
                    <p className="text-gray-600">See how our creations bring elegance to your special moments.</p>
                </div>

                {/* Filter Tabs */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full border transition ${filter === cat
                                    ? 'bg-brand-maroon text-white border-brand-maroon'
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-brand-maroon'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Masonry Grid */}
                {filteredItems.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        <p>No images found in the gallery yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map(item => (
                            <div key={item._id} className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer h-80">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                                    {item.category && (
                                        <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-1">{item.category}</span>
                                    )}
                                    <h3 className="text-white text-lg font-bold">{item.title}</h3>
                                    {/* <p className="text-gray-300 text-sm">{item.description}</p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
