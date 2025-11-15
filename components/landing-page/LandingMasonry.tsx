"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Masonry from "../ui/Masonry";
import { useIsMobile } from "@/hooks/use-mobile";

// Real showcase images - mix of different transformation types
const items = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=900&fit=crop&q=80",
    url: "/transformations/add/restore",
    height: 400,
    category: "Landscape"
  },
  {
    id: "2",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=750&fit=crop&q=80",
    url: "/transformations/add/removeBackground",
    height: 250,
    category: "Portrait"
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=800&fit=crop&q=80",
    url: "/transformations/add/fill",
    height: 600,
    category: "Architecture"
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=900&fit=crop&q=80",
    url: "/transformations/add/remove",
    height: 400,
    category: "Nature"
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&h=900&fit=crop&q=80",
    url: "/transformations/add/recolor",
    height: 250,
    category: "Urban"
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&h=900&fit=crop&q=80",
    url: "/transformations/add/restore",
    height: 600,
    category: "Wildlife"
  },
  {
    id: "7",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=900&fit=crop&q=80",
    url: "/transformations/add/fill",
    height: 400,
    category: "Scenic"
  },
  {
    id: "8",
    img: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&h=900&fit=crop&q=80",
    url: "/transformations/add/removeBackground",
    height: 250,
    category: "Mountains"
  },
  {
    id: "9",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=900&fit=crop&q=80",
    url: "/transformations/add/recolor",
    height: 400,
    category: "Sunset"
  },
  {
    id: "10",
    img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&h=900&fit=crop&q=80",
    url: "/transformations/add/restore",
    height: 600,
    category: "Forest"
  },
  {
    id: "11",
    img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=900&fit=crop&q=80",
    url: "/transformations/add/fill",
    height: 400,
    category: "Adventure"
  },
];

const LandingMasonry = ({ itemsToShow = 5 }: { itemsToShow: number }) => {
  const [currItems, setCurrItems] = useState(items);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    setCurrItems(items.slice(0, itemsToShow));
  }, [itemsToShow]);

  return (
    <div className="relative">
      {/* Header Section */}
      <motion.div
        className="text-center mb-12 max-w-3xl mx-auto relative z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-block mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-sm font-medium text-purple-600 dark:text-purple-400">
            ✨ Transform Any Image
          </span>
        </motion.div>
        
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Powered by AI Magic
        </motion.h2>
        
        <motion.p
          className="text-base md:text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          From restoration to creative edits, see what&apos;s possible
        </motion.p>
      </motion.div>

      {/* Masonry Grid with Enhanced Animations */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <Masonry
          items={currItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.06}
          animateFrom="random"
          scaleOnHover={true}
          hoverScale={1.05}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </motion.div>

      {/* Floating Action Hint */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-4 h-4 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          <span className="text-xs font-medium text-muted-foreground">
            Click any image to try
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingMasonry;
