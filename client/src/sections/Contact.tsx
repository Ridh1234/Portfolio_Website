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
    <section className="py-20 relative overflow-hidden" id="contact" ref={sectionRef}>
      {/* Subtle accent glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Programming Quote */}
          <motion.div 
            className="modern-card p-6 mb-10"
            variants={itemVariants}
          >
            <p className="text-lg italic text-slate-400 mb-2 font-mono">
              <span className="text-primary">// </span>
              {randomQuote.quote}
            </p>
            <p className="text-right text-xs text-slate-500">— {randomQuote.author}</p>
          </motion.div>

          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            <span className="gradient-text">Get In Touch</span>
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto modern-card p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-0">
            {/* Email */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-1">Email</h4>
                  <p className="text-lg text-foreground font-medium">sharmahridyansh3@gmail.com</p>
                </div>
              </div>
              <motion.button
                className="mt-4 md:mt-0 modern-btn-outline"
                onClick={() => copyToClipboard("sharmahridyansh3@gmail.com")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-interactive
              >
                {copied ? (
                  <>
                    <FaCheckCircle className="text-emerald-400 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaCopy className="mr-2" />
                    Copy
                  </>
                )}
              </motion.button>
            </div>
            <div className="card-divider" />
            
            {/* Phone */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-1">Phone</h4>
                  <p className="text-lg text-foreground font-medium">+91 9024266007</p>
                </div>
              </div>
              <a
                href="tel:+919024266007"
                className="mt-4 md:mt-0 modern-btn-outline"
                data-cursor-interactive
              >
                Call
              </a>
            </div>
            <div className="card-divider" />
            
            {/* Location */}
            <div className="flex items-center p-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-1">Location</h4>
                <p className="text-lg text-foreground font-medium">Bhilwara, Rajasthan</p>
              </div>
            </div>
            <div className="card-divider" />
            
            {/* Social Links */}
            <div className="flex flex-wrap justify-center p-4">
              <h4 className="w-full text-center text-slate-400 mb-6 uppercase tracking-wider text-xs">Find me on</h4>
              <div className="flex gap-3 flex-wrap justify-center">
                {[
                  { Icon: FaGithub, link: "https://github.com/Ridh1234", label: "GitHub" },
                  { Icon: FaLinkedin, link: "https://www.linkedin.com/in/hridyansh-sharma/", label: "LinkedIn" },
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modern-btn-outline"
                    whileHover={{ y: -3, scale: 1.04 }}
                    data-cursor-interactive
                    aria-label={social.label}
                  >
                    <social.Icon className="text-base mr-2" />
                    {social.label}
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