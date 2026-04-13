import { motion } from "framer-motion";

const Loading = () => {
  // Container variants to stagger the children (the bars)
  const containerVariants = {
    initial: { transition: { staggerChildren: 0.2 } },
    animate: { transition: { staggerChildren: 0.2 } },
  };

  // Individual bar variants
  const barVariants = {
    initial: { scaleY: 0.5, opacity: 0.3 },
    animate: {
      scaleY: 1.5,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-300">
      {/* Animated Bars Container */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex gap-2 mb-4 items-center h-20"
      >
        <motion.div variants={barVariants} className="w-2 h-10 bg-primary rounded-full" />
        <motion.div variants={barVariants} className="w-2 h-10 bg-secondary rounded-full" />
        <motion.div variants={barVariants} className="w-2 h-10 bg-accent rounded-full" />
        <motion.div variants={barVariants} className="w-2 h-10 bg-primary rounded-full" />
        <motion.div variants={barVariants} className="w-2 h-10 bg-secondary rounded-full" />
      </motion.div>

      {/* Loading Text with Pulse */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-xl font-bold tracking-widest uppercase text-base-content"
      >
        Loading Gamehub...
      </motion.h2>
    </div>
  );
};

export default Loading;