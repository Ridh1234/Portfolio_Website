import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background-alt py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <a className="text-2xl font-bold font-heading inline-block mb-4" data-cursor-interactive>
                <span className="text-primary">H</span>ridyansh <span className="text-secondary">S</span>harma
              </a>
            </Link>
            <p className="text-text-secondary mb-6 max-w-md">
              A software developer with expertise in full-stack development, machine learning, and artificial intelligence.
            </p>
            <div className="flex space-x-4 mb-6">
              {[
                { icon: "fab fa-github", link: "https://github.com" },
                { icon: "fab fa-linkedin", link: "https://linkedin.com" },
                { icon: "fab fa-twitter", link: "https://twitter.com" },
                { icon: "fab fa-instagram", link: "https://instagram.com" },
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-primary text-text-secondary hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  data-cursor-interactive
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
                { name: "Achievements", href: "#achievements" },
                { name: "Contact", href: "#contact" },
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-text-secondary hover:text-secondary transition-colors"
                    data-cursor-interactive
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-text-secondary">
                <i className="fas fa-envelope mr-2 text-secondary"></i>
                <a href="mailto:hridyansh.sharma@example.com" className="hover:text-secondary transition-colors" data-cursor-interactive>
                  hridyansh.sharma@example.com
                </a>
              </li>
              <li className="flex items-center text-text-secondary">
                <i className="fas fa-map-marker-alt mr-2 text-secondary"></i>
                <span>Vadodara, Gujarat, India</span>
              </li>
              <li className="flex items-center text-text-secondary">
                <i className="fas fa-phone mr-2 text-secondary"></i>
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            &copy; {currentYear} Hridyansh Sharma. All rights reserved.
          </p>
          <div className="text-text-secondary text-sm mt-4 md:mt-0">
            Designed & Developed with <i className="fas fa-heart text-red-500"></i> and <i className="fas fa-coffee text-yellow-600"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;