import { useState } from "react";
import { motion } from "framer-motion";

interface ProjectDetails {
  features: string[];
  achievement: string;
}

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  details: ProjectDetails;
}

interface ProjectCardProps {
  project: ProjectProps;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      className="bg-background-alt rounded-lg overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/10 transition-all"
      data-cursor-interactive
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
          {project.tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-primary/90 text-white text-xs rounded-full font-medium backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="px-3 py-1 bg-secondary/90 text-white text-xs rounded-full font-medium backdrop-blur-sm">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-text-primary">{project.title}</h3>
        <p className="text-text-secondary mb-4">{project.description}</p>
        
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 pb-2 border-t border-border">
            <h4 className="text-sm font-semibold text-primary mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 mb-4">
              {project.details.features.map((feature, index) => (
                <li key={index} className="text-sm text-text-secondary">{feature}</li>
              ))}
            </ul>
            
            <h4 className="text-sm font-semibold text-primary mb-1">Achievement:</h4>
            <p className="text-sm text-text-secondary">{project.details.achievement}</p>
          </div>
        </motion.div>
        
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={toggleDetails}
            className="text-sm font-medium text-secondary flex items-center"
          >
            {isExpanded ? (
              <>
                <span>Hide Details</span>
                <i className="fas fa-chevron-up ml-1 text-xs"></i>
              </>
            ) : (
              <>
                <span>View Details</span>
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </>
            )}
          </button>
          
          <a 
            href="#" 
            className="text-sm font-medium text-primary flex items-center"
            data-cursor-interactive
          >
            <span>Live Demo</span>
            <i className="fas fa-external-link-alt ml-1 text-xs"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;