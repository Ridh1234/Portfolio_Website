import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaPython, FaJs, FaReact, FaNodeJs, FaDatabase, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaAws, FaLinux } from "react-icons/fa";
import { SiTypescript, SiCplusplus, SiTensorflow, SiPytorch, SiScikitlearn, SiExpress, SiTailwindcss, SiNextdotjs, SiDjango, SiFigma, SiMongodb, SiJenkins } from "react-icons/si";

// Force-directed graph bubble component for skills
const SkillBubbleGraph = ({ skills }: { skills: any[] }) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  useEffect(() => {
    const container = graphRef.current;
    if (!container) return;
    
    let animationId: number;
    const bubbles: Array<{ 
      element: HTMLElement, 
      x: number, y: number, 
      vx: number, vy: number, 
      radius: number,
      mass: number
    }> = [];
    
    // Initialize bubbles
    skills.forEach(skill => {
      const bubble = document.getElementById(`bubble-${skill.id}`);
      if (!bubble) return;
      
      // Set random initial position within container
      const radius = bubble.offsetWidth / 2;
      const x = Math.random() * (container.offsetWidth - radius * 2) + radius;
      const y = Math.random() * (container.offsetHeight - radius * 2) + radius;
      
      // Small random velocity
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = (Math.random() - 0.5) * 0.5;
      
      const mass = skill.level / 20; // Mass proportional to skill level
      
      bubbles.push({ element: bubble, x, y, vx, vy, radius, mass });
      
      // Position the bubble
      bubble.style.transform = `translate(${x - radius}px, ${y - radius}px)`;
    });
    
    // Animation loop
    const animate = () => {
      const containerRect = container.getBoundingClientRect();
      
      // Update positions
      bubbles.forEach(bubble => {
        // Apply some gravity towards center for containment
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        bubble.vx += (centerX - bubble.x) * 0.0001;
        bubble.vy += (centerY - bubble.y) * 0.0001;
        
        // Apply velocity
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        
        // Boundary collision
        if (bubble.x < bubble.radius) {
          bubble.x = bubble.radius;
          bubble.vx *= -0.7; // Dampen bounce
        } else if (bubble.x > containerRect.width - bubble.radius) {
          bubble.x = containerRect.width - bubble.radius;
          bubble.vx *= -0.7;
        }
        
        if (bubble.y < bubble.radius) {
          bubble.y = bubble.radius;
          bubble.vy *= -0.7;
        } else if (bubble.y > containerRect.height - bubble.radius) {
          bubble.y = containerRect.height - bubble.radius;
          bubble.vy *= -0.7;
        }
        
        // Apply friction to slow down
        bubble.vx *= 0.99;
        bubble.vy *= 0.99;
        
        // Update position
        bubble.element.style.transform = `translate(${bubble.x - bubble.radius}px, ${bubble.y - bubble.radius}px)`;
      });
      
      // Bubble collision
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const bubbleA = bubbles[i];
          const bubbleB = bubbles[j];
          
          // Calculate distance between bubbles
          const dx = bubbleB.x - bubbleA.x;
          const dy = bubbleB.y - bubbleA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check for collision
          const minDistance = bubbleA.radius + bubbleB.radius;
          if (distance < minDistance) {
            // Calculate collision normal
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Calculate relative velocity
            const relVelocityX = bubbleB.vx - bubbleA.vx;
            const relVelocityY = bubbleB.vy - bubbleA.vy;
            
            // Calculate relative velocity in terms of the normal direction
            const normalVelocity = relVelocityX * nx + relVelocityY * ny;
            
            // If bubbles are moving away from each other, skip
            if (normalVelocity > 0) continue;
            
            // Calculate impulse
            const impulse = (2 * normalVelocity) / (bubbleA.mass + bubbleB.mass);
            
            // Update velocities
            bubbleA.vx -= impulse * bubbleB.mass * nx;
            bubbleA.vy -= impulse * bubbleB.mass * ny;
            bubbleB.vx += impulse * bubbleA.mass * nx;
            bubbleB.vy += impulse * bubbleA.mass * ny;
            
            // Move them apart to avoid sticking
            const overlap = minDistance - distance;
            const moveX = (overlap * 0.5) * nx;
            const moveY = (overlap * 0.5) * ny;
            
            bubbleA.x -= moveX;
            bubbleA.y -= moveY;
            bubbleB.x += moveX;
            bubbleB.y += moveY;
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [skills]);
  
  return (
    <div 
      ref={graphRef} 
      className="w-full h-[500px] relative overflow-hidden rounded-xl border border-primary/20 bg-background-alt/50 backdrop-blur-sm"
    >
      {skills.map(skill => (
        <motion.div 
          id={`bubble-${skill.id}`}
          key={skill.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer"
          style={{ 
            width: `${60 + (skill.level / 5)}px`, 
            height: `${60 + (skill.level / 5)}px`,
            background: `radial-gradient(circle at 30% 30%, ${skill.color}, ${skill.darkColor})`,
            boxShadow: hoveredSkill === skill.id ? `0 0 20px 5px ${skill.color}50` : `0 0 10px rgba(0,0,0,0.2)`,
            border: `2px solid ${skill.color}30`,
            zIndex: hoveredSkill === skill.id ? 10 : 5
          }}
          onMouseEnter={() => setHoveredSkill(skill.id)}
          onMouseLeave={() => setHoveredSkill(null)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 15, 
            delay: Math.random() * 0.5
          }}
        >
          <skill.icon className="text-white text-xl" />
          
          {/* Skill info on hover */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full rounded-full flex flex-col items-center justify-center bg-background-alt/90 backdrop-blur-sm z-20 p-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredSkill === skill.id ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: hoveredSkill === skill.id ? 'auto' : 'none' }}
          >
            <p className="text-xs font-bold text-white">{skill.name}</p>
            <div className="w-full h-1 bg-background/50 rounded-full mt-1 mb-0.5">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${skill.level}%`, 
                  background: `linear-gradient(90deg, ${skill.darkColor}, ${skill.color})` 
                }}
              ></div>
            </div>
            <p className="text-[10px] text-text-secondary">{skill.experience}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// 3D Skill Cards for categories
const SkillCard = ({ category, skills, index, inView }: { 
  category: string;
  skills: any[];
  index: number;
  inView: boolean;
}) => {
  return (
    <motion.div 
      className="perspective-card relative transform transition-all duration-700 preserve-3d cursor-pointer group"
      style={{ height: '250px' }}
      initial={{ opacity: 0, y: 50, rotateY: 180 }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        rotateY: 0,
        transition: { delay: index * 0.2, duration: 0.8 }
      } : {}}
      whileHover={{ 
        rotateY: 180,
        z: 50,
        transition: { duration: 0.6 }
      }}
    >
      {/* Front side with category */}
      <div 
        className="absolute backface-hidden inset-0 bg-blue-gradient rounded-xl p-6 flex flex-col justify-center items-center shadow-lg transform transition-all duration-700"
      >
        <h3 className="text-2xl font-bold text-white mb-4">{category}</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {skills.map(skill => (
            <skill.icon key={skill.id} className="text-white text-3xl m-2" />
          ))}
        </div>
        <p className="text-white/80 text-sm mt-4 text-center">Hover to see details</p>
      </div>
      
      {/* Back side with skills */}
      <div 
        className="absolute backface-hidden inset-0 bg-background-alt rounded-xl p-6 shadow-lg transform rotateY-180 transition-all duration-700 border border-primary/20"
      >
        <h3 className="text-xl font-bold text-primary mb-4">{category}</h3>
        <div className="space-y-3">
          {skills.map(skill => (
            <div key={skill.id} className="skill-item">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <skill.icon className="mr-2 text-sm" style={{ color: skill.color }} />
                  <span className="text-text-primary text-sm">{skill.name}</span>
                </div>
                <span className="text-xs text-primary">{skill.level}%</span>
              </div>
              <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                <motion.div 
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${skill.darkColor}, ${skill.color})` }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Skills component
const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  // Skill data with icons, colors, and relationships
  const skillsData = [
    { 
      id: "python", 
      name: "Python", 
      level: 90, 
      color: "#306998", 
      darkColor: "#1E415E", 
      lightColor: "#4B8BBE", 
      icon: FaPython, 
      experience: "Advanced",
      category: "Languages"
    },
    { 
      id: "javascript", 
      name: "JavaScript", 
      level: 85, 
      color: "#F0DB4F", 
      darkColor: "#B3A03A", 
      lightColor: "#F4E45E", 
      icon: FaJs, 
      experience: "Advanced",
      category: "Languages"
    },
    { 
      id: "typescript", 
      name: "TypeScript", 
      level: 80, 
      color: "#3178C6", 
      darkColor: "#265D99", 
      lightColor: "#4E94E3", 
      icon: SiTypescript, 
      experience: "Proficient",
      category: "Languages"
    },
    { 
      id: "cpp", 
      name: "C++", 
      level: 75, 
      color: "#00599C", 
      darkColor: "#004477", 
      lightColor: "#0076CF", 
      icon: SiCplusplus, 
      experience: "Proficient",
      category: "Languages"
    },
    { 
      id: "java", 
      name: "Java", 
      level: 70, 
      color: "#ED8B00", 
      darkColor: "#B56C00", 
      lightColor: "#FFAA33", 
      icon: FaJava, 
      experience: "Proficient",
      category: "Languages"
    },
    { 
      id: "react", 
      name: "React", 
      level: 92, 
      color: "#61DAFB", 
      darkColor: "#3EAACC", 
      lightColor: "#7FE7FF", 
      icon: FaReact, 
      experience: "Advanced",
      category: "Frontend"
    },
    { 
      id: "html", 
      name: "HTML5", 
      level: 88, 
      color: "#E34F26", 
      darkColor: "#B33D1E", 
      lightColor: "#F16529", 
      icon: FaHtml5, 
      experience: "Advanced",
      category: "Frontend"
    },
    { 
      id: "css", 
      name: "CSS3", 
      level: 88, 
      color: "#1572B6", 
      darkColor: "#105A8C", 
      lightColor: "#33A9E0", 
      icon: FaCss3Alt, 
      experience: "Advanced",
      category: "Frontend"
    },
    { 
      id: "tailwind", 
      name: "Tailwind CSS", 
      level: 85, 
      color: "#38B2AC", 
      darkColor: "#2C8F8A", 
      lightColor: "#4FD1CB", 
      icon: SiTailwindcss, 
      experience: "Advanced",
      category: "Frontend"
    },
    { 
      id: "nextjs", 
      name: "Next.js", 
      level: 80, 
      color: "#000000", 
      darkColor: "#000000", 
      lightColor: "#666666", 
      icon: SiNextdotjs, 
      experience: "Proficient",
      category: "Frontend"
    },
    { 
      id: "nodejs", 
      name: "Node.js", 
      level: 85, 
      color: "#68A063", 
      darkColor: "#4B7445", 
      lightColor: "#8FC587", 
      icon: FaNodeJs, 
      experience: "Advanced",
      category: "Backend"
    },
    { 
      id: "express", 
      name: "Express.js", 
      level: 82, 
      color: "#000000", 
      darkColor: "#000000", 
      lightColor: "#666666", 
      icon: SiExpress, 
      experience: "Proficient",
      category: "Backend"
    },
    { 
      id: "django", 
      name: "Django", 
      level: 75, 
      color: "#092E20", 
      darkColor: "#051E14", 
      lightColor: "#0F4D33", 
      icon: SiDjango, 
      experience: "Proficient",
      category: "Backend"
    },
    { 
      id: "sql", 
      name: "SQL", 
      level: 75, 
      color: "#4479A1", 
      darkColor: "#325C7A", 
      lightColor: "#5A9ACC", 
      icon: FaDatabase, 
      experience: "Proficient",
      category: "Backend"
    },
    { 
      id: "mongodb", 
      name: "MongoDB", 
      level: 70, 
      color: "#47A248", 
      darkColor: "#367934", 
      lightColor: "#5DC45F", 
      icon: SiMongodb, 
      experience: "Proficient",
      category: "Backend"
    },
    { 
      id: "tensorflow", 
      name: "TensorFlow", 
      level: 78, 
      color: "#FF6F00", 
      darkColor: "#CC5900", 
      lightColor: "#FF8B33", 
      icon: SiTensorflow, 
      experience: "Proficient",
      category: "ML"
    },
    { 
      id: "pytorch", 
      name: "PyTorch", 
      level: 72, 
      color: "#EE4C2C", 
      darkColor: "#C53D23", 
      lightColor: "#F27052", 
      icon: SiPytorch, 
      experience: "Proficient",
      category: "ML"
    },
    { 
      id: "scikit", 
      name: "Scikit-Learn", 
      level: 80, 
      color: "#F7931E", 
      darkColor: "#C47318", 
      lightColor: "#F9B367", 
      icon: SiScikitlearn, 
      experience: "Proficient",
      category: "ML"
    }
  ];

  // Additional tools
  const toolsData = [
    { id: "git", name: "Git", icon: FaGitAlt, color: "#F05032" },
    { id: "docker", name: "Docker", icon: FaDocker, color: "#2496ED" },
    { id: "aws", name: "AWS", icon: FaAws, color: "#FF9900" },
    { id: "figma", name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { id: "linux", name: "Linux", icon: FaLinux, color: "#FCC624" },
    { id: "jenkins", name: "CI/CD", icon: SiJenkins, color: "#D24939" },
  ];

  // Group skills by category
  const languageSkills = skillsData.filter(skill => skill.category === "Languages");
  const frontendSkills = skillsData.filter(skill => skill.category === "Frontend");
  const backendSkills = skillsData.filter(skill => skill.category === "Backend");
  const mlSkills = skillsData.filter(skill => skill.category === "ML");
  
  const skillCategories = [
    { name: "Programming Languages", skills: languageSkills },
    { name: "Frontend Development", skills: frontendSkills },
    { name: "Backend Development", skills: backendSkills },
    { name: "Machine Learning", skills: mlSkills }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section id="skills" className="py-20 bg-background-alt relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-text-primary text-center">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-center mb-8">
            I specialize in a range of technologies for software development, with expertise in web technologies and machine learning.
          </p>
        </motion.div>

        {/* Force-directed bubbles (desktop view) */}
        <div className="hidden md:block mb-20">
          <SkillBubbleGraph skills={skillsData} />
        </div>
        
        {/* 3D Skill Cards (all views) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <SkillCard 
              key={category.name}
              category={category.name}
              skills={category.skills}
              index={index}
              inView={isInView}
            />
          ))}
        </div>
        
        {/* Additional tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">Additional Tools</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {toolsData.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="bg-background/30 backdrop-blur-sm border border-border p-4 rounded-lg flex flex-col items-center hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <tool.icon style={{ color: tool.color }} className="text-3xl mb-2" />
                <span className="text-text-secondary text-sm">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;