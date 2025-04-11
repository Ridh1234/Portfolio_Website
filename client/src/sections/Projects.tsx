import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "AI-Powered Health Assistant",
    description: "A machine learning powered application that helps users track health metrics and provides personalized recommendations.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    tags: ["Python", "TensorFlow", "React", "Node.js"],
    details: {
      features: [
        "Real-time health analytics",
        "Personalized fitness recommendations",
        "Meal planning based on health goals",
        "Integration with wearable devices"
      ],
      achievement: "Featured in Health Tech Magazine and reached 50,000+ users in first month."
    }
  },
  {
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce solution with advanced product filtering, user authentication, and payment processing.",
    image: "https://images.unsplash.com/photo-1600267165086-a3f6dd7a2d7b?auto=format&fit=crop&q=80&w=600",
    tags: ["React", "Express", "MongoDB", "Stripe API"],
    details: {
      features: [
        "Advanced product search and filtering",
        "Secure payment processing",
        "User account management",
        "Order tracking and history"
      ],
      achievement: "Increased client's online sales by 137% within first quarter of launch."
    }
  },
  {
    title: "Smart City Dashboard",
    description: "A real-time data visualization dashboard for monitoring city infrastructure, traffic patterns, and energy consumption.",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&q=80&w=600",
    tags: ["D3.js", "React", "Node.js", "WebSockets"],
    details: {
      features: [
        "Real-time data processing",
        "Interactive map visualizations",
        "Anomaly detection algorithms",
        "Customizable admin dashboard"
      ],
      achievement: "Helped city planners reduce traffic congestion by 22% in targeted areas."
    }
  },
  {
    title: "Blockchain-based Voting System",
    description: "A secure, transparent voting platform built on blockchain technology to ensure election integrity and voter privacy.",
    image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80&w=600",
    tags: ["Solidity", "Ethereum", "React", "Web3.js"],
    details: {
      features: [
        "Secure voter authentication",
        "Immutable vote recording",
        "Real-time results tabulation",
        "Audit trail capabilities"
      ],
      achievement: "Successfully used in university student elections with 12,000+ participants."
    }
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  return (
    <section className="py-20 px-6" id="projects" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 font-heading inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            Featured <span className="text-primary">Projects</span>
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
            A selection of my recent work across various domains, showcasing my technical versatility and problem-solving approach.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <ProjectCard 
                project={project}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-secondary text-secondary rounded-full font-semibold hover:bg-secondary/10 transition-all"
            data-cursor-interactive
          >
            View All Projects
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;