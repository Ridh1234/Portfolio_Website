import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaTwitter, FaCopy, FaCheckCircle } from "react-icons/fa";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const { toast } = useToast();
  
  // State for the copy to clipboard functionality
  const [copied, setCopied] = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        setParticlesActive(true);
      }, 500);
    } else {
      setParticlesActive(false);
    }
  }, [isInView]);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      
      toast({
        title: "Email copied!",
        description: "Email address copied to clipboard",
        variant: "default",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  
  // Programming quotes
  const programmingQuotes = [
    {
      quote: "Programming isn't about what you know; it's about what you can figure out.",
      author: "Chris Pine"
    },
    {
      quote: "Clean code always looks like it was written by someone who cares.",
      author: "Robert C. Martin"
    },
    {
      quote: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House"
    }
  ];
  
  // Randomly select a quote
  const randomQuote = programmingQuotes[Math.floor(Math.random() * programmingQuotes.length)];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden" id="contact" ref={sectionRef}>
      {/* Code-inspired subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-2xl text-primary">{`{`}</div>
        <div className="absolute top-10 right-10 text-2xl text-primary">{`}`}</div>
        <div className="absolute bottom-10 left-10 text-2xl text-primary">{`<`}</div>
        <div className="absolute bottom-10 right-10 text-2xl text-primary">{`/>`}</div>
      </div>

      {/* Animated particles */}
      {particlesActive && (
        <div className="particles-container absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="particle absolute w-1 h-1 rounded-full bg-primary"
              initial={{ 
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{ 
                opacity: [0, 0.5, 0],
                x: window.innerWidth / 2 + Math.random() * 100 - 50,
                y: window.innerHeight / 2 + Math.random() * 100 - 50,
              }}
              transition={{ 
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 2
              }}
              style={{
                width: 1 + Math.random() * 2 + 'px',
                height: 1 + Math.random() * 2 + 'px',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Programming Quote */}
          <motion.div 
            className="mb-12 p-8 border border-primary/20 rounded-lg relative bg-gradient-to-br from-background/80 to-background-alt/80 backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="absolute top-0 left-0 text-4xl text-primary/40 -translate-x-1/2 -translate-y-1/2">{`"`}</div>
            <div className="absolute bottom-0 right-0 text-4xl text-primary/40 translate-x-1/2 translate-y-1/2">{`"`}</div>
            
            <p className="text-xl italic text-text-secondary mb-4 font-mono">
              <span className="text-primary">{`// `}</span>
              {randomQuote.quote}
            </p>
            <p className="text-right text-sm text-text-secondary">— {randomQuote.author}</p>
          </motion.div>

          <motion.h2 
            className="text-4xl font-bold mb-6 font-heading"
            variants={itemVariants}
          >
            Let's <span className="text-primary">Connect!</span>
          </motion.h2>
          
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full mx-auto"
            variants={itemVariants}
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto backdrop-blur-sm bg-background-alt/30 p-10 rounded-xl border border-primary/20 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-8">
            {/* Email */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-border/50 group hover:border-primary/50 transition-colors duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-text-secondary mb-1">Email</h4>
                  <p className="text-lg text-text-primary font-medium">sharmahridyansh3@gmail.com</p>
                </div>
              </div>
              <motion.button
                className="mt-4 md:mt-0 flex items-center space-x-2 text-text-secondary bg-background py-2 px-4 rounded-md hover:bg-primary/10 transition-all duration-300 group"
                onClick={() => copyToClipboard("sharmahridyansh3@gmail.com")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-interactive
              >
                {copied ? (
                  <>
                    <FaCheckCircle className="text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FaCopy className="group-hover:text-primary transition-colors duration-300" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>
            
            {/* Phone */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-border/50 group hover:border-primary/50 transition-colors duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-text-secondary mb-1">Phone</h4>
                  <p className="text-lg text-text-primary font-medium">+91 9024266007</p>
                </div>
              </div>
              <a
                href="tel:+919024266007"
                className="mt-4 md:mt-0 flex items-center space-x-2 text-text-secondary bg-background py-2 px-4 rounded-md hover:bg-primary/10 transition-all duration-300 group"
                data-cursor-interactive
              >
                <span className="group-hover:text-primary transition-colors duration-300">Call</span>
              </a>
            </div>
            
            {/* Location */}
            <div className="flex items-center p-4 border-b border-border/50 group hover:border-primary/50 transition-colors duration-300">
              <div className="p-3 rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-wider text-text-secondary mb-1">Location</h4>
                <p className="text-lg text-text-primary font-medium">Bhilwara, Rajasthan</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-wrap justify-center pt-8">
              <h4 className="w-full text-center text-text-secondary mb-6 uppercase tracking-wider text-sm">Find me on</h4>
              <div className="flex space-x-6">
                {[
                  { Icon: FaGithub, link: "https://github.com/Ridh1234", label: "GitHub" },
                  { Icon: FaLinkedin, link: "https://www.linkedin.com/in/hridyansh-sharma/", label: "LinkedIn" },
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background-alt hover:bg-primary/20 text-text-primary hover:text-primary p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.1 }}
                    data-cursor-interactive
                    aria-label={social.label}
                  >
                    <social.Icon className="text-2xl" />
                    <span className="text-xs mt-2">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Contact;