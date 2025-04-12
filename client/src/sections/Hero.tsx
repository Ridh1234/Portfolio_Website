import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import * as THREE from "three";
import Typewriter from "typewriter-effect";
import ShaderBackground from "@/components/ShaderBackground";
import HeroCanvas from "@/components/HeroCanvas";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  
  const techIcons = [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  ];

  useEffect(() => {
    // Set loaded state after a short delay to allow for initial animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
      controls.start("visible");
    }, 500);

    return () => clearTimeout(timer);
  }, [controls]);
  
  useEffect(() => {
    // Add scroll-triggered animations for the text elements
    if (!textContainerRef.current || !isLoaded) return;
    
    const textElements = textContainerRef.current.querySelectorAll('div, p, h1, a');
    
    gsap.fromTo(
      textElements,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      }
    );
  }, [isLoaded]);

  return (
    <section 
      className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden" 
      id="hero" 
      ref={heroRef}
    >
      {/* Shader Background with WebGL effects */}
      <div className="absolute inset-0 z-0">
        <ShaderBackground />
      </div>
      
      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 z-50 bg-background flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              className="w-20 h-20 border-4 border-t-primary border-r-secondary border-b-primary border-l-secondary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              className="mt-6 text-text-primary font-mono"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Initializing Experience...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        <div className="z-10" ref={textContainerRef}>
          <motion.div 
            className="text-sm text-secondary font-mono mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            data-cursor-text="Welcome!"
          >
            Hello, I'm
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-heading mb-6 text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.1 }}
            data-cursor-magnetic
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
              Hridyansh Sharma
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
              />
            </span>
          </motion.h1>
          
          <motion.div 
            className="h-10 overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typewriter
              options={{
                strings: [
                  'Software Developer', 
                  'Full-Stack Developer', 
                  'ML Engineer', 
                  'AI Enthusiast',
                  'UX Innovator'
                ],
                autoStart: true,
                loop: true,
                wrapperClassName: 'text-xl md:text-2xl font-mono text-text-primary',
                cursorClassName: 'text-secondary',
              }}
            />
          </motion.div>
          
          <motion.p 
            className="text-text-secondary mt-6 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Crafting immersive digital experiences at the intersection of design and technology. 
            Specializing in front-end innovation, machine learning integration, and creating 
            interfaces that captivate and inspire.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap md:flex-nowrap gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a 
              href="#projects" 
              className="relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -15px rgba(121, 40, 202, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              data-cursor-magnetic
            >
              <span className="relative z-10">View Projects</span>
              <motion.span 
                className="absolute inset-0 bg-white z-0"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className="relative px-8 py-4 border-2 border-secondary text-secondary rounded-full font-semibold overflow-hidden group"
              whileHover={{ 
                scale: 1.05, 
                borderColor: "rgba(0, 224, 255, 1)"
              }}
              whileTap={{ scale: 0.95 }}
              data-cursor-magnetic
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Contact Me
              </span>
              <motion.span 
                className="absolute inset-0 bg-secondary z-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-5 mt-12"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {techIcons.map((tech, index) => (
              <motion.div 
                key={tech.name}
                className="tech-icon p-3 bg-background-alt/80 backdrop-blur-sm rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/20 border border-border"
                whileHover={{ 
                  scale: 1.2, 
                  boxShadow: "0 0 20px rgba(121, 40, 202, 0.4)",
                  borderColor: "rgba(121, 40, 202, 0.8)" 
                }}
                custom={index}
                initial={{ opacity: 0, x: -20, rotate: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  rotate: 0,
                  transition: { 
                    delay: 1.2 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }
                }}
                data-cursor-text={tech.name}
              >
                <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="relative h-[400px] md:h-[600px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* 3D Interactive Canvas */}
          <HeroCanvas />
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        data-cursor-text="Scroll Down"
      >
        <div className="relative">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin-slow"
          >
            <circle cx="20" cy="20" r="19" stroke="url(#paint0_linear)" strokeWidth="2"/>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7928CA"/>
                <stop offset="1" stopColor="#00E0FF"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <i className="fas fa-chevron-down text-secondary text-lg"></i>
          </div>
          <motion.div 
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 text-xs text-text-secondary"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll Down
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
