import { motion } from "framer-motion"

export default function LetterTile({ letter, className = "" }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      whileHover={{ y: -4, rotateX: 8, rotateY: -8 }}
      className={`grid h-14 w-14 place-items-center rounded-xl border border-primary/25 bg-white/95 text-xl font-bold text-primary shadow-[0_10px_20px_rgba(31,143,77,0.2)] ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {letter}
    </motion.div>
  )
}
