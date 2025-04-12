import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import * as THREE from "three";
import Typewriter from "typewriter-effect";
import { FaDownload, FaLinkedin, FaGithub, FaCode } from "react-icons/fa";
import { SiLeetcode, SiCodechef } from "react-icons/si";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const model3DRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/hridyansh", color: "#0077B5" },
    { name: "GitHub", icon: FaGithub, url: "https://github.com/ridh1234", color: "#333" },
    { name: "CodeChef", icon: SiCodechef, url: "https://www.codechef.com/users/hridyansh", color: "#5B4638" },
    { name: "LeetCode", icon: SiLeetcode, url: "https://leetcode.com/hridyansh", color: "#FFA116" },
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

      // Create room with two walls
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x1E3A5F,
        roughness: 0.8,
        metalness: 0.2,
      });
      
      // Left wall
      const leftWallGeometry = new THREE.BoxGeometry(10, 8, 0.2);
      const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
      leftWall.position.set(-5, 0, -5);
      leftWall.rotation.y = Math.PI / 2;
      scene.add(leftWall);
      
      // Back wall
      const backWallGeometry = new THREE.BoxGeometry(10, 8, 0.2);
      const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
      backWall.position.set(0, 0, -5);
      scene.add(backWall);
      
      // Floor
      const floorGeometry = new THREE.BoxGeometry(10, 0.2, 10);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x0A1929,
        roughness: 0.9,
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.set(0, -4, 0);
      scene.add(floor);
      
      // Desk
      const deskGeometry = new THREE.BoxGeometry(4, 0.2, 2);
      const deskMaterial = new THREE.MeshStandardMaterial({
        color: 0x3A2A1F,
        roughness: 0.6,
      });
      const desk = new THREE.Mesh(deskGeometry, deskMaterial);
      desk.position.set(0, -2, -3);
      scene.add(desk);
      
      // Desk legs
      const legGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
      
      for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(legGeometry, deskMaterial);
        const xPos = (i % 2 === 0) ? -1.8 : 1.8;
        const zPos = (i < 2) ? -2.1 : -3.9;
        leg.position.set(xPos, -3, zPos);
        scene.add(leg);
      }
      
      // Computer monitor
      const monitorBaseGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5);
      const monitorBaseMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
      });
      const monitorBase = new THREE.Mesh(monitorBaseGeometry, monitorBaseMaterial);
      monitorBase.position.set(0, -1.9, -3.5);
      scene.add(monitorBase);
      
      const monitorStandGeometry = new THREE.BoxGeometry(0.1, 0.6, 0.1);
      const monitorStand = new THREE.Mesh(monitorStandGeometry, monitorBaseMaterial);
      monitorStand.position.set(0, -1.6, -3.5);
      scene.add(monitorStand);
      
      const monitorGeometry = new THREE.BoxGeometry(2.2, 1.4, 0.1);
      const monitorFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
      });
      const monitorFrame = new THREE.Mesh(monitorGeometry, monitorFrameMaterial);
      monitorFrame.position.set(0, -1, -3.6);
      scene.add(monitorFrame);
      
      const screenGeometry = new THREE.PlaneGeometry(2, 1.2);
      const screenMaterial = new THREE.MeshBasicMaterial({
        color: 0x1E1E3F,
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(0, -1, -3.55);
      scene.add(screen);
      
      // Add code-like elements to screen
      const createCodeLine = (y: number, width: number, color: number) => {
        const lineGeometry = new THREE.PlaneGeometry(width, 0.05);
        const lineMaterial = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.8
        });
        
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(0, y, 0.01);
        return line;
      };
      
      // Add code lines to screen
      const codeLines = [
        createCodeLine(0.4, 0.8, 0x61DBFB),  // React blue
        createCodeLine(0.3, 1.0, 0xF0F6FC),  // White
        createCodeLine(0.2, 0.7, 0xF0F6FC),  // White
        createCodeLine(0.1, 0.9, 0x3178C6),  // TypeScript blue
        createCodeLine(0.0, 0.6, 0xF0F6FC),  // White
        createCodeLine(-0.1, 0.9, 0xF0F6FC), // White
        createCodeLine(-0.2, 0.7, 0x4584B6), // Python blue
        createCodeLine(-0.3, 0.5, 0xF0F6FC), // White
      ];
      
      codeLines.forEach(line => {
        // Slightly offset each line position for 3D effect
        line.position.x = (Math.random() - 0.5) * 0.3;
        screen.add(line);
      });
      
      // Keyboard
      const keyboardGeometry = new THREE.BoxGeometry(1.8, 0.1, 0.6);
      const keyboardMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
      });
      const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
      keyboard.position.set(0, -1.9, -2.5);
      scene.add(keyboard);
      
      // Chair
      const chairSeatGeometry = new THREE.BoxGeometry(1.2, 0.1, 1.2);
      const chairMaterial = new THREE.MeshStandardMaterial({
        color: 0x0A1929,
      });
      const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
      chairSeat.position.set(0, -2.5, -1.5);
      scene.add(chairSeat);
      
      const chairBackGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.1);
      const chairBack = new THREE.Mesh(chairBackGeometry, chairMaterial);
      chairBack.position.set(0, -1.75, -2);
      chairBack.rotation.x = Math.PI * 0.1;
      scene.add(chairBack);
      
      // Programmer (simplified)
      const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const bodyGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.4);
      const personMaterial = new THREE.MeshStandardMaterial({
        color: 0x3A506B,
      });
      
      const head = new THREE.Mesh(headGeometry, personMaterial);
      head.position.set(0, -1.3, -2);
      scene.add(head);
      
      const body = new THREE.Mesh(bodyGeometry, personMaterial);
      body.position.set(0, -1.9, -2);
      scene.add(body);
      
      // Arms
      const armGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
      const leftArm = new THREE.Mesh(armGeometry, personMaterial);
      leftArm.position.set(-0.5, -1.9, -2.2);
      leftArm.rotation.z = -Math.PI / 6;
      scene.add(leftArm);
      
      const rightArm = new THREE.Mesh(armGeometry, personMaterial);
      rightArm.position.set(0.5, -1.9, -2.2);
      rightArm.rotation.z = Math.PI / 6;
      scene.add(rightArm);

      // Add lights
      const light1 = new THREE.DirectionalLight(0xFFFFFF, 1);
      light1.position.set(1, 1, 1);
      scene.add(light1);

      const light2 = new THREE.DirectionalLight(0x4169E1, 0.5);
      light2.position.set(-1, -1, -1);
      scene.add(light2);

      const light3 = new THREE.AmbientLight(0x191970, 0.5); // Midnight Blue
      scene.add(light3);
      
      // Spot light above desk
      const spotLight = new THREE.SpotLight(0xFFFFFF, 1);
      spotLight.position.set(0, 2, -2);
      spotLight.target.position.set(0, -1.9, -3);
      spotLight.angle = Math.PI / 6;
      spotLight.penumbra = 0.2;
      scene.add(spotLight);
      scene.add(spotLight.target);

      // Position camera
      camera.position.set(5, 0, 2);
      camera.lookAt(0, -1.5, -2);

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

        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;
        
        // Animate coding
        codeLines.forEach((line, index) => {
          const time = Date.now() * 0.001;
          const blinkRate = 0.5 + Math.random() * 0.5;
          const opacity = 0.5 + 0.5 * Math.sin(time * blinkRate + index);
          (line.material as THREE.MeshBasicMaterial).opacity = opacity;
        });
        
        // Subtle floating animation for the programmer
        const time = Date.now() * 0.001;
        head.position.y = -1.3 + Math.sin(time * 0.5) * 0.05;
        body.position.y = -1.9 + Math.sin(time * 0.5) * 0.05;
        leftArm.position.y = -1.9 + Math.sin(time * 0.5) * 0.05;
        rightArm.position.y = -1.9 + Math.sin(time * 0.5) * 0.05;
        
        // Smooth camera movement following mouse
        const initialX = 5;
        const initialY = 0;
        
        camera.position.x = initialX + targetX;
        camera.position.y = initialY + targetY;
        camera.lookAt(0, -1.5, -2);

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
            className="flex flex-wrap space-x-0 space-y-3 md:space-y-0 md:space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#projects" 
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-blue-400 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center"
              data-cursor-interactive
            >
              <span>View Projects</span>
            </a>
            <a 
              href="#contact" 
              className="w-full md:w-auto px-6 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all flex items-center justify-center"
              data-cursor-interactive
            >
              <span>Contact Me</span>
            </a>
            <a 
              href="/Hridyansh_Resume.pdf" 
              className="w-full md:w-auto px-6 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition-all flex items-center justify-center"
              data-cursor-interactive
              download
            >
              <FaDownload className="mr-2" />
              <span>Download CV</span>
            </a>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon p-3 bg-background-alt rounded-full transition-all duration-300 border border-border hover:border-primary hover:shadow-lg"
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: `0 10px 25px -5px ${social.color}40`
                }}
                custom={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                data-cursor-interactive
                style={{ color: social.color }}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <div className="relative z-10">
          <motion.div 
            className="relative h-[300px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-2xl"
            ref={model3DRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Three.js 3D model will be rendered here */}
          </motion.div>
        </div>
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
