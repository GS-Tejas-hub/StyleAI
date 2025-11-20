import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header({ onHome, onNavigate }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button onClick={onHome} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        AI Stylist
                    </span>
                </button>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
                    <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">How it Works</button>
                    <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">Gallery</button>
                    <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Pricing</button>
                    <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About Us</button>
                    <button onClick={() => onNavigate('signin')} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-white transition-colors">
                        Sign In
                    </button>
                </nav>
            </div>
        </header>
    );
}
