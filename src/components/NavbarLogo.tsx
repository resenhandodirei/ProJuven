// NavbarLogo.tsx
import React from "react";
import { motion } from "framer-motion";

const letters = "ProJuven".split("");

const letterVariants = {
  animate: {
    y: [0, -3, 0, -6], // sobe e desce levemente
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: ["easeInOut"],
    },
  },
};

const NavbarLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="text-xl font-bold text-[var(--golden)]"
          variants={letterVariants}
          animate="animate"
          transition={{ delay: index * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default NavbarLogo;
