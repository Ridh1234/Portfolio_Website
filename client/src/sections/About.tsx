import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 * custom }
    })
  };

  return (
    <section id="about" className="py-20 px-6 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="text-4xl font-bold font-heading mb-4">About <span className="text-secondary">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-xl shadow-primary/20 transform hover:scale-105 transition-transform duration-500">
              <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <defs>
                  <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7928ca" />
                    <stop offset="100%" stopColor="#00e0ff" />
                  </linearGradient>
                </defs>
                <rect width="400" height="400" fill="#0a0a1a" />
                
                {/* Abstract code visualization */}
                <g fill="none" stroke="url(#codeGradient)" strokeWidth="1" opacity="0.7">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <path 
                      key={i} 
                      d={`M${i * 20},0 v400`} 
                      strokeDasharray="5,10"
                      strokeDashoffset={i % 2 === 0 ? "0" : "10"}
                    />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <path 
                      key={i + 20} 
                      d={`M0,${i * 20} h400`} 
                      strokeDasharray="5,10"
                      strokeDashoffset={i % 2 === 0 ? "0" : "10"}
                    />
                  ))}
                </g>
                
                {/* Code snippets */}
                <g fontFamily="Fira Code, monospace" fontSize="10">
                  <text x="50" y="80" fill="#00e0ff">{"function createAI() {"}</text>
                  <text x="70" y="100" fill="#a0a0a0">{"const model = new NeuralNetwork();"}</text>
                  <text x="70" y="120" fill="#a0a0a0">{"model.addLayers([]);"}</text>
                  <text x="70" y="140" fill="#a0a0a0">{"return model.train(data);"}</text>
                  <text x="50" y="160" fill="#00e0ff">{"}"}</text>
                  
                  <text x="50" y="200" fill="#ff2a6d">{"class Developer {"}</text>
                  <text x="70" y="220" fill="#a0a0a0">{"constructor(name, skills) {"}</text>
                  <text x="90" y="240" fill="#ffffff">{'this.name = "Hridyansh";'}</text>
                  <text x="90" y="260" fill="#ffffff">{'this.skills = ["ML", "JS", "React"];'}</text>
                  <text x="70" y="280" fill="#a0a0a0">{"}"}</text>
                  
                  <text x="70" y="310" fill="#a0a0a0">{"createProject(idea) {"}</text>
                  <text x="90" y="330" fill="#ffffff">{"return new Project(idea, this.skills);"}</text>
                  <text x="70" y="350" fill="#a0a0a0">{"}"}</text>
                  <text x="50" y="370" fill="#ff2a6d">{"}"}</text>
                </g>
              </svg>
            </div>
          </motion.div>
          
          <div>
            <motion.p 
              className="text-text-secondary mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I am a passionate software developer currently pursuing my degree at IIIT Vadodara International Campus Diu. My journey in tech is driven by a fascination with creating intelligent, user-friendly solutions that solve real-world problems.
            </motion.p>
            
            <motion.div 
              className="timeline-container mb-10"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="timeline-dot mt-0"></div>
              <div className="pb-8">
                <h3 className="text-xl font-semibold text-text-primary">Education</h3>
                <div className="mt-2 text-text-secondary">
                  <div className="font-heading text-secondary">IIIT Vadodara</div>
                  <div>B.Tech in Computer Science</div>
                  <div className="text-sm">2022 - Present</div>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: "fas fa-code",
                  color: "text-primary",
                  title: "Full-Stack Development",
                  description: "Building responsive, scalable applications with modern frameworks."
                },
                {
                  icon: "fas fa-brain",
                  color: "text-secondary",
                  title: "Machine Learning & AI",
                  description: "Developing intelligent systems that learn and adapt."
                },
                {
                  icon: "fas fa-project-diagram",
                  color: "text-primary",
                  title: "System Architecture",
                  description: "Designing efficient, scalable software architectures."
                },
                {
                  icon: "fas fa-chart-line",
                  color: "text-secondary",
                  title: "Problem Solving",
                  description: "Analytical approach to complex challenges."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-background-alt p-6 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-1"
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={gridItemVariants}
                  data-cursor-interactive
                >
                  <i className={`${item.icon} text-4xl ${item.color} mb-4`}></i>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
