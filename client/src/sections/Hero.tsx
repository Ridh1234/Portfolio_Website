import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaDownload } from "react-icons/fa";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import photo11 from './photo11.jpg';

// Define social links
const socialLinks = [
  { name: "LinkedIn", url: "https://linkedin.com/in/hridyansh-sharma", icon: FaLinkedin, color: "#0A66C2" },
  { name: "GitHub", url: "https://github.com/Ridh1234?tab=repositories", icon: FaGithub, color: "#F0F6FC" },
  { name: "CodeChef", url: "https://www.codechef.com/users/ridyansh", icon: FaCode, color: "#5B4638" },
  { name: "LeetCode", url: "https://leetcode.com/u/Ridh123/", icon: SiLeetcode, color: "#FFA116" },
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set up the particles background
    const backgroundContainer = backgroundRef.current;
    if (backgroundContainer) {
      // Number of particles
      const particleCount = 100;
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-primary/20';
        
        // Random size between 2-8px
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Add blur effect
        particle.style.filter = `blur(${Math.random() * 2}px)`;
        
        // Random opacity
        particle.style.opacity = `${0.1 + Math.random() * 0.5}`;
        
        // Add animation with random delay
        particle.style.animation = `floating ${5 + Math.random() * 10}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        backgroundContainer.appendChild(particle);
      }
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-20" id="hero" ref={heroRef}>
      {/* Animated background */}
      <div 
        ref={backgroundRef} 
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-alt z-0 overflow-hidden"
      >
        {/* Dots will be created by JavaScript */}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="z-10">
          <div className="text-sm text-primary font-mono mb-4">Hello, I'm</div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-heading mb-6 text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-blue-400">
              Hridyansh Sharma
            </span>
          </motion.h1>
          <div className="h-8 overflow-hidden relative">
            <Typewriter
              options={{
                strings: ['Software Developer', 'Full-Stack Developer', 'ML Engineer', 'AI Enthusiast'],
                autoStart: true,
                loop: true,
                wrapperClassName: 'text-xl md:text-2xl font-mono text-text-primary',
                cursorClassName: 'text-primary',
              }}
            />
          </div>
          <motion.p 
            className="text-text-secondary mt-6 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Specializing in full-stack development, machine learning, and artificial intelligence. Building digital experiences that blend creativity with technical precision.
          </motion.p>
          <motion.div 
            className="flex flex-wrap space-x-0 space-y-3 md:space-y-0 md:space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#projects" 
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-blue-400 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center"
              data-cursor-interactive
            >
              <span>View Projects</span>
            </a>
            <a 
              href="#contact" 
              className="w-full md:w-auto px-6 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all flex items-center justify-center"
              data-cursor-interactive
            >
              <span>Contact Me</span>
            </a>
            <a 
              href="/Hridyansh_Resume.pdf" 
              className="w-full md:w-auto px-6 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition-all flex items-center justify-center"
              data-cursor-interactive
              download
            >
              <FaDownload className="mr-2" />
              <span>Download CV</span>
            </a>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon p-3 bg-background-alt rounded-full transition-all duration-300 border border-border hover:border-primary hover:shadow-lg"
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: `0 10px 25px -5px ${social.color}40`
                }}
                custom={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                data-cursor-interactive
                style={{ color: social.color }}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <div className="relative z-10">
          <motion.div 
            className="relative h-[300px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Image container - replace with your own image */}
            <div className="h-full w-full relative">
              {/* Replace the src with your own image path */}
              <img 
  src={photo11} 
  alt="Hridyansh Sharma" 
  className="object-cover h-full w-full rounded-lg"
            />

              
              {/* Optional overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-lg"></div>
              
              {/* Optional decorative elements */}
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-mono text-primary">
                Software Developer & AI Enthusiast
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div>
          <i className="fas fa-chevron-down text-primary"></i>
          <div className="text-xs text-text-secondary mt-2">Scroll Down</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;