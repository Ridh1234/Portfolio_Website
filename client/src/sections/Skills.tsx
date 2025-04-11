import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import * as THREE from "three";

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const techVisualizationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const programmingLanguages = [
    { name: "Python", percentage: 95 },
    { name: "JavaScript", percentage: 90 },
    { name: "Java", percentage: 85 },
    { name: "C++", percentage: 80 },
    { name: "TypeScript", percentage: 75 },
  ];
  
  const frameworks = [
    { name: "React", percentage: 92 },
    { name: "TensorFlow", percentage: 88 },
    { name: "Node.js", percentage: 85 },
    { name: "Django", percentage: 80 },
    { name: "Flask", percentage: 82 },
  ];
  
  const tools = [
    { name: "Git/GitHub", percentage: 95 },
    { name: "Docker", percentage: 85 },
    { name: "AWS", percentage: 78 },
    { name: "MongoDB", percentage: 83 },
    { name: "SQL", percentage: 88 },
  ];

  // Initialize 3D visualization
  useEffect(() => {
    if (techVisualizationRef.current) {
      const container = techVisualizationRef.current;
      
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
      
      // Create nodes for tech stack visualization
      const nodes: THREE.Mesh[] = [];
      const nodeConnections: { from: number; to: number }[] = [];
      
      // Tech categories
      const categories = [
        { name: "Frontend", position: new THREE.Vector3(0, 2, 0), color: 0x7928ca },
        { name: "Backend", position: new THREE.Vector3(-3, -1, 0), color: 0x00e0ff },
        { name: "ML/AI", position: new THREE.Vector3(3, -1, 0), color: 0xff2a6d },
        { name: "Database", position: new THREE.Vector3(-5, 1, 0), color: 0x00ff88 },
        { name: "DevOps", position: new THREE.Vector3(5, 1, 0), color: 0xffaa00 }
      ];
      
      // Create category nodes
      categories.forEach((category, index) => {
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 32, 32),
          new THREE.MeshPhongMaterial({ color: category.color, shininess: 100 })
        );
        sphere.position.copy(category.position);
        scene.add(sphere);
        nodes.push(sphere);
        
        // Create connections between categories
        if (index > 0) {
          nodeConnections.push({ from: 0, to: index });
        }
      });
      
      // Create lines between connected nodes
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.5 });
      
      nodeConnections.forEach(connection => {
        const points = [
          nodes[connection.from].position,
          nodes[connection.to].position
        ];
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
      });
      
      // Lights
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);
      
      camera.position.z = 8;
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate nodes
        nodes.forEach(node => {
          node.rotation.x += 0.01;
          node.rotation.y += 0.01;
        });
        
        // Rotate camera around the scene
        const time = Date.now() * 0.001;
        camera.position.x = Math.sin(time * 0.2) * 8;
        camera.position.z = Math.cos(time * 0.2) * 8;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        if (container) {
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-20 px-6 bg-background-alt/50 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-heading mb-4">My <span className="text-primary">Skills</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Programming Languages */}
          <motion.div 
            className="bg-background/80 backdrop-blur p-8 rounded-lg hover:shadow-xl hover:shadow-primary/10 transition-all"
            variants={itemVariants}
            data-cursor-interactive
          >
            <h3 className="text-xl font-semibold mb-6 text-text-primary">Programming Languages</h3>
            
            <div className="space-y-6">
              {programmingLanguages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-secondary">{lang.name}</span>
                    <span className="text-text-secondary">{lang.percentage}%</span>
                  </div>
                  <ProgressBar percentage={lang.percentage} />
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Frameworks & Libraries */}
          <motion.div 
            className="bg-background/80 backdrop-blur p-8 rounded-lg hover:shadow-xl hover:shadow-primary/10 transition-all"
            variants={itemVariants}
            data-cursor-interactive
          >
            <h3 className="text-xl font-semibold mb-6 text-text-primary">Frameworks & Libraries</h3>
            
            <div className="space-y-6">
              {frameworks.map((framework) => (
                <div key={framework.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-secondary">{framework.name}</span>
                    <span className="text-text-secondary">{framework.percentage}%</span>
                  </div>
                  <ProgressBar percentage={framework.percentage} />
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Tools & Technologies */}
          <motion.div 
            className="bg-background/80 backdrop-blur p-8 rounded-lg hover:shadow-xl hover:shadow-primary/10 transition-all"
            variants={itemVariants}
            data-cursor-interactive
          >
            <h3 className="text-xl font-semibold mb-6 text-text-primary">Tools & Technologies</h3>
            
            <div className="space-y-6">
              {tools.map((tool) => (
                <div key={tool.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-secondary">{tool.name}</span>
                    <span className="text-text-secondary">{tool.percentage}%</span>
                  </div>
                  <ProgressBar percentage={tool.percentage} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Tech Stack Visualization */}
        <motion.div 
          className="mt-16 p-8 bg-background/80 backdrop-blur rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center text-text-primary">Tech Stack Visualization</h3>
          
          <div 
            className="relative h-[300px] md:h-[400px]" 
            ref={techVisualizationRef}
          >
            {/* Three.js visualization will be rendered here */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
