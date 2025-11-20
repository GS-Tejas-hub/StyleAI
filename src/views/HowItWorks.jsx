import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Shirt, Scissors } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: <Upload className="w-8 h-8 text-blue-400" />,
            title: "Upload Your Photo",
            description: "Take a selfie or upload a full-body shot depending on your goal."
        },
        {
            icon: <Sparkles className="w-8 h-8 text-purple-400" />,
            title: "AI Analysis",
            description: "Our advanced AI analyzes your features, face shape, and body type."
        },
        {
            icon: <Scissors className="w-8 h-8 text-pink-400" />,
            title: "Get Styled",
            description: "Receive personalized hairstyle or outfit recommendations instantly."
        },
        {
            icon: <Shirt className="w-8 h-8 text-green-400" />,
            title: "Shop the Look",
            description: "Find and buy the exact items to recreate your new style."
        }
    ];

    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        How AI Stylist Works
                    </h1>
                    <p className="text-xl text-white/60">
                        Your journey to a better style in four simple steps.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel p-8 hover:bg-white/5 transition-colors"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                            <p className="text-white/60 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
