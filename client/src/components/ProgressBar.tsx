import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(progressRef, { once: true });

  return (
    <div className="progress-bar" ref={progressRef}>
      <motion.div 
        className="progress-bar-fill bg-gradient-to-r from-primary to-secondary"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
