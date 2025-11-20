import React from 'react';

export default function Footer() {
    return (
        <footer className="py-8 border-t border-white/5 text-center text-white/40 text-sm">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© 2024 AI Stylist. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}
