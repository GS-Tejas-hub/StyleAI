import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            features: [
                "3 Hairstyle generations per day",
                "Basic outfit recommendations",
                "Standard resolution downloads",
                "Community support"
            ],
            recommended: false
        },
        {
            name: "Pro",
            price: "$19",
            period: "/month",
            features: [
                "Unlimited generations",
                "Advanced AI editing tools",
                "HD downloads",
                "Priority support",
                "Exclusive style catalog"
            ],
            recommended: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            features: [
                "API Access",
                "Custom model training",
                "White-label solution",
                "Dedicated account manager"
            ],
            recommended: false
        }
    ];

    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple Pricing</h1>
                    <p className="text-xl text-white/60">
                        Choose the plan that fits your style journey.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl border ${plan.recommended
                                    ? 'bg-white/10 border-blue-500 shadow-2xl shadow-blue-500/20'
                                    : 'bg-white/5 border-white/10'
                                }`}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 rounded-full text-sm font-bold">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.period && <span className="text-white/60">{plan.period}</span>}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/80">
                                        <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.recommended
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-white/10 hover:bg-white/20'
                                }`}>
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
