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
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="card-3d h-[450px] group"
      onClick={handleFlip}
      data-cursor-interactive
    >
      <div 
        className="card-inner w-full h-full transition-transform duration-800 preserve-3d"
        style={{ 
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Card Front */}
        <div 
          className="card-front bg-background-alt rounded-xl overflow-hidden shadow-lg shadow-primary/20 p-6 flex flex-col absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex-1">
            <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
              <img 
                src={project.image}
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-background-alt to-transparent"></div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-text-primary">{project.title}</h3>
            <p className="text-text-secondary text-sm">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className={`px-2 py-1 ${
                  index % 2 === 0 ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                } text-xs rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Card Back */}
        <div 
          className="card-back bg-background-alt rounded-xl overflow-hidden shadow-lg shadow-primary/20 p-6 flex flex-col absolute w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-xl font-semibold mb-4 text-text-primary">Project Details</h3>
          
          <div className="flex-1">
            <ul className="space-y-2 text-text-secondary text-sm mb-6">
              {project.details.features.map((feature, i) => (
                <li key={i}>
                  <i className="fas fa-check text-secondary mr-2"></i> {feature}
                </li>
              ))}
            </ul>
            
            <div className="bg-background/50 p-4 rounded-lg">
              <div className="text-xs font-mono text-text-secondary mb-2">Key Achievement:</div>
              <p className="text-sm text-text-primary">{project.details.achievement}</p>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <a 
              href="#" 
              className="px-4 py-2 bg-primary/20 text-primary text-sm rounded-lg flex items-center hover:bg-primary/30 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fab fa-github mr-2"></i> View Code
            </a>
            <a 
              href="#" 
              className="px-4 py-2 bg-secondary/20 text-secondary text-sm rounded-lg flex items-center hover:bg-secondary/30 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-external-link-alt mr-2"></i> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
