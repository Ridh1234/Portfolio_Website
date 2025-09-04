import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ArrowDown, Github, Linkedin, Code, Mail } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

const socialLinks = [
  { 
    name: "LinkedIn", 
    url: "https://linkedin.com/in/hridyansh-sharma", 
    icon: Linkedin
  },
  { 
    name: "GitHub", 
    url: "https://github.com/Ridh1234?tab=repositories", 
    icon: Github
  },
  { 
    name: "CodeChef", 
    url: "https://www.codechef.com/users/ridyansh", 
    icon: Code
  },
  { 
    name: "LeetCode", 
    url: "https://leetcode.com/u/Ridh123/", 
    icon: SiLeetcode
  },
];

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Clean minimal hero - remove heavy patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 right-16 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-24 left-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-12"
          >
            {/* Main heading */}
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg font-medium text-emerald-400 tracking-wide uppercase"
              >
                Software Developer & AI Engineer
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="gradient-text">Hridyansh</span>
                <br />
                <span className="text-white">Sharma</span>
              </motion.h1>
            </div>

            {/* Typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl font-medium text-slate-300"
            >
              <Typewriter
                options={{
                  strings: [
                    "Building the Future with Code",
                    "Full Stack Development",
                    "Machine Learning & AI",
                    "Problem Solving Through Innovation"
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 40,
                }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
              Crafting exceptional digital experiences through clean code, innovative thinking, 
              and cutting-edge technology. Specialized in full-stack development, machine learning, 
              and artificial intelligence.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex justify-center space-x-6"
            >
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                    aria-label={link.name}
                  >
                    <IconComponent className="w-6 h-6 text-slate-300 group-hover:text-emerald-400 transition-colors duration-300" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                onClick={scrollToAbout}
                className="modern-btn group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform duration-300" />
              </motion.button>
              
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="modern-btn-outline group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>Get In Touch</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          className="p-3 rounded-full glass hover:bg-emerald-500/10 transition-all duration-300 group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to about section"
        >
          <ArrowDown className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
