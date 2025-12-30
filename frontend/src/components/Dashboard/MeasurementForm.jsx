import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeasurementForm = ({ initialData, onSave }) => {
    const [formData, setFormData] = useState({
        profileName: 'My Body Measurements',
        blouseLength: '',
        blouseWidth: '',
        sareeLength: '',
        shoulderWidth: '',
        waist: '',
        hip: '',
        notes: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                profileName: initialData.profileName || 'My Body Measurements',
                blouseLength: initialData.blouseLength || '',
                blouseWidth: initialData.blouseWidth || '',
                sareeLength: initialData.sareeLength || '',
                shoulderWidth: initialData.shoulderWidth || '',
                waist: initialData.waist || '',
                hip: initialData.hip || '',
                notes: initialData.notes || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await axios.post('http://localhost:5000/api/customers/measurements', formData);
            setMessage('Measurements saved successfully!');
            if (onSave) onSave();
        } catch (error) {
            setMessage('Failed to save measurements. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
                <div className={`p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Blouse Length (inches)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="blouseLength"
                        value={formData.blouseLength}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                        placeholder="e.g. 14.5"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Blouse Width / Bust (inches)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="blouseWidth"
                        value={formData.blouseWidth}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                        placeholder="e.g. 36"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Waist (inches)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="waist"
                        value={formData.waist}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                        placeholder="e.g. 32"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hips (inches)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="hip"
                        value={formData.hip}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                        placeholder="e.g. 38"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Shoulder Width (inches)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="shoulderWidth"
                        value={formData.shoulderWidth}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                        placeholder="e.g. 15"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Saree Length (Optional)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="sareeLength"
                        value={formData.sareeLength}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                        placeholder="e.g. 5.5 (meters)"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                    placeholder="Specific instructions..."
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-maroon hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Measurements'}
                </button>
            </div>
        </form>
    );
};

export default MeasurementForm;
