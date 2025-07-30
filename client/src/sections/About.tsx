import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };
  
  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    })
  };

  return (
    <section id="about" className="py-20 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          <h2 className="text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Code Visualization */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInVariants}
            className="order-2 lg:order-1"
          >
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">hridyansh_profile.js</span>
              </div>
              
              <div className="font-mono text-sm space-y-1 leading-relaxed">
                <div className="text-gray-500">// Software Developer Profile</div>
                <div className="text-blue-400">
                  <span className="text-purple-400">const</span> developer = {"{"}
                </div>
                <div className="pl-4 text-gray-300">
                  name: <span className="text-green-400">"Hridyansh"</span>,
                </div>
                <div className="pl-4 text-gray-300">
                  role: <span className="text-green-400">"Full-Stack Developer and AI/ML Engineer"</span>,
                </div>
                <div className="pl-4 text-gray-300">
                  location: <span className="text-green-400">"Rajasthan, India"</span>,
                </div>
                <div className="pl-4 text-gray-300">
                  education: {"{"}
                </div>
                <div className="pl-8 text-gray-300">
                  institute: <span className="text-green-400">"IIIT Vadodara"</span>,
                </div>
                <div className="pl-8 text-gray-300">
                  degree: <span className="text-green-400">"B.Tech Computer Science"</span>,
                </div>
                <div className="pl-8 text-gray-300">
                  year: <span className="text-green-400">"2022-2026"</span>
                </div>
                <div className="pl-4 text-gray-300">{"},"}</div>
                <div className="pl-4 text-gray-300">
                  skills: {"{"}
                </div>
                <div className="pl-8 text-gray-300">
                  frontend: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"JavaScript"</span>, <span className="text-green-400">"HTML/CSS"</span>],
                </div>
                <div className="pl-8 text-gray-300">
                  backend: [<span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"Python"</span>, <span className="text-green-400">"Express"</span>],
                </div>
                <div className="pl-8 text-gray-300">
                  ml_ai: [<span className="text-green-400">"TensorFlow"</span>, <span className="text-green-400">"PyTorch"</span>, <span className="text-green-400">"Scikit-learn"</span>],
                </div>
                <div className="pl-8 text-gray-300">
                  database: [<span className="text-green-400">"MongoDB"</span>, <span className="text-green-400">"PostgreSQL"</span>, <span className="text-green-400">"SQLite"</span>]
                </div>
                <div className="pl-4 text-gray-300">{"},"}</div>
                <div className="pl-4 text-gray-300">
                  interests: [<span className="text-green-400">"AI/ML"</span>, <span className="text-green-400">"Web Development"</span>, <span className="text-green-400">"Open Source"</span>],
                </div>
                <div className="pl-4 text-gray-300">
                  currentFocus: <span className="text-green-400">"Building intelligent web applications"</span>,
                </div>
                <div className="pl-4 text-gray-300">
                  motto: <span className="text-green-400">"Code with purpose, build with passion"</span>
                </div>
                <div className="text-blue-400">{"}"}</div>
                <div className="mt-4"></div>
                <div className="text-gray-500">// Function to showcase projects</div>
                <div className="text-yellow-400">
                  <span className="text-purple-400">function</span> <span className="text-blue-400">getProjects</span>() {"{"}
                </div>
                <div className="pl-4 text-purple-400">
                  <span className="text-blue-400">return</span> developer.skills.map(<span className="text-orange-400">skill</span> {" => "} {"{"}
                </div>
                <div className="pl-8 text-gray-300">
                  <span className="text-blue-400">return</span> <span className="text-green-400">`Building amazing projects with ${"{"}skill{"}"}`</span>;
                </div>
                <div className="pl-4 text-gray-300">{"});"}</div>
                <div className="text-yellow-400">{"}"}</div>
                <div className="mt-4"></div>
                <div className="text-gray-500">// Always learning and growing</div>
                <div className="text-gray-300">
                  console.<span className="text-yellow-400">log</span>(<span className="text-green-400">"Ready to create the future!"</span>);
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInVariants}
            >
              <p className="text-gray-300 leading-relaxed text-lg">
                I am a passionate software developer currently pursuing my degree at IIIT Vadodara International Campus Diu. My journey in tech is driven by a fascination with creating intelligent, user-friendly solutions that solve real-world problems.
              </p>
            </motion.div>
            
            {/* Education */}
            <motion.div 
              className="border-l-4 border-primary pl-6 py-4"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInVariants}
            >
              <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
              <div className="text-primary font-medium">IIIT Vadodara</div>
              <div className="text-gray-300">B.Tech in Computer Science</div>
              <div className="text-gray-400 text-sm">2022 - Present</div>
            </motion.div>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "💻",
                  title: "Full-Stack Development",
                  description: "Building responsive applications with modern frameworks"
                },
                {
                  icon: "🧠",
                  title: "Machine Learning & AI",
                  description: "Developing intelligent systems that learn and adapt"
                },
                {
                  icon: "🏗️",
                  title: "System Architecture",
                  description: "Designing efficient, scalable software architectures"
                },
                {
                  icon: "📊",
                  title: "Problem Solving",
                  description: "Analytical approach to complex challenges"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-primary/50 transition-colors duration-300"
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={staggerVariants}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
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