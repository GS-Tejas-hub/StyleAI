import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ScanFace } from 'lucide-react';

export default function Processing({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState('Analyzing facial features...');

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 50); // 5 seconds total

        const steps = [
            { p: 20, text: 'Detecting face landmarks...' },
            { p: 40, text: 'Generating style variations...' },
            { p: 70, text: 'Refining details...' },
            { p: 90, text: 'Finalizing results...' }
        ];

        const stepTimer = setInterval(() => {
            setProgress(current => {
                const nextStep = steps.find(s => s.p > current && s.p <= current + 5);
                if (nextStep) setStep(nextStep.text);
                return current;
            });
        }, 100);

        return () => {
            clearInterval(timer);
            clearInterval(stepTimer);
        };
    }, [onComplete]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="relative w-32 h-32 mb-12">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <ScanFace className="w-12 h-12 text-blue-400 animate-pulse" />
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">Creating Your Look</h2>
            <p className="text-white/60 mb-8 text-lg">{step}</p>

            <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="mt-4 text-white/40 font-mono">{progress}%</p>
        </div>
    );
}
