import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: "fas fa-envelope",
      colorClass: "bg-primary/20",
      iconColorClass: "text-primary",
      title: "Email",
      content: "hridyansh@example.com",
      link: "mailto:hridyansh@example.com"
    },
    {
      icon: "fas fa-map-marker-alt",
      colorClass: "bg-secondary/20",
      iconColorClass: "text-secondary",
      title: "Location",
      content: "Vadodara, Gujarat, India"
    },
    {
      icon: "fas fa-phone",
      colorClass: "bg-primary/20",
      iconColorClass: "text-primary",
      title: "Phone",
      content: "+91 xxxx xxx xxx",
      link: "tel:+91xxxxxxxxxx"
    },
    {
      icon: "far fa-clock",
      colorClass: "bg-secondary/20",
      iconColorClass: "text-secondary",
      title: "Working Hours",
      content: "Mon - Fri: 9AM - 6PM"
    }
  ];
  
  const socialLinks = [
    { icon: "fab fa-github", link: "https://github.com" },
    { icon: "fab fa-linkedin-in", link: "https://linkedin.com" },
    { icon: "fab fa-twitter", link: "https://twitter.com" },
    { icon: "fab fa-instagram", link: "https://instagram.com" },
    { icon: "fab fa-medium-m", link: "https://medium.com" }
  ];

  return (
    <section id="contact" className="py-20 px-6 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-heading mb-4">Get In <span className="text-secondary">Touch</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-text-secondary mt-6 max-w-2xl mx-auto">Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Contact Form */}
          <motion.div 
            className="bg-background-alt rounded-xl p-8 shadow-lg shadow-primary/20"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            style={{ 
              perspective: "1000px", 
              transformStyle: "preserve-3d" 
            }}
            whileHover={{ 
              rotateY: 3, 
              rotateX: 3 
            }}
            data-cursor-interactive
          >
            <h3 className="text-2xl font-semibold mb-6 text-center text-text-primary">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-text-secondary mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-primary" 
                  required 
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
                  className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-primary" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-text-secondary mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-primary" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-text-secondary mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-primary resize-none" 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                  </>
                ) : "Send Message"}
              </button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className="bg-background-alt p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-1"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  data-cursor-interactive
                >
                  <div className={`w-12 h-12 ${info.colorClass} rounded-full flex items-center justify-center mb-4`}>
                    <i className={`${info.icon} ${info.iconColorClass}`}></i>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{info.title}</h4>
                  {info.link ? (
                    <a 
                      href={info.link} 
                      className="text-text-secondary hover:text-secondary transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-text-secondary">{info.content}</p>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Social Links */}
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6">Connect With Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.link} 
                    className="w-12 h-12 bg-background-alt rounded-full flex items-center justify-center text-text-secondary hover:text-secondary transition-all"
                    whileHover={{ scale: 1.1 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-interactive
                  >
                    <i className={`${social.icon} text-xl`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
