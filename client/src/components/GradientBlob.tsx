import { motion } from "framer-motion";

interface GradientBlobProps {
  width: string;
  height: string;
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  delay?: number;
}

const GradientBlob = ({ width, height, position, delay = 0 }: GradientBlobProps) => {
  return (
    <motion.div
      className="blob"
      style={{
        width,
        height,
        ...position,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.15, 0.2, 0.15],
      }}
      transition={{
        repeat: Infinity,
        duration: 8,
        delay,
        ease: "easeInOut",
      }}
    ></motion.div>
  );
};

export default GradientBlob;
