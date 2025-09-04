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
    <section className="py-20" id="achievements" ref={sectionRef}>
      <div className="section-container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title"><span className="gradient-text">Achievements</span></h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            A showcase of my technical proficiency and professional development milestones
          </p>
        </motion.div>
        
        {/* Competitive Programming Stats */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h3 
            variants={fadeIn}
            className="text-xl font-semibold mb-6 text-center text-blue-300"
          >
            Competitive Programming
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                transition={{ delay: 0.1 * index }}
                className="modern-card p-6 hover:border-primary/60"
                data-cursor-interactive
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center text-primary mr-4 border border-border">
                    <i className={`${item.icon} text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">{item.metric}</h4>
                    <p className="text-slate-400 text-sm font-medium">{item.title}</p>
                  </div>
                </div>
                <div className="card-divider my-3" />
                <p className="text-slate-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Two Column Layout for Certifications and Coursework */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certifications */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={fadeIn}
              className="text-xl font-semibold mb-6 text-blue-300"
            >
              Professional Development
            </motion.h3>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="modern-card p-6"
                  data-cursor-interactive
                >
                  <div className="flex items-start">
                    <div className="min-w-[60px] h-16 flex flex-col items-center justify-center mr-4">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border">
                        <span className="text-slate-300 font-bold">{cert.year}</span>
                      </div>
                    </div>
                    <div>
                      {cert.link ? (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-foreground hover:underline">
                          {cert.title}
                        </a>
                      ) : (
                        <h4 className="text-lg font-semibold text-foreground">{cert.title}</h4>
                      )}
                      <p className="text-slate-400 font-medium text-sm">{cert.organization}</p>
                      <div className="card-divider my-3" />
                      <p className="text-slate-400 text-sm">{cert.description}</p>
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
              className="text-xl font-semibold mb-6 text-blue-300"
            >
              Relevant Coursework
            </motion.h3>
            
            <motion.div 
              variants={fadeIn}
              className="modern-card p-6"
            >
              <div className="flex flex-wrap gap-3">
                {coursework.map((course, index) => (
                  <motion.span 
                    key={index}
                    variants={fadeIn}
                    transition={{ delay: 0.03 * index }}
                    className="modern-tag"
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
                <h4 className="font-semibold text-foreground mb-2">Educational Focus</h4>
                <p className="text-slate-400 text-sm">
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