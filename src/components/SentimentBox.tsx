import React from "react";
import { motion } from "framer-motion";

const getSentimentStyle = (score: number) => {

  const hue = (score + 1) * 60; 
  const lightness = 30 + Math.abs(score) * 40;
  const bgColor = `hsl(${hue}, 80%, ${lightness}%)`;
  const borderColor = `hsl(${hue}, 90%, ${lightness + 10}%)`;

  return {
    background: `linear-gradient(145deg, ${bgColor}, hsl(${hue}, 70%, ${lightness - 10}%))`,
    border: `2px solid ${borderColor}`,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    backgroundColor: `hsl(${hue}, 80%, 50%)`,
    color: "#fff",
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "16px",
    fontWeight: "bold",
    minWidth: "60px",
    minHeight: "30px",
  };
};

const SentimentBox: React.FC<{ score: number }> = ({ score }) => {
  return (
    <motion.div
      className="w-24 h-24 flex items-center justify-center text-white font-bold text-3xl rounded-lg shadow-md 
                 transition-all duration-300 ease-in-out transform hover:scale-105"
      style={getSentimentStyle(score)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {score.toFixed(2)}
    </motion.div>
  );
};

export default SentimentBox;
