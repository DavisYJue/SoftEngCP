"use client";

import { useRouter } from "next/navigation";
import { usePageAnimation } from "@/hooks/animations";
import Template from "@/components/Template";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelection } from "@/context/SelectionContext";

export default function HomePage() {
  const router = useRouter();
  const { isExiting, variants, transition, startExit } = usePageAnimation();

  const {
    resetSelection,
    setDistrictFilter,
    setSuffixFilter,
    setFilterText, // also reset main text filter if you want
  } = useSelection();

  useEffect(() => {
    resetSelection();
    setDistrictFilter("");
    setSuffixFilter("");
    setFilterText("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExploreClick = () => {
    startExit();
  };

  const onExitComplete = () => {
    if (isExiting) {
      router.push("/RoadsData");
    }
  };

  return (
    <Template>
      <motion.div
        initial="initial"
        animate={isExiting ? "exit" : "animate"}
        variants={variants}
        transition={transition}
        className="z-10 max-w-4xl text-center px-10 py-12 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl border border-white/50"
        onAnimationComplete={onExitComplete}
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
          disabled={isExiting}
          className="px-8 py-3 bg-indigo-400 hover:bg-indigo-500 text-black text-xl font-bold rounded-xl shadow-lg hover:shadow-violet-500/100 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Explore Data
        </button>
      </motion.div>
    </Template>
  );
}
