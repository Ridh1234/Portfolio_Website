import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { title: "About", href: "#about" },
    { title: "Skills", href: "#skills" },
    { title: "Projects", href: "#projects" },
    { title: "Achievements", href: "#achievements" },
    { title: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full bg-background/80 backdrop-blur-lg z-50 px-6 py-4 border-b transition-all duration-300 ${scrolled ? 'border-white/10' : 'border-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold font-heading text-white cursor-pointer">
            <span className="text-primary">H</span>.<span className="text-secondary">S</span>
          </a>
        </Link>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-text-primary hover:text-secondary transition-colors"
              data-cursor-interactive
            >
              {link.title}
            </a>
          ))}
        </div>
        <button 
          className="block md:hidden text-white"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          data-cursor-interactive
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-background/95 z-50 flex flex-col justify-center items-center md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button 
              className="absolute top-6 right-6 text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              data-cursor-interactive
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <div className="flex flex-col space-y-6 text-xl">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-text-primary hover:text-secondary transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                  data-cursor-interactive
                >
                  {link.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
