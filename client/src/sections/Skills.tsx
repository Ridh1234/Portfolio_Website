import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaPython, FaJs, FaReact, FaNodeJs, FaDatabase, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaAws, FaLinux } from "react-icons/fa";
import { SiTypescript, SiCplusplus, SiTensorflow, SiPytorch, SiScikitlearn, SiExpress, SiTailwindcss, SiNextdotjs, SiDjango, SiFigma, SiMongodb, SiJenkins } from "react-icons/si";

// Define skill data structure
type SkillType = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
};

// Skills section with a clean, professional layout
const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Skill categories with corresponding skills
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { id: "python", name: "Python", icon: FaPython, color: "#306998" },
        { id: "javascript", name: "JavaScript", icon: FaJs, color: "#F0DB4F" },
        { id: "typescript", name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { id: "cpp", name: "C++", icon: SiCplusplus, color: "#00599C" },
        { id: "java", name: "Java", icon: FaJava, color: "#ED8B00" }
      ]
    },
    {
      name: "Frontend Development",
      skills: [
        { id: "react", name: "React", icon: FaReact, color: "#61DAFB" },
        { id: "html", name: "HTML5", icon: FaHtml5, color: "#E34F26" },
        { id: "css", name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        { id: "tailwind", name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
        { id: "nextjs", name: "Next.js", icon: SiNextdotjs, color: "#000000" }
      ]
    },
    {
      name: "Backend Development",
      skills: [
        { id: "nodejs", name: "Node.js", icon: FaNodeJs, color: "#68A063" },
        { id: "express", name: "Express.js", icon: SiExpress, color: "#000000" },
        { id: "django", name: "Django", icon: SiDjango, color: "#092E20" },
        { id: "sql", name: "SQL", icon: FaDatabase, color: "#4479A1" },
        { id: "mongodb", name: "MongoDB", icon: SiMongodb, color: "#47A248" }
      ]
    },
    {
      name: "Machine Learning",
      skills: [
        { id: "tensorflow", name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
        { id: "pytorch", name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
        { id: "scikit", name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" }
      ]
    }
  ];

  // Tools & technologies
  const additionalTools = [
    { id: "git", name: "Git", icon: FaGitAlt, color: "#F05032" },
    { id: "docker", name: "Docker", icon: FaDocker, color: "#2496ED" },
    { id: "aws", name: "AWS", icon: FaAws, color: "#FF9900" },
    { id: "figma", name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { id: "linux", name: "Linux", icon: FaLinux, color: "#FCC624" },
    { id: "jenkins", name: "CI/CD", icon: SiJenkins, color: "#D24939" }
  ];

  // Animation variants
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
    <section id="skills" className="py-20 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            Technical <span className="text-primary">Skills</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"
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
            I specialize in a wide range of technologies, with particular expertise in web development and machine learning.
          </motion.p>
        </div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.name}
              className="bg-background-alt rounded-xl shadow-lg border border-border p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-primary border-b border-border pb-2">
                {category.name}
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Framework Categories (Left Side) */}
                <div className="space-y-4">
                  {category.skills.map(skill => (
                    <motion.div 
                      key={skill.id}
                      className="flex items-center gap-3"
                      variants={itemVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{ delay: 0.1 * categoryIndex }}
                    >
                      <skill.icon style={{ color: skill.color }} className="text-xl" />
                      <span className="text-text-primary">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Skill Icons (Right Side) */}
                <div className="flex flex-wrap justify-end items-center gap-4">
                  {category.skills.map(skill => (
                    <motion.div 
                      key={`icon-${skill.id}`}
                      className="p-3 rounded-full flex items-center justify-center bg-background hover:bg-background-alt transition-colors duration-300 border border-border/50"
                      style={{ color: skill.color }}
                      whileHover={{ scale: 1.1, boxShadow: `0 0 15px ${skill.color}30` }}
                      variants={itemVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{ delay: 0.2 * categoryIndex }}
                    >
                      <skill.icon className="text-2xl" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tools */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12"
        >
          <h3 className="text-xl font-semibold mb-6 text-center text-primary">Additional Tools</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
            {additionalTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="flex flex-col items-center justify-center p-4 rounded-md bg-background-alt hover:bg-background transition-all border border-border/50"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <tool.icon style={{ color: tool.color }} className="text-3xl mb-2" />
                <span className="text-sm text-text-secondary">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;