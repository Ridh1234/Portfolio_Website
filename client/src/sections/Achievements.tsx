import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Counter from "@/components/Counter";

const achievements = [
  {
    icon: "fas fa-trophy",
    value: 15,
    title: "Awards Won",
    description: "Recognized for excellence in hackathons and coding competitions."
  },
  {
    icon: "fas fa-project-diagram",
    value: 50,
    title: "Projects Completed",
    description: "Successfully delivered projects across different domains."
  },
  {
    icon: "fas fa-users",
    value: 120000,
    title: "Users Impacted",
    description: "Created solutions that improved user experiences."
  },
  {
    icon: "fas fa-lightbulb",
    value: 3,
    title: "Research Publications",
    description: "Published papers on AI and machine learning applications."
  }
];

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    year: 2024
  },
  {
    title: "TensorFlow Developer Certificate",
    organization: "Google",
    year: 2023
  },
  {
    title: "Full Stack Web Development",
    organization: "Meta",
    year: 2023
  },
  {
    title: "Machine Learning Specialization",
    organization: "Stanford University",
    year: 2022
  }
];

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-20 px-6 bg-background-alt" id="achievements" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 font-heading inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary">Achievements</span> & Certifications
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
            Recognition and professional development milestones that reflect my commitment to excellence.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-background p-6 rounded-lg border border-border shadow-lg hover:shadow-primary/10 text-center transform hover:-translate-y-1 transition-all"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.1 * index }}
              data-cursor-interactive
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`${item.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-3xl font-bold mb-2 text-text-primary">
                <Counter value={item.value} />
              </h3>
              <h4 className="text-lg font-semibold mb-2 text-secondary">{item.title}</h4>
              <p className="text-text-secondary text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-6 font-heading text-primary"
              variants={itemVariants}
            >
              Professional Certifications
            </motion.h3>
            <motion.div 
              className="space-y-5"
              variants={containerVariants}
            >
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  className="bg-background p-5 rounded-lg border border-border flex items-center hover:shadow-lg hover:shadow-primary/10 transition-all transform hover:-translate-y-1"
                  variants={itemVariants}
                  data-cursor-interactive
                >
                  <div className="mr-4 hidden sm:block">
                    <div className="w-12 h-12 bg-background-alt rounded-full flex items-center justify-center">
                      <span className="text-secondary font-bold">{cert.year}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">{cert.title}</h4>
                    <p className="text-text-secondary">
                      <span className="text-secondary">{cert.organization}</span>
                      <span className="text-xs ml-2 md:hidden">{cert.year}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-6 font-heading text-primary"
              variants={itemVariants}
            >
              Education & Training
            </motion.h3>
            <motion.div 
              className="bg-background p-6 rounded-lg border border-border h-full"
              variants={itemVariants}
            >
              <div className="timeline-container mb-0 h-full">
                <div className="timeline-dot mt-0"></div>
                <div className="pb-8">
                  <h4 className="text-lg font-semibold text-text-primary">B.Tech in Computer Science</h4>
                  <p className="text-secondary">IIIT Vadodara</p>
                  <p className="text-text-secondary text-sm">2022 - Present</p>
                  <p className="mt-2 text-text-secondary">Focusing on AI/ML, web technologies, and system architecture.</p>
                </div>
                
                <div className="timeline-dot"></div>
                <div className="pb-8">
                  <h4 className="text-lg font-semibold text-text-primary">Deep Learning Specialization</h4>
                  <p className="text-secondary">Coursera (Andrew Ng)</p>
                  <p className="text-text-secondary text-sm">2023</p>
                  <p className="mt-2 text-text-secondary">Mastered neural networks, optimization algorithms, and computer vision applications.</p>
                </div>
                
                <div className="timeline-dot"></div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">Full Stack Development Bootcamp</h4>
                  <p className="text-secondary">Udemy</p>
                  <p className="text-text-secondary text-sm">2022</p>
                  <p className="mt-2 text-text-secondary">Learned modern web development stack including React, Node.js, and MongoDB.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;