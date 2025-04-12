import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import * as THREE from "three";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const model3DRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const techIcons = [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  ];

  useEffect(() => {
    // Create animated background
    if (backgroundRef.current) {
      const container = backgroundRef.current;
      
      // Create animated background dots
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full';
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position randomly with more concentration at the center
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Different opacities for depth effect
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Color scheme - mostly blue with a few accent colors
        const colors = [
          'rgba(30, 144, 255, opacity)', // Dodger Blue
          'rgba(65, 105, 225, opacity)', // Royal Blue
          'rgba(0, 123, 255, opacity)',  // Primary Blue
          'rgba(25, 25, 112, opacity)',  // Midnight Blue
          'rgba(100, 149, 237, opacity)'  // Cornflower Blue
        ];
        
        const colorIndex = Math.floor(Math.random() * colors.length);
        particle.style.backgroundColor = colors[colorIndex].replace('opacity', opacity.toString());
        
        // Animation duration
        const duration = Math.random() * 20 + 20;
        particle.style.animation = `floating ${duration}s infinite linear`;
        
        // Apply a random delay to create an organic feel
        particle.style.animationDelay = `-${Math.random() * 20}s`;
        
        container.appendChild(particle);
      }
    }
    
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

      // Create geometric shapes - primarily blue theme with subtle accents
      const geometry1 = new THREE.TorusKnotGeometry(3, 1, 100, 16);
      const material1 = new THREE.MeshStandardMaterial({
        color: 0x1E90FF, // Dodger Blue
        metalness: 0.3,
        roughness: 0.8,
      });
      const torusKnot = new THREE.Mesh(geometry1, material1);
      scene.add(torusKnot);

      const geometry2 = new THREE.IcosahedronGeometry(1.5, 0);
      const material2 = new THREE.MeshPhongMaterial({ 
        color: 0x4169E1, // Royal Blue
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
        color: 0x007BFF, // Primary Blue
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

      const light2 = new THREE.DirectionalLight(0x4169E1, 0.5);
      light2.position.set(-1, -1, -1);
      scene.add(light2);

      const light3 = new THREE.AmbientLight(0x191970, 0.5); // Midnight Blue
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
        
        torusKnot.rotation.x += 0.005;
        torusKnot.rotation.y += 0.005;
        
        icosahedron.rotation.x += 0.007;
        icosahedron.rotation.y += 0.007;
        
        dodecahedron.rotation.x -= 0.006;
        dodecahedron.rotation.y -= 0.006;

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
      {/* Animated background */}
      <div 
        ref={backgroundRef} 
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-alt z-0 overflow-hidden"
      >
        {/* Dots will be created by JavaScript */}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="z-10">
          <div className="text-sm text-primary font-mono mb-4">Hello, I'm</div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-heading mb-6 text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-blue-400">
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
                cursorClassName: 'text-primary',
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
              className="px-6 py-3 bg-gradient-to-r from-primary to-blue-400 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
              data-cursor-interactive
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all"
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
                className="tech-icon p-2 bg-background-alt rounded-full transition-transform duration-300 border border-border hover:border-primary"
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
          <i className="fas fa-chevron-down text-primary"></i>
          <div className="text-xs text-text-secondary mt-2">Scroll Down</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
