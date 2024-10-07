"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Using Framer Motion for animations

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This triggers when the component mounts for the first time
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      
      {/* Floating Background Elements for Dynamic Feel */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full opacity-30 animate-pulse blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300 rounded-full opacity-30 animate-pulse blur-xl"></div>

      {/* Welcome Text with Animation */}
      <motion.h1 
        className="text-5xl font-bold text-white text-center mb-4 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5 }}
      >
        Welcome to Business Analytics
      </motion.h1>

      {/* Subtext with Fading Animation */}
      <motion.p 
        className="text-lg text-gray-200 text-center mb-8 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.8 }}
      >
        Your platform for smarter decisions. Ready to dive in?
      </motion.p>

      {/* 'Login' Button with Hover Animation */}
      <Link href="/login">
        <motion.button
          className="z-10 p-4 px-8 bg-blue-600 text-white rounded-full text-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </Link>
    </div>
  );
}
