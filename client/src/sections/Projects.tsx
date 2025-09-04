import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiPython,
  SiPytorch,
  SiOpencv,
  SiStreamlit,
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNumpy,
  SiTensorflow,
  SiGithub,
  SiGooglecloud,
  SiFastapi,
  SiTailwindcss,
  SiMongodb,
  SiSupabase,
  SiVite,
  SiChartdotjs,
  SiHuggingface,
  SiSqlite,
} from "react-icons/si";
import { FaGem, FaRobot, FaCamera, FaTools } from "react-icons/fa";

const iconMap: Record<string, JSX.Element> = {
  Python: <SiPython className="text-xl" />,
  PyTorch: <SiPytorch className="text-xl" />,
  Tacotron2: <FaRobot className="text-xl" />,
  "HiFi-GAN": <FaGem className="text-xl" />,
  CUDA: <SiNumpy className="text-xl" />,
  OpenCV: <SiOpencv className="text-xl" />,
  Detectron2: <FaCamera className="text-xl" />,
  "Mask R-CNN": <FaCamera className="text-xl" />,
  OCR: <SiPython className="text-xl" />,
  Streamlit: <SiStreamlit className="text-xl" />,
  "Gemini API": <SiGooglecloud className="text-xl" />,
  NLP: <FaRobot className="text-xl" />,
  Cloud: <SiGooglecloud className="text-xl" />,
  HTML: <SiHtml5 className="text-xl" />,
  CSS: <SiCss3 className="text-xl" />,
  JavaScript: <SiJavascript className="text-xl" />,
  "REST API": <SiFastapi className="text-xl" />,
  React: <SiReact className="text-xl" />,
  Frontend: <SiReact className="text-xl" />,
  Surveillance: <FaCamera className="text-xl" />,
  Security: <FaCamera className="text-xl" />,
  Tailwind: <SiTailwindcss className="text-xl" />,
  Vite: <SiVite className="text-xl" />,
  MongoDB: <SiMongodb className="text-xl" />,
  Supabase: <SiSupabase className="text-xl" />,
  "Hugging Face": <SiHuggingface className="text-xl" />,
  "Chart.js": <SiChartdotjs className="text-xl" />,
  jsPDF: <SiJavascript className="text-xl" />,
  SQLite: <SiSqlite className="text-xl" />,
  FastAPI: <SiFastapi className="text-xl" />,
};

const projects = [
  {
    title: "SentiantAI – Social Media Sentiment Intelligence Platform",
    description:
      "Full-stack AI-powered platform that ingests Twitter, Reddit, YouTube & news data in real time to provide sentiment insights, dashboards, and downloadable PDF reports.",
    tags: ["React", "Vite", "Tailwind", "FastAPI", "MongoDB", "Supabase", "Hugging Face", "Chart.js", "jsPDF"],
    github: "https://sentiant-ai.vercel.app/",
    buttonText: "Live Link",
  },
  {
    title: "AgentXN – Modular Local AI Assistant Platform",
    description:
      "Privacy-focused local AI agent framework with plug-and-play microservices for calendar, file search, and to-do management, featuring LangChain reasoning and persistent ChromaDB memory.",
    tags: ["Python", "FastAPI", "LangChain", "SQLite", "ChromaDB", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Ridh1234/AgentXN",
    buttonText: "GitHub Repo",
  },
  {
    title: "Neural Text-to-Speech System",
    description:
      "Tacotron2 + HiFi-GAN based TTS system with 30% boost in naturalness and 45% faster inference using CUDA and batch optimization.",
    tags: ["Python", "PyTorch", "Tacotron2", "HiFi-GAN", "CUDA"],
    github: "https://huggingface.co/spaces/hridyansh22/Speech-Synthesis",
    buttonText:"Live Link",
  },
  {
    title: "Document Structure Analysis",
    description:
      "Layout detection system using Detectron2 and Mask R-CNN for parsing paragraphs, tables, and headings with OCR integration.",
    tags: ["Python", "OpenCV", "Detectron2", "Mask R-CNN", "OCR"],
    github: "https://github.com/Ridh1234/Document_Structure_analysis",
  },
  {
    title: "AI Hiring Assistant Chatbot",
    description:
      "Streamlit-based chatbot using Google Gemini API for technical interview screening with contextual handling and deployment ready.",
    tags: ["Python", "Streamlit", "Gemini API", "NLP", "Cloud"],
    github: "https://github.com/Ridh1234/talent_scout_assistant",
  },
  {
    title: "Zayka - Food Discovery App",
    description:
      "A full-stack culinary app with recipe search, filtering, and food API integration built using HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "REST API"],
    github: "https://github.com/Ridh1234/Zayka",
  },
  {
    title: "Spotify Frontend Clone",
    description:
      "Modern responsive frontend mimicking Spotify features with custom UI/UX components for playlists and playback.",
    tags: ["React", "CSS", "Frontend"],
    github: "https://github.com/Ridh1234/Spotify_frontend",
  },
  {
    title: "Spy Camera",
    description:
      "Surveillance app using computer vision and webcam input for motion detection and alert mechanisms.",
    tags: ["OpenCV", "Python", "Surveillance", "Security"],
    github: "https://github.com/Ridh1234/Spy_Camera",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section className="py-20" id="projects" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            className="text-slate-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore my real-world software projects across AI, web development, computer vision, and speech processing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="modern-card p-6 hover:border-primary/60"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground leading-snug">
                  {project.title}
                </h3>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modern-btn-outline whitespace-nowrap"
                >
                  {project.buttonText ?? "View"}
                </a>
              </div>

              <div className="card-divider my-4" />

              {/* Description */}
              <p className="text-slate-400 text-sm mb-4">
                {project.description}
              </p>

              {/* Footer tags */}
              <div className="flex flex-wrap gap-2 items-start">
                {project.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="modern-tag gap-2"
                  >
                    {iconMap[tag] ?? <FaTools className="text-xl" />} {tag}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="https://github.com/Ridh1234?tab=repositories"
            className="modern-btn-outline"
            target="_blank"
          >
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
