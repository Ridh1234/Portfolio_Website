import { Link } from "wouter";

const Footer = () => {
  const navLinks = [
    { title: "About", href: "#about" },
    { title: "Skills", href: "#skills" },
    { title: "Projects", href: "#projects" },
    { title: "Achievements", href: "#achievements" },
    { title: "Contact", href: "#contact" },
  ];
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-3xl font-bold font-heading mb-6">
          <span className="text-primary">H</span>ridyansh <span className="text-secondary">S</span>harma
        </div>
        
        <p className="text-text-secondary mb-6">Building the future, one line of code at a time.</p>
        
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 mb-8">
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
        </div>
        
        <div className="text-text-secondary text-sm">
          &copy; {currentYear} Hridyansh Sharma. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
