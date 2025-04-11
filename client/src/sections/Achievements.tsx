import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Counter from "@/components/Counter";

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const competitiveProgramming = [
    {
      platform: "LeetCode",
      icon: "fas fa-trophy",
      description: "Ranked in top",
      value: 4.22,
      unit: "%",
      additionalText: "globally"
    },
    {
      platform: "CodeChef",
      icon: "fas fa-medal",
      description: "",
      value: 5,
      unit: "-star",
      additionalText: "coder with",
      rightValue: 2156,
      rightUnit: "",
      rightDescription: "rating"
    },
    {
      platform: "HackerRank",
      icon: "fas fa-award",
      description: "",
      value: "Gold Badge",
      unit: "",
      additionalText: "in Problem Solving"
    }
  ];
  
  const certifications = [
    {
      name: "Google TensorFlow Developer",
      icon: "fab fa-google",
      description: "Professional certification in ML model development"
    },
    {
      name: "AWS Certified Solutions Architect",
      icon: "fab fa-aws",
      description: "Expert-level cloud architecture certification"
    },
    {
      name: "National AI Challenge 2023",
      icon: "fas fa-laptop-code",
      description: "",
      prefix: "2nd place",
      value: "among",
      rightValue: 342,
      rightUnit: "",
      rightDescription: "teams"
    }
  ];
  
  const stats = [
    { label: "Projects Completed", value: 15 },
    { label: "Certifications", value: 6 },
    { label: "Hackathon Wins", value: 5 },
    { label: "Coding Problems Solved", value: 350, suffix: "+" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="achievements" className="py-20 px-6 bg-background-alt/50 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-heading mb-4">My <span className="text-primary">Achievements</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Coding Platforms */}
          <motion.div 
            className="bg-background/80 backdrop-blur p-8 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all group"
            variants={itemVariants}
            data-cursor-interactive
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mr-4 group-hover:animate-spin-slow">
                <i className="fas fa-code text-secondary text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Competitive Programming</h3>
                <p className="text-text-secondary">Excellence in coding challenges</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {competitiveProgramming.map((item, index) => (
                <div key={index} className="bg-background/60 p-4 rounded-lg flex items-center">
                  <div className="mr-4">
                    <i className={`${item.icon} text-2xl text-yellow-500`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">{item.platform}</h4>
                    <p className="text-text-secondary text-sm">
                      {item.description && <span>{item.description} </span>}
                      {typeof item.value === 'number' 
                        ? <Counter 
                            value={item.value} 
                            className="text-secondary font-bold" 
                            decimals={item.value % 1 !== 0 ? 2 : 0}
                          /> 
                        : <span className="text-secondary font-bold">{item.value}</span>
                      }
                      {item.unit && <span className="text-secondary font-bold">{item.unit}</span>}
                      {item.additionalText && <span> {item.additionalText}</span>}
                      {item.rightValue && (
                        <>
                          {" with "}
                          <Counter 
                            value={item.rightValue} 
                            className="text-secondary font-bold"
                            decimals={0}
                          />
                          {item.rightUnit && <span>{item.rightUnit}</span>}
                          {item.rightDescription && <span> {item.rightDescription}</span>}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Certifications & Awards */}
          <motion.div 
            className="bg-background/80 backdrop-blur p-8 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all group"
            variants={itemVariants}
            data-cursor-interactive
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-background-alt rounded-full flex items-center justify-center mr-4 group-hover:animate-spin-slow">
                <i className="fas fa-certificate text-primary text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Certifications & Awards</h3>
                <p className="text-text-secondary">Professional recognitions</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-background/60 p-4 rounded-lg flex items-center">
                  <div className="mr-4 text-secondary">
                    <i className={`${cert.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">{cert.name}</h4>
                    <p className="text-text-secondary text-sm">
                      {cert.prefix && <span className="text-secondary font-bold">{cert.prefix} </span>}
                      {cert.description || (
                        <>
                          {cert.value && <span>{cert.value} </span>}
                          {cert.rightValue && (
                            <Counter 
                              value={cert.rightValue} 
                              className="text-secondary font-bold"
                              decimals={0}
                            />
                          )}
                          {cert.rightUnit && <span>{cert.rightUnit}</span>}
                          {cert.rightDescription && <span> {cert.rightDescription}</span>}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Achievement Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-background/60 p-6 rounded-lg text-center hover:transform hover:-translate-y-2 transition-transform"
              whileHover={{ y: -8 }}
              custom={index}
              transition={{ duration: 0.3 }}
              data-cursor-interactive
            >
              <div className="text-4xl font-bold text-secondary mb-2">
                <Counter 
                  value={stat.value} 
                  decimals={0}
                  suffix={stat.suffix || ""}
                />
              </div>
              <div className="text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
