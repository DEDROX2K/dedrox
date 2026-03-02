"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy, Smartphone, Laptop } from "lucide-react";
import Image from "next/image";

// Custom easing for that "Luxurious / OpenAI" feel
const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease },
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] selection:bg-[#BADA55] selection:text-black font-sans overflow-hidden">

            {/* Brutalist Top Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                className="w-full flex justify-between items-center p-6 border-b border-zinc-800"
            >
                <div className="flex items-center gap-3">
                    {/* Assuming you save your logo as logo.png in the public folder */}
                    <div className="w-8 h-8 rounded-md overflow-hidden bg-[#BADA55] flex items-center justify-center">
                        <Image src="/logo.png" alt="Airpaste Logo" width={32} height={32} />
                    </div>
                    <span className="font-bold tracking-tight text-xl">Airpaste</span>
                </div>
                <button className="text-sm font-medium hover:text-[#BADA55] transition-colors">
                    Login
                </button>
            </motion.nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">

                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeUp}
                    className="max-w-4xl"
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase">
                        The minimal <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BADA55] to-white">
                            cloud clipboard.
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.2 }}
                    className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mb-12"
                >
                    Type on your phone. Paste on your laptop. Instant, brutalist, real-time sync with zero friction.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button className="group flex items-center justify-center gap-2 bg-[#BADA55] text-black px-8 py-4 rounded-none font-bold text-lg hover:bg-white transition-colors">
                        Start Syncing
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="flex items-center justify-center gap-2 border border-zinc-800 bg-transparent text-white px-8 py-4 rounded-none font-medium text-lg hover:bg-zinc-900 transition-colors">
                        Download Local Vault
                    </button>
                </motion.div>

            </main>

            {/* Brutalist Feature Grid */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease, delay: 0.5 }}
                className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 border-t border-zinc-800"
            >
                <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col items-center text-center">
                    <Smartphone className="w-12 h-12 text-[#BADA55] mb-4" />
                    <h3 className="text-lg font-bold mb-2">Mobile PWA</h3>
                    <p className="text-zinc-500 text-sm">Installs natively to your home screen. Always ready.</p>
                </div>
                <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col items-center text-center">
                    <Copy className="w-12 h-12 text-[#BADA55] mb-4" />
                    <h3 className="text-lg font-bold mb-2">Real-time Sync</h3>
                    <p className="text-zinc-500 text-sm">Powered by Supabase. Changes reflect in milliseconds.</p>
                </div>
                <div className="p-8 flex flex-col items-center text-center">
                    <Laptop className="w-12 h-12 text-[#BADA55] mb-4" />
                    <h3 className="text-lg font-bold mb-2">Cross-Platform</h3>
                    <p className="text-zinc-500 text-sm">No ecosystems. Just the web. Works wherever you are.</p>
                </div>
            </motion.section>

        </div>
    );
}