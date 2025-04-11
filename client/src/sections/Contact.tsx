import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section className="py-20 px-6" id="contact" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 font-heading inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: 80 } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="text-text-secondary mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Interested in working together? Feel free to reach out through the form below or connect with me on social media.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-heading text-primary">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-background-alt p-3 rounded-full mr-4">
                  <i className="fas fa-envelope text-secondary"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">Email</h4>
                  <a href="mailto:hridyansh.sharma@example.com" className="text-text-secondary hover:text-secondary transition-colors">
                    hridyansh.sharma@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-background-alt p-3 rounded-full mr-4">
                  <i className="fas fa-map-marker-alt text-secondary"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">Location</h4>
                  <p className="text-text-secondary">
                    Vadodara, Gujarat, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-background-alt p-3 rounded-full mr-4">
                  <i className="fas fa-phone text-secondary"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">Phone</h4>
                  <p className="text-text-secondary">
                    +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-text-primary">Connect with me</h4>
              <div className="flex space-x-4">
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
                    className="bg-background-alt hover:bg-primary text-text-secondary hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    data-cursor-interactive
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-text-secondary mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background-alt border border-border rounded-md py-2 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    data-cursor-interactive
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-text-secondary mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background-alt border border-border rounded-md py-2 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    data-cursor-interactive
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-text-secondary mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-background-alt border border-border rounded-md py-2 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  data-cursor-interactive
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-text-secondary mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-background-alt border border-border rounded-md py-2 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  data-cursor-interactive
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  data-cursor-interactive
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Sending</span>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="fas fa-paper-plane ml-2"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;