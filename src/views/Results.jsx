import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Edit2, ShoppingBag, ArrowRight, Send, X, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';
import { editResult } from '../lib/api';

const MOCK_HAIRSTYLES = [
    { id: 1, label: 'Short Textured', url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&q=80' },
    { id: 2, label: 'Classic Fade', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&q=80' },
    { id: 3, label: 'Long Layers', url: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=500&q=80' },
    { id: 4, label: 'Buzz Cut', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=80' },
];

const MOCK_OUTFITS = [
    {
        id: 1,
        label: 'Smart Casual',
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80',
        products: [
            { name: 'Linen Blazer', price: '$129', brand: 'Zara', link: '#' },
            { name: 'Chino Pants', price: '$59', brand: 'Uniqlo', link: '#' }
        ]
    },
    {
        id: 2,
        label: 'Streetwear',
        url: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500&q=80',
        products: [
            { name: 'Oversized Hoodie', price: '$89', brand: 'Nike', link: '#' },
            { name: 'Cargo Pants', price: '$75', brand: 'Carhartt', link: '#' }
        ]
    },
    {
        id: 3,
        label: 'Formal',
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
        products: [
            { name: 'Navy Suit', price: '$499', brand: 'SuitSupply', link: '#' },
            { name: 'Oxford Shoes', price: '$150', brand: 'Cole Haan', link: '#' }
        ]
    },
    {
        id: 4,
        label: 'Summer Vibes',
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
        products: [
            { name: 'Floral Shirt', price: '$45', brand: 'H&M', link: '#' },
            { name: 'Linen Shorts', price: '$35', brand: 'Abercrombie', link: '#' }
        ]
    },
];

export default function Results({ category, results: propResults, onBack }) {
    const isHairstyle = category === 'hairstyle';
    const [selectedResult, setSelectedResult] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editPrompt, setEditPrompt] = useState('');
    const [results, setResults] = useState(propResults || (isHairstyle ? MOCK_HAIRSTYLES : MOCK_OUTFITS));

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!editPrompt.trim()) return;

        setIsEditing(false);
        // Call the API
        await editResult(selectedResult.id, editPrompt);

        // In a real app, we'd update the image here. For now, just alert.
        alert(`AI is processing your edit: "${editPrompt}" for ${selectedResult.label}`);
        setEditPrompt('');
    };

    return (
        <div className="min-h-screen px-6 pt-24 pb-12">
            <button
                onClick={onBack}
                className="absolute top-24 left-6 md:left-12 text-white/60 hover:text-white transition-colors"
            >
                ← Start Over
            </button>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Personalized Looks</h2>
                    <p className="text-white/60">Select a style to view details or make adjustments.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {results.map((result) => (
                        <motion.div
                            key={result.id}
                            layoutId={`card-${result.id}`}
                            onClick={() => setSelectedResult(result)}
                            className="group relative aspect-[3/4] glass-panel overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all"
                        >
                            <img src={result.url} alt={result.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-lg font-bold">{result.label}</h3>
                                <div className="flex items-center gap-2 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    View Details <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedResult && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-12 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            layoutId={`card-${selectedResult.id}`}
                            className="relative w-full max-w-5xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-full"
                        >
                            <button
                                onClick={() => setSelectedResult(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-full md:w-1/2 h-96 md:h-auto relative">
                                <img src={selectedResult.url} alt={selectedResult.label} className="w-full h-full object-cover" />
                            </div>

                            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                                <h2 className="text-3xl font-bold mb-2">{selectedResult.label}</h2>
                                <p className="text-white/60 mb-8">Generated based on your preferences.</p>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mb-8">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" /> Customize
                                    </button>
                                    <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                                        <Download className="w-4 h-4" /> Save
                                    </button>
                                </div>

                                {/* Editor Section */}
                                {isEditing && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mb-8 bg-white/5 p-4 rounded-xl border border-white/10"
                                    >
                                        <h4 className="text-sm font-semibold mb-3 text-blue-400">AI Editor</h4>
                                        <form onSubmit={handleEdit} className="relative">
                                            <input
                                                type="text"
                                                value={editPrompt}
                                                onChange={(e) => setEditPrompt(e.target.value)}
                                                placeholder={isHairstyle ? "e.g., Make it shorter on sides..." : "e.g., Change to a leather jacket..."}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500/50"
                                            />
                                            <button type="submit" className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors">
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </form>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {['Make it shorter', 'Add volume', 'Darker color'].map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setEditPrompt(tag)}
                                                    className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-colors"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Product List (Fashion Only) */}
                                {!isHairstyle && selectedResult.products && (
                                    <div className="mt-auto">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <ShoppingBag className="w-5 h-5 text-purple-400" /> Shop the Look
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedResult.products.map((product, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                                                    <div>
                                                        <p className="font-semibold">{product.name}</p>
                                                        <p className="text-sm text-white/40">{product.brand} • {product.price}</p>
                                                    </div>
                                                    <a href={product.link} className="p-2 bg-white/10 rounded-lg group-hover:bg-blue-600 transition-colors">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
