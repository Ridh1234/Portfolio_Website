import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Farnodes",
    role: "AI Intern",
    period: "May 2025 – July 2025",
    location: "Remote",
    responsibilities: [
      "Led development of AgentXN, an offline agentic AI system supporting multi-intent handling, memory-aware dialogue, and task automation via modular MCP servers.",
      "Integrated key modules like Smart Calendar, To-Do Tracker, Reminders, and Local File Assistant with structured JSON-based intent parsing and FastAPI backend.",
      "Engineered multi-tiered memory system (short-term, working, long-term) and custom RAG pipeline using LangChain + ChromaDB for personalized context retrieval.",
      "Fine-tuned Gemma-1B with prompt engineering for concurrent task threads; built responsive HTML/CSS/JS frontend for chat, memory, and agent module control."
    ]
  }
];

const Experience = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" ref={ref} className="py-20 bg-background relative overflow-hidden">
      {/* Animated background highlights */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-indigo-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Work <span className="text-blue-400 relative">
            Experience
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line with glow */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="mb-12 relative pl-16"
            >
              {/* Dot with pulsing glow */}
              <motion.div 
                className="absolute left-4 top-6 w-4 h-4 bg-blue-400 rounded-full ring-4 ring-gray-900 border-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10"
                animate={{ 
                  boxShadow: [
                    "0_0_20px_rgba(59,130,246,0.8)",
                    "0_0_30px_rgba(59,130,246,1)",
                    "0_0_20px_rgba(59,130,246,0.8)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: idx * 0.5
                }}
              />

              <motion.div 
                className="bg-transparent border border-gray-700/30 rounded-xl p-8 shadow-2xl hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:border-blue-500/50 relative overflow-hidden backdrop-blur-[2px]"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Card hover highlight overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 rounded-xl"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="mb-6 relative z-10">
                  <motion.h3 
                    className="text-xl font-bold text-white mb-2 relative"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.2 + 0.3 }}
                  >
                    {exp.role}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent blur-sm"
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={isInView ? { x: "100%", opacity: [0, 1, 0] } : {}}
                      transition={{ 
                        duration: 1.5, 
                        delay: idx * 0.3 + 1,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <motion.p 
                      className="text-blue-400 font-semibold text-lg relative"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: idx * 0.2 + 0.4 }}
                    >
                      @ {exp.company}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-sm"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={isInView ? { x: "100%", opacity: [0, 1, 0] } : {}}
                        transition={{ 
                          duration: 1.5, 
                          delay: idx * 0.3 + 1.3,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                      <motion.span 
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full font-medium relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: idx * 0.2 + 0.5 }}
                      >
                        {exp.period}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30"
                          initial={{ x: "-100%" }}
                          animate={isInView ? { x: "100%" } : {}}
                          transition={{ 
                            duration: 1, 
                            delay: idx * 0.3 + 1.8,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.span>
                      <motion.span 
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full font-medium relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: idx * 0.2 + 0.6 }}
                      >
                        {exp.location}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-gray-500/30 to-gray-400/30"
                          initial={{ x: "-100%" }}
                          animate={isInView ? { x: "100%" } : {}}
                          transition={{ 
                            duration: 1, 
                            delay: idx * 0.3 + 2,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-4 relative z-10">
                  {exp.responsibilities.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-3 text-gray-300 leading-relaxed relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: idx * 0.2 + i * 0.1 + 0.7 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"
                        animate={{ 
                          boxShadow: [
                            "0_0_5px_rgba(59,130,246,0.5)",
                            "0_0_10px_rgba(59,130,246,0.8)",
                            "0_0_5px_rgba(59,130,246,0.5)"
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                      <span className="text-sm sm:text-base relative">
                        {item}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm"
                          initial={{ x: "-100%", opacity: 0 }}
                          animate={isInView ? { x: "100%", opacity: [0, 0.5, 0] } : {}}
                          transition={{ 
                            duration: 2, 
                            delay: idx * 0.5 + i * 0.2 + 2.5,
                            ease: "easeInOut"
                          }}
                        />
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;