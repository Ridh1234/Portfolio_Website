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
    <section id="experience" ref={ref} className="py-20 relative overflow-hidden">
      {/* Subtle accent glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.h2
          className="section-title text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-text">Experience</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-500/40"></div>
          
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="mb-12 relative pl-16"
            >
              {/* Dot */}
              <div className="absolute left-4 top-6 w-3 h-3 bg-blue-400 rounded-full ring-4 ring-background border-2 border-blue-400" />

              <div className="modern-card p-8 hover:border-primary/60">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{exp.role}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-blue-400 font-semibold text-lg">@ {exp.company}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                      <span className="px-3 py-1 bg-blue-500/15 text-blue-300 rounded-full font-medium">{exp.period}</span>
                      <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full font-medium">{exp.location}</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;