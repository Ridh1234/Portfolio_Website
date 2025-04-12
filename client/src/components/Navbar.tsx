import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { title: "About", href: "#about" },
    { title: "Skills", href: "#skills" },
    { title: "Projects", href: "#projects" },
    { title: "Achievements", href: "#achievements" },
    { title: "Contact", href: "#contact" },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className={`fixed top-0 left-0 w-full py-4 px-6 z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/80 backdrop-blur shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold font-heading" data-cursor-interactive>
            <span className="text-primary">H</span>ridyansh <span className="text-secondary">S</span>harma
          </a>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-text-secondary hover:text-secondary transition-colors"
              data-cursor-interactive
            >
              {link.title}
            </a>
          ))}
          
          <a
            href="#contact"
            className="px-5 py-2 bg-gradient-to-r from-primary to-blue-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
            data-cursor-interactive
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Hire Me
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text-secondary p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          data-cursor-interactive
        >
          <div className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
          <div className={`w-6 h-0.5 bg-current my-1.5 transition-all ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}></div>
          <div className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur pt-20 z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center space-y-6 py-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  className="text-xl text-text-secondary hover:text-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-cursor-interactive
                >
                  {link.title}
                </motion.a>
              ))}
              
              <motion.a
                href="#contact"
                className="mt-4 px-8 py-3 bg-gradient-to-r from-primary to-blue-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                data-cursor-interactive
              >
                Hire Me
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;