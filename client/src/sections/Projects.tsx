import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const projects = [
    {
      title: "Neural Text-to-Speech",
      description: "A deep learning model that converts text to natural-sounding speech with emotion control.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["TensorFlow", "Python", "React"],
      details: {
        features: [
          "Custom neural network architecture",
          "Multiple voice profiles",
          "Emotional tone control",
          "Web interface for testing",
          "API for integration"
        ],
        achievement: "Achieved natural-sounding synthesis with 95% similarity to human speech in blind tests."
      }
    },
    {
      title: "Document Structure Analysis",
      description: "AI-powered system for extracting structured data from unstructured documents.",
      image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["PyTorch", "Flask", "Vue.js"],
      details: {
        features: [
          "Computer vision for layout analysis",
          "NLP for content extraction",
          "Support for multiple document types",
          "Interactive web dashboard",
          "Export to structured formats"
        ],
        achievement: "Reduced manual document processing time by 85% for a legal tech client."
      }
    },
    {
      title: "AI Hiring Assistant",
      description: "Intelligent system that automates candidate screening and initial interviews.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["GPT-4", "Node.js", "React"],
      details: {
        features: [
          "Resume parsing and analysis",
          "Dynamic question generation",
          "Sentiment analysis during interviews",
          "Candidate scoring system",
          "Integration with ATS platforms"
        ],
        achievement: "Implemented by 3 tech companies, reducing hiring costs by 40% and time-to-hire by 60%."
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="projects" className="py-20 px-6 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-heading mb-4">My <span className="text-secondary">Projects</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>
        
        {/* 3D Card Carousel */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={childVariants}
              custom={index}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a 
            href="#" 
            className="inline-block px-6 py-3 border border-secondary text-secondary rounded-full font-semibold hover:bg-secondary/10 transition-all"
            data-cursor-interactive
          >
            View All Projects <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
