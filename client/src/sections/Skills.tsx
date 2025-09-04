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
  FaLinux,
  FaRobot
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
  SiJenkins,
  SiVite,
  SiSupabase,
  SiFastapi,
  SiChartdotjs,
  SiHuggingface,
  SiSqlite
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
      title: "Frontend",
      skills: [
        { id: "react", name: "React", icon: FaReact, color: "#61DAFB" },
        { id: "html", name: "HTML5", icon: FaHtml5, color: "#E34F26" },
        { id: "css", name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        { id: "tailwind", name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
        { id: "nextjs", name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { id: "vite", name: "Vite", icon: SiVite, color: "#646CFF" },
        { id: "chartjs", name: "Chart.js", icon: SiChartdotjs, color: "#FF6384" },
        { id: "jspdf", name: "jsPDF", icon: FaJs, color: "#E02521" },
      ]
    },
    {
      id: "backend",
      title: "Backend",
      skills: [
        { id: "nodejs", name: "Node.js", icon: FaNodeJs, color: "#68A063" },
        { id: "express", name: "Express.js", icon: SiExpress, color: "#000000" },
        { id: "mongodb", name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { id: "sql", name: "SQL", icon: FaDatabase, color: "#4479A1" },
        { id: "fastapi", name: "FastAPI", icon: SiFastapi, color: "#009688" },
        { id: "supabase", name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
        { id: "sqlite", name: "SQLite", icon: SiSqlite, color: "#003B57" },
      ]
    },
    {
      id: "languages",
      title: "Languages",
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
        { id: "huggingface", name: "Hugging Face", icon: SiHuggingface, color: "#FFCC00" },
        { id: "langchain", name: "LangChain", icon: FaRobot, color: "#2A2A72" },
        { id: "chromadb", name: "ChromaDB", icon: FaDatabase, color: "#FF6F91" },
      ]
    },
    {
      id: "devops",
      title: "DevOps & Tools",
      skills: [
        { id: "git", name: "Git", icon: FaGitAlt, color: "#F05032" },
        { id: "docker", name: "Docker", icon: FaDocker, color: "#2496ED" },
        { id: "aws", name: "AWS", icon: FaAws, color: "#FF9900" },
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
    <section ref={ref} id="skills" className="py-20 relative overflow-hidden">
      {/* Subtle accent glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        <motion.h2
          className="section-title text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-text">Skills</span>
        </motion.h2>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              custom={categoryIndex}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={sectionVariants}
              className="modern-card p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 tracking-wide">{category.title}</h3>
              <div className="card-divider mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    className="modern-card p-4 flex items-center hover:border-primary/60"
                    custom={skillIndex}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div 
                      className="w-10 h-10 flex items-center justify-center mr-4 rounded-full bg-background"
                      style={{ color: skill.color }}
                    >
                      <skill.icon className="text-xl" />
                    </div>
                    <span className="text-foreground font-medium">{skill.name}</span>
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