import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Github } from 'lucide-react';

export default function SignIn() {
    return (
        <div className="min-h-screen pt-24 px-6 pb-12 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass-panel p-8"
            >
                <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
                <p className="text-white/60 text-center mb-8">Sign in to continue your style journey</p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="email"
                                className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500/50 transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="password"
                                className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500/50 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-blue-500/25">
                        Sign In
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-sm text-white/40">or continue with</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                        <Github className="w-5 h-5" />
                        <span>Github</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                        <span className="font-bold text-blue-500">G</span>
                        <span>Google</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
