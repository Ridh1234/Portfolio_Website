import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import * as THREE from "three";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const model3DRef = useRef<HTMLDivElement>(null);

  const techIcons = [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  ];

  useEffect(() => {
    // Initialize 3D scene
    if (model3DRef.current) {
      const container = model3DRef.current;
      
      // Create scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Create geometric shapes
      const geometry1 = new THREE.TorusKnotGeometry(3, 1, 100, 16);
      const material1 = new THREE.MeshNormalMaterial();
      const torusKnot = new THREE.Mesh(geometry1, material1);
      scene.add(torusKnot);

      const geometry2 = new THREE.IcosahedronGeometry(1.5, 0);
      const material2 = new THREE.MeshPhongMaterial({ 
        color: 0x00e0ff,
        emissive: 0x7928ca,
        specular: 0xffffff,
        shininess: 30,
        transparent: true,
        opacity: 0.8
      });
      const icosahedron = new THREE.Mesh(geometry2, material2);
      icosahedron.position.set(-5, 3, -2);
      scene.add(icosahedron);

      const geometry3 = new THREE.DodecahedronGeometry(1.2, 0);
      const material3 = new THREE.MeshPhongMaterial({
        color: 0xff2a6d,
        emissive: 0x7928ca,
        specular: 0xffffff,
        shininess: 30,
        transparent: true,
        opacity: 0.8
      });
      const dodecahedron = new THREE.Mesh(geometry3, material3);
      dodecahedron.position.set(5, -3, -1);
      scene.add(dodecahedron);

      // Add lights
      const light1 = new THREE.DirectionalLight(0xffffff, 1);
      light1.position.set(1, 1, 1);
      scene.add(light1);

      const light2 = new THREE.DirectionalLight(0x00e0ff, 0.5);
      light2.position.set(-1, -1, -1);
      scene.add(light2);

      const light3 = new THREE.AmbientLight(0x404040, 0.5);
      scene.add(light3);

      // Position camera
      camera.position.z = 10;

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;
      const windowX = window.innerWidth / 2;
      const windowY = window.innerHeight / 2;

      const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowX) / 100;
        mouseY = (event.clientY - windowY) / 100;
      };

      window.addEventListener('mousemove', onMouseMove);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.2;
        targetY = mouseY * 0.2;
        
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        
        icosahedron.rotation.x += 0.01;
        icosahedron.rotation.y += 0.01;
        
        dodecahedron.rotation.x -= 0.01;
        dodecahedron.rotation.y -= 0.01;

        // Smooth camera movement following mouse
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
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
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-20" id="hero" ref={heroRef}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="z-10">
          <div className="text-sm text-secondary font-mono mb-4">Hello, I'm</div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-heading mb-6 text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Hridyansh Sharma
            </span>
          </motion.h1>
          <div className="h-8 overflow-hidden relative">
            <Typewriter
              options={{
                strings: ['Software Developer', 'Full-Stack Developer', 'ML Engineer', 'AI Enthusiast'],
                autoStart: true,
                loop: true,
                wrapperClassName: 'text-xl md:text-2xl font-mono text-text-primary',
                cursorClassName: 'text-secondary',
              }}
            />
          </div>
          <motion.p 
            className="text-text-secondary mt-6 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Specializing in full-stack development, machine learning, and artificial intelligence. Building digital experiences that blend creativity with technical precision.
          </motion.p>
          <motion.div 
            className="flex space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#projects" 
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
              data-cursor-interactive
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-secondary text-secondary rounded-full font-semibold hover:bg-secondary/10 transition-all"
              data-cursor-interactive
            >
              Contact Me
            </a>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {techIcons.map((tech, index) => (
              <motion.div 
                key={tech.name}
                className="tech-icon p-2 bg-background-alt rounded-full transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
                custom={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                data-cursor-interactive
              >
                <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="relative h-[400px] md:h-[600px] z-10"
          ref={model3DRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Three.js 3D model will be rendered here */}
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div>
          <i className="fas fa-chevron-down text-secondary"></i>
          <div className="text-xs text-text-secondary mt-2">Scroll Down</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
