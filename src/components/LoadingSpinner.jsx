import { motion as Motion } from "framer-motion";

const LoadingSpinner = () => {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-[#0f1b46]">
      <Motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="mb-4 flex h-20 items-center gap-2"
      >
        <Motion.div variants={barVariants} className="h-10 w-2 rounded-full bg-indigo-500" />
        <Motion.div variants={barVariants} className="h-10 w-2 rounded-full bg-cyan-500" />
        <Motion.div variants={barVariants} className="h-10 w-2 rounded-full bg-violet-500" />
        <Motion.div variants={barVariants} className="h-10 w-2 rounded-full bg-indigo-500" />
        <Motion.div variants={barVariants} className="h-10 w-2 rounded-full bg-cyan-500" />
      </Motion.div>

      <Motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-xl font-bold tracking-widest text-slate-700 uppercase dark:text-slate-200"
      >
        Loading...
      </Motion.h2>
    </div>
  );
};

export default LoadingSpinner;