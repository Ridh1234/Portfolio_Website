import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Add proper typing to the Counter component
interface CounterProps {
  value: number;
}

const Counter: React.FC<CounterProps> = ({ value }) => {
  return <span>{value}</span>;
};

const coursework: string[] = [
  "Data Structures",
  "Software Engineering",
  "Algorithms Analysis",
  "Database Management",
  "System Software",
  "Computer Architecture",
  "Object-Oriented Programming",
  "Computer Programming",
  "Machine Learning",
  "Computer Networks",
  "Artificial Intelligence",
  "Operating Systems"
];

interface Achievement {
  icon: string;
  metric: string;
  title: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    icon: "fas fa-shopping-cart",
    metric: "Semi Finals",
    title: "Flipkart Grid 7.0",
    description: "Reached semi-finals in Flipkart GRiD 7.0 engineering challenge"
  },
  {
    icon: "fas fa-trophy",
    metric: "Top 4.22%",
    title: "LeetCode Global Ranking",
    description: "Rating: 1911 with 300+ problems solved"
  },
  {
    icon: "fas fa-star",
    metric: "3-Star",
    title: "CodeChef Rating",
    description: "Rating: 1795, consistently solving complex algorithmic problems"
  },
  {
    icon: "fas fa-code",
    metric: "Round 2",
    title: "TCS CodeVita",
    description: "Competed against 200,000+ developers globally"
  },
  {
    icon: "fas fa-laptop-code",
    metric: "Finalist",
    title: "CODE-Voyage",
    description: "Secured second rank in Inter IIIT coding contest on HackerRank"
  }
  
];

interface Certification {
  link?: string;
  title: string;
  organization: string;
  description: string;
  year: number;
}

const certifications: Certification[] = [
  {
    title: "Fundamentals of Deep Learning",
    organization: "NVIDIA Deep Learning Institute",
    description: "Completed NVIDIA DLI course and earned certificate",
    year: 2025,
    link: "https://learn.nvidia.com/certificates?id=0YOdZ_t7RkOiDMhz1GqzZg"
  },
  {
    title: "Google Cloud Digital Leader",
    organization: "Google Cloud",
    description: "Completed extensive training in cloud architecture and deployment",
    year: 2023
  },
  {
    title: "Advanced C++ Programming and Data Structures",
    organization: "Udemy",
    description: "Mastered advanced programming concepts and implementations",
    year: 2022
  }
];

const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-background" id="achievements" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 font-heading">
            <span className="text-primary">Technical</span> Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
          <p className="text-text-secondary mt-6 max-w-2xl mx-auto">
            A showcase of my technical proficiency and professional development milestones
          </p>
        </motion.div>
        
        {/* Competitive Programming Stats */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.h3 
            variants={fadeIn}
            className="text-2xl font-bold mb-8 text-center font-heading text-primary"
          >
            Competitive Programming
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                transition={{ delay: 0.1 * index }}
                className="bg-background-alt rounded-lg border border-border shadow-md hover:shadow-lg hover:shadow-primary/10 transform hover:-translate-y-1 transition-all duration-300"
                data-cursor-interactive
              >
                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center text-primary mr-4 border border-border">
                      <i className={`${item.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-text-primary">{item.metric}</h4>
                      <p className="text-secondary text-sm font-medium">{item.title}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Two Column Layout for Certifications and Coursework */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Certifications */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={fadeIn}
              className="text-2xl font-bold mb-6 font-heading text-primary"
            >
              Professional Development
            </motion.h3>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-background-alt p-6 rounded-lg shadow-md border border-border hover:shadow-lg hover:shadow-primary/10 transition-all"
                  data-cursor-interactive
                >
                  <div className="flex items-start">
                    <div className="min-w-[60px] h-16 flex flex-col items-center justify-center mr-4">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border">
                        <span className="text-secondary font-bold">{cert.year}</span>
                      </div>
                    </div>
                    <div>
                      {cert.link ? (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-text-primary hover:underline">
                          {cert.title}
                        </a>
                      ) : (
                        <h4 className="text-lg font-semibold text-text-primary">{cert.title}</h4>
                      )}
                      <p className="text-secondary font-medium text-sm">{cert.organization}</p>
                      <p className="mt-2 text-text-secondary text-sm">{cert.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Coursework - Using Tags/Pills */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={fadeIn}
              className="text-2xl font-bold mb-6 font-heading text-primary"
            >
              Relevant Coursework
            </motion.h3>
            
            <motion.div 
              variants={fadeIn}
              className="bg-background-alt p-6 rounded-lg shadow-md border border-border"
            >
              <div className="flex flex-wrap gap-3">
                {coursework.map((course, index) => (
                  <motion.span 
                    key={index}
                    variants={fadeIn}
                    transition={{ delay: 0.03 * index }}
                    className="px-4 py-2 bg-background text-primary rounded-full text-sm font-medium border border-primary/30 hover:border-primary hover:bg-primary/5 transition-all cursor-default"
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
              
              <motion.div 
                variants={fadeIn}
                transition={{ delay: 0.5 }}
                className="mt-8 p-4 bg-background rounded-lg border border-border"
              >
                <h4 className="font-semibold text-text-primary mb-2">Educational Focus</h4>
                <p className="text-text-secondary text-sm">
                  Comprehensive curriculum covering core computer science principles, software development methodologies, and advanced topics in artificial intelligence and machine learning.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;