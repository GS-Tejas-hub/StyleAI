import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Camera, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export default function UploadFlow({ category, onUploadComplete, onBack }) {
    const isHairstyle = category === 'hairstyle';
    const [images, setImages] = useState(isHairstyle ? { front: null, left: null, right: null } : { full: null });
    const [dragActive, setDragActive] = useState(false);

    const handleFile = (file, type) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages(prev => ({ ...prev, [type]: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e, type) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0], type);
        }
    };

    const canProceed = isHairstyle
        ? images.front && images.left && images.right
        : images.full;

    return (
        <div className="min-h-screen flex flex-col items-center px-6 pt-24 pb-12">
            <button
                onClick={onBack}
                className="absolute top-24 left-6 md:left-12 text-white/60 hover:text-white transition-colors"
            >
                ← Back
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Upload Your Photos
                </h2>
                <p className="text-white/60 max-w-xl mx-auto">
                    {isHairstyle
                        ? "We need 3 photos to generate the most realistic hairstyle results. Ensure good lighting and a neutral background."
                        : "Upload a full-body photo to see how different outfits look on you."}
                </p>
            </motion.div>

            <div className={cn(
                "grid gap-8 w-full max-w-5xl mb-12",
                isHairstyle ? "md:grid-cols-3" : "max-w-xl"
            )}>
                {isHairstyle ? (
                    <>
                        <UploadBox
                            label="Front View"
                            image={images.front}
                            onUpload={(f) => handleFile(f, 'front')}
                            active={true}
                        />
                        <UploadBox
                            label="Left Profile"
                            image={images.left}
                            onUpload={(f) => handleFile(f, 'left')}
                            active={!!images.front}
                        />
                        <UploadBox
                            label="Right Profile"
                            image={images.right}
                            onUpload={(f) => handleFile(f, 'right')}
                            active={!!images.left}
                        />
                    </>
                ) : (
                    <UploadBox
                        label="Full Body Shot"
                        image={images.full}
                        onUpload={(f) => handleFile(f, 'full')}
                        active={true}
                        isLarge
                    />
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="consent" className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500" />
                    <label htmlFor="consent" className="text-sm text-white/60">
                        I agree to the processing of my images.
                    </label>
                </div>
            </div>

            <button
                disabled={!canProceed}
                onClick={() => onUploadComplete(images)}
                className={cn(
                    "mt-8 px-8 py-4 rounded-xl font-bold text-lg transition-all",
                    canProceed
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 shadow-lg shadow-blue-500/25 text-white"
                        : "bg-white/10 text-white/40 cursor-not-allowed"
                )}
            >
                Generate Look
            </button>
        </div>
    );
}

function UploadBox({ label, image, onUpload, active, isLarge }) {
    const inputRef = useRef(null);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: active ? 1 : 0.5, scale: 1 }}
            className={cn(
                "relative glass-panel overflow-hidden group transition-all",
                isLarge ? "aspect-[3/4]" : "aspect-[3/4]",
                !active && "pointer-events-none grayscale"
            )}
        >
            {image ? (
                <div className="relative w-full h-full">
                    <img src={image} alt={label} className="w-full h-full object-cover" />
                    <button
                        onClick={() => onUpload(null)} // This logic needs to be handled in parent if we want to clear
                        className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-red-500/80 transition-colors"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="font-semibold text-white">{label}</p>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Camera className="w-8 h-8 text-white/60" />
                    </div>
                    <p className="font-semibold text-lg mb-2">{label}</p>
                    <p className="text-sm text-white/40 text-center">Click or drag photo here</p>
                </div>
            )}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onUpload(e.target.files[0])}
            />
        </motion.div>
    );
}
