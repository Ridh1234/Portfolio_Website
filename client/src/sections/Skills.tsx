import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";

const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      { name: "JavaScript/TypeScript", percentage: 90 },
      { name: "Python", percentage: 85 },
      { name: "C/C++", percentage: 75 },
      { name: "Java", percentage: 70 },
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "React.js", percentage: 92 },
      { name: "HTML5/CSS3", percentage: 88 },
      { name: "Next.js", percentage: 80 },
      { name: "Tailwind CSS", percentage: 85 },
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", percentage: 85 },
      { name: "Express.js", percentage: 82 },
      { name: "Django", percentage: 75 },
      { name: "RESTful APIs", percentage: 88 },
    ]
  },
  {
    category: "Data Science & ML",
    skills: [
      { name: "TensorFlow", percentage: 78 },
      { name: "PyTorch", percentage: 72 },
      { name: "Scikit-Learn", percentage: 80 },
      { name: "Data Visualization", percentage: 85 },
    ]
  }
];

const Skills = () => {
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
    <section className="py-20 px-6" id="skills" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 font-heading inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            Technical <span className="text-primary">Skills</span>
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
            My technical expertise spans various domains, with a focus on modern web development and machine learning technologies.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.category}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={categoryIndex}
              transition={{ delayChildren: 0.1 * categoryIndex }}
              className="bg-background-alt p-6 rounded-lg border border-border shadow-lg hover:shadow-primary/10 transition-all"
              data-cursor-interactive
            >
              <h3 className="text-xl font-semibold mb-6 text-secondary">{category.category}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    variants={itemVariants}
                    className="skill-item"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-text-primary">{skill.name}</span>
                      <span className="text-secondary">{skill.percentage}%</span>
                    </div>
                    <ProgressBar percentage={skill.percentage} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { icon: "fab fa-docker", name: "Docker", color: "text-blue-400" },
            { icon: "fab fa-git-alt", name: "Git", color: "text-orange-500" },
            { icon: "fab fa-aws", name: "AWS", color: "text-yellow-500" },
            { icon: "fab fa-figma", name: "Figma", color: "text-purple-400" },
            { icon: "fab fa-linux", name: "Linux", color: "text-yellow-300" },
            { icon: "fab fa-jenkins", name: "CI/CD", color: "text-red-500" },
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-md bg-background-alt hover:bg-background transition-all transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              data-cursor-interactive
            >
              <i className={`${item.icon} text-3xl ${item.color}`}></i>
              <span className="mt-2 text-sm text-text-secondary">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;