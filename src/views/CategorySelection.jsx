import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Shirt } from 'lucide-react';

export default function CategorySelection({ gender, onSelectCategory, onBack }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
            <button
                onClick={onBack}
                className="absolute top-24 left-6 md:left-12 text-white/60 hover:text-white transition-colors"
            >
                ← Back
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Choose Your Transformation
                </h2>
                <p className="text-xl text-white/60">
                    Select what you'd like to experiment with today.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
                <Card
                    title="Hairstyle"
                    icon={<Scissors className="w-12 h-12" />}
                    description="Try new cuts, colors, and styles on your own photo."
                    onClick={() => onSelectCategory('hairstyle')}
                    delay={0.1}
                />
                <Card
                    title="Fashion & Clothing"
                    icon={<Shirt className="w-12 h-12" />}
                    description="Visualize different outfits and find your perfect look."
                    onClick={() => onSelectCategory('fashion')}
                    delay={0.2}
                />
            </div>
        </div>
    );
}

function Card({ title, icon, description, onClick, delay }) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            onClick={onClick}
            className="group relative overflow-hidden glass-panel p-8 text-left hover:bg-white/15 transition-all duration-300"
        >
            <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/20" />

            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h2 className="text-3xl font-bold mb-3">{title}</h2>
                <p className="text-white/60 text-lg">{description}</p>

                <div className="mt-8 flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-4 transition-all">
                    Select <span className="text-xl">→</span>
                </div>
            </div>
        </motion.button>
    );
}
