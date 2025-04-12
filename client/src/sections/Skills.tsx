import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaPython,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaLinux
} from "react-icons/fa";
import {
  SiTypescript,
  SiCplusplus,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiDjango,
  SiFigma,
  SiMongodb,
  SiJenkins
} from "react-icons/si";

// Define skill interface
interface Skill {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

// Define category interface
interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Skill categories data
  const skillCategories: SkillCategory[] = [
    {
      id: "frontend",
      title: "FRONTEND",
      skills: [
        { id: "react", name: "React", icon: FaReact, color: "#61DAFB" },
        { id: "html", name: "HTML5", icon: FaHtml5, color: "#E34F26" },
        { id: "css", name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        { id: "tailwind", name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
        { id: "nextjs", name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      ]
    },
    {
      id: "backend",
      title: "BACKEND",
      skills: [
        { id: "nodejs", name: "Node.js", icon: FaNodeJs, color: "#68A063" },
        { id: "express", name: "Express.js", icon: SiExpress, color: "#000000" },
        { id: "django", name: "Django", icon: SiDjango, color: "#092E20" },
        { id: "mongodb", name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { id: "sql", name: "SQL", icon: FaDatabase, color: "#4479A1" },
      ]
    },
    {
      id: "languages",
      title: "LANGUAGES",
      skills: [
        { id: "javascript", name: "JavaScript", icon: FaJs, color: "#F0DB4F" },
        { id: "typescript", name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { id: "python", name: "Python", icon: FaPython, color: "#306998" },
        { id: "cpp", name: "C++", icon: SiCplusplus, color: "#00599C" },
        { id: "java", name: "Java", icon: FaJava, color: "#ED8B00" },
      ]
    },
    {
      id: "ai-ml",
      title: "AI & ML",
      skills: [
        { id: "tensorflow", name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
        { id: "pytorch", name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
        { id: "scikit", name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
      ]
    },
    {
      id: "devops",
      title: "DEVOPS & TOOLS",
      skills: [
        { id: "git", name: "Git", icon: FaGitAlt, color: "#F05032" },
        { id: "docker", name: "Docker", icon: FaDocker, color: "#2496ED" },
        { id: "aws", name: "AWS", icon: FaAws, color: "#FF9900" },
        { id: "figma", name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { id: "linux", name: "Linux", icon: FaLinux, color: "#FCC624" },
        { id: "jenkins", name: "Jenkins", icon: SiJenkins, color: "#D24939" },
      ]
    }
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <section ref={ref} id="skills" className="py-20 bg-[#111] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Technical <span className="text-primary">Skills</span>
        </motion.h2>

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              className="skill-category"
              custom={categoryIndex}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={sectionVariants}
            >
              <h3 className="text-3xl font-bold text-[#aaa] uppercase mb-8 tracking-wider">
                {category.title}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    className="flex items-center bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#222] transition-all duration-300 border border-[#333]"
                    custom={skillIndex}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: `0 0 20px ${skill.color}30`,
                      borderColor: skill.color 
                    }}
                  >
                    <div 
                      className="w-12 h-12 flex items-center justify-center mr-4 rounded-full bg-[#222] p-3"
                      style={{ color: skill.color }}
                    >
                      <skill.icon className="text-2xl" />
                    </div>
                    <span className="text-white font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;