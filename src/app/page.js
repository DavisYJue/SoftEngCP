"use client";

import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const controls = useAnimation();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Play entrance animation on mount
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  const handleExploreClick = async () => {
    setIsExiting(true);
    await controls.start({
      y: -100,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    });
    router.push("/RoadsData");
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 flex items-center justify-center overflow-hidden px-4">
      {/* Background blobs */}
      <div className="absolute top-[-150px] left-[-100px] w-[300px] h-[300px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[300px] h-[300px] bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-75"></div>

      {/* Animated Container */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={controls}
        className="z-10 max-w-4xl text-center px-10 py-12 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl border border-white/50"
      >
        <h2 className="text-3xl text-indigo-700 font-extrabold mb-3">
          Welcome!
        </h2>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-5 tracking-tight leading-tight">
          Guangzhou Address Library
        </h1>

        <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
          A curated thesaurus of Chinese road names, districts, and place-based
          terms—designed to enhance word segmentation and improve the accuracy
          of semantic recognition.
        </p>

        <button
          onClick={handleExploreClick}
          className="px-8 py-3 bg-indigo-700 hover:bg-indigo-900 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-indigo-500/60 transition-transform duration-300"
        >
          Explore Data
        </button>
      </motion.div>
    </main>
  );
}
