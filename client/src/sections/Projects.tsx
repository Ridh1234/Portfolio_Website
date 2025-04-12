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
};

const projects = [
  {
    title: "Neural Text-to-Speech System",
    description:
      "Tacotron2 + HiFi-GAN based TTS system with 30% boost in naturalness and 45% faster inference using CUDA and batch optimization.",
    tags: ["Python", "PyTorch", "Tacotron2", "HiFi-GAN", "CUDA"],
    github: "https://github.com/Ridh1234/Speech-Synthesis",
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
    <section className="py-20 px-6 bg-background" id="projects" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4 font-heading inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            My <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="text-text-secondary mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore my real-world software projects across AI, web development, computer vision, and speech processing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="flex flex-col md:flex-row justify-between gap-6 p-6 border border-border rounded-2xl shadow-sm hover:shadow-md transition-all bg-card"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {project.description}
                </p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-5 py-2 text-white bg-blue-700 hover:bg-blue-800 text-sm font-medium rounded-full"
                >
                  View in Detail
                </a>
              </div>
              <div className="flex-1 flex flex-wrap gap-3 items-start mt-4 md:mt-0">
                {project.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium shadow-sm backdrop-blur-sm"
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
            className="inline-flex items-center px-6 py-3 border border-blue-800 text-blue-800 rounded-full font-semibold hover:bg-blue-800 hover:text-white transition-all"
          >
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
