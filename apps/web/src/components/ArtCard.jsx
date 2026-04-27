import React from 'react';
import { motion } from 'framer-motion';

const ArtCard = ({ image, title, category, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-card"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-white font-semibold text-xl mb-1">{title}</h3>
        <p className="text-white/80 text-sm font-medium tracking-wide uppercase">{category}</p>
      </div>
    </motion.div>
  );
};

export default ArtCard;