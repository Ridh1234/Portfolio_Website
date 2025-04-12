import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

const IntroAnimation = ({ onAnimationComplete }: IntroAnimationProps) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Add a timeout to prevent the intro from showing indefinitely if there's an issue
    const timeout = setTimeout(() => {
      setIsAnimationComplete(true);
      onAnimationComplete();
    }, 4000); // Force complete after 4 seconds

    return () => clearTimeout(timeout);
  }, [onAnimationComplete]);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    initial: { width: "0%" },
    animate: { 
      width: "100%",
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: 0.4
      }
    }
  };

  const onCompleteAnimation = () => {
    setTimeout(() => {
      setIsAnimationComplete(true);
      onAnimationComplete();
    }, 600);
  };

  if (isAnimationComplete) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden"
      variants={containerVariants}
      initial="initial"
      exit="exit"
      animate={{ opacity: isAnimationComplete ? 0 : 1 }}
    >
      <div className="text-center">
        <motion.div
          className="overflow-hidden"
          initial="initial"
          animate="animate"
          onAnimationComplete={onCompleteAnimation}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            variants={textVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-blue-400">
              Hridyansh Sharma
            </span>
          </motion.h1>
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto rounded-full"
            variants={lineVariants}
          ></motion.div>
          
          <motion.p 
            className="text-gray-400 mt-8 text-sm uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 1
              }
            }}
          >
            Portfolio
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroAnimation;