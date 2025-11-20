import React from 'react';
import { motion } from 'framer-motion';
import { User, UserCheck, Star, Shield, Zap } from 'lucide-react';

export default function Home({ onSelectGender }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white/50">
                        Redefine Your Style
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Experience the future of personal styling. Upload your photo and let our AI generate your perfect look.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
                    <Card
                        title="Men"
                        icon={<User className="w-12 h-12" />}
                        description="Discover sharp haircuts and modern outfits tailored for you."
                        onClick={() => onSelectGender('men')}
                        delay={0.1}
                    />
                    <Card
                        title="Women"
                        icon={<UserCheck className="w-12 h-12" />}
                        description="Explore trending hairstyles and chic fashion ensembles."
                        onClick={() => onSelectGender('women')}
                        delay={0.2}
                    />
                </div>
            </div>

            {/* Features Section */}
            <section className="py-24 px-6 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Why Choose AI Stylist?</h2>
                        <p className="text-white/60">Cutting-edge technology meets personal fashion.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-yellow-400" />}
                            title="Instant Results"
                            description="Get personalized recommendations in seconds, not hours."
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-blue-400" />}
                            title="Privacy First"
                            description="Your photos are processed securely and deleted automatically."
                        />
                        <FeatureCard
                            icon={<Star className="w-8 h-8 text-purple-400" />}
                            title="Expert AI"
                            description="Trained on thousands of professional styles and trends."
                        />
                    </div>
                </div>
            </section>
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
            <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/20" />

            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h2 className="text-3xl font-bold mb-3">{title}</h2>
                <p className="text-white/60 text-lg">{description}</p>

                <div className="mt-8 flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all">
                    Get Started <span className="text-xl">→</span>
                </div>
            </div>
        </motion.button>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-white/60">{description}</p>
        </motion.div>
    );
}
