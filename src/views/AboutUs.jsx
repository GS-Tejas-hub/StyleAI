import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function AboutUs() {
    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="max-w-4xl mx-auto">
                {/* About Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">About Us</h1>
                    <div className="glass-panel p-8 md:p-12 text-lg text-white/80 leading-relaxed space-y-6 text-left">
                        <p>
                            AI Stylist was born from a simple idea: everyone deserves to look their best, but not everyone has access to a personal stylist.
                            We leverage the power of advanced generative AI to democratize fashion and grooming advice.
                        </p>
                        <p>
                            Whether you're looking for a bold new haircut or a complete wardrobe overhaul, our intelligent algorithms understand your unique features
                            to provide recommendations that truly suit you. We believe that style is a form of self-expression, and our tool is designed to help you
                            explore and refine your personal identity.
                        </p>
                        <p>
                            Our mission is to combine creativity with technology, offering a seamless, privacy-focused experience that empowers you to make confident style choices.
                        </p>
                    </div>
                </motion.div>

                {/* Created By Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <h3 className="text-2xl font-bold mb-8 text-white/80">Created By</h3>

                    <a
                        href="https://gs-tejas-hub.github.io/Demon-s-Portfolio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300"
                    >
                        <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-900">
                                <img
                                    src="/IMG_20251113_061747.jpg"
                                    alt="Demon King | G S Tejas"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full border-4 border-slate-900">
                                <Heart className="w-5 h-5 text-white fill-current" />
                            </div>
                        </div>

                        <div className="text-center">
                            <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 group-hover:from-blue-300 group-hover:to-purple-500 transition-all">
                                Demon King | G S Tejas
                            </h4>
                            <p className="text-white/40 text-lg mt-2">Full Stack Developer & AI Enthusiast</p>
                        </div>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
