import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface HeroCanvasProps {
  className?: string;
}

const HeroCanvas = ({ className = '' }: HeroCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check if mobile device (for gyroscope controls)
    isMobileRef.current = window.innerWidth < 768;
    
    // Initialize scene
    const scene = new THREE.Scene();
    
    // Camera setup with perspective
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Initialize renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Create lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(1, 1, 2);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0x7928ca, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);
    
    // Create custom 3D objects representing code/development themes
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // 1. Create code brackets
    const createBracket = (isOpening: boolean) => {
      const bracketGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 32, Math.PI);
      const bracketMaterial = new THREE.MeshStandardMaterial({
        color: 0x00e0ff,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x003c44,
        emissiveIntensity: 0.5
      });
      
      const bracket = new THREE.Mesh(bracketGeometry, bracketMaterial);
      
      if (isOpening) {
        bracket.rotation.z = Math.PI / 2;
        bracket.position.x = -1.2;
      } else {
        bracket.rotation.z = -Math.PI / 2;
        bracket.position.x = 1.2;
      }
      
      return bracket;
    };
    
    const openingBracket = createBracket(true);
    const closingBracket = createBracket(false);
    
    group.add(openingBracket);
    group.add(closingBracket);
    
    // 2. Create code symbols
    const symbolsGeometry = new THREE.IcosahedronGeometry(0.2, 0);
    const symbolMaterial = new THREE.MeshPhongMaterial({
      color: 0xff2a6d,
      emissive: 0x3c0919,
      emissiveIntensity: 0.5,
      shininess: 60
    });
    
    const symbols: THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshPhongMaterial>[] = [];
    const symbolCount = 8;
    
    for (let i = 0; i < symbolCount; i++) {
      const symbol = new THREE.Mesh(symbolsGeometry, symbolMaterial);
      
      // Position in a circle pattern between the brackets
      const angle = (i / symbolCount) * Math.PI * 1.5;
      const radius = 0.8;
      
      symbol.position.x = Math.cos(angle) * radius * 0.5;
      symbol.position.y = Math.sin(angle) * radius - 0.3;
      symbol.position.z = (Math.random() - 0.5) * 0.5;
      
      // Random size
      const scale = 0.3 + Math.random() * 0.6;
      symbol.scale.set(scale, scale, scale);
      
      symbols.push(symbol);
      group.add(symbol);
    }
    
    // 3. Create a central floating cube representing code block
    const cubeGeometry = new THREE.BoxGeometry(1.2, 1.2, 0.1);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x14191f,
      specular: 0x61dafb,
      emissive: 0x0f1319,
      shininess: 40,
      transparent: true,
      opacity: 0.85
    });
    
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.z = -0.5;
    group.add(cube);
    
    // 4. Create code lines on the cube
    const createCodeLine = (y: number, width: number, color: number) => {
      const lineGeometry = new THREE.PlaneGeometry(width, 0.05);
      const lineMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8
      });
      
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(0, y, 0.06);
      return line;
    };
    
    // Add code lines to cube
    const codeLines = [
      createCodeLine(0.4, 0.8, 0x61dafb),  // Blue
      createCodeLine(0.25, 1.0, 0xf0f6fc), // White
      createCodeLine(0.1, 0.7, 0xf0f6fc),  // White
      createCodeLine(-0.05, 0.9, 0xff2a6d), // Purple
      createCodeLine(-0.2, 0.6, 0xf0f6fc), // White
      createCodeLine(-0.35, 0.75, 0x00e0ff), // Cyan
    ];
    
    codeLines.forEach(line => {
      // Slightly offset each line position for 3D effect
      line.position.x = (Math.random() - 0.5) * 0.3;
      cube.add(line);
    });
    
    // 5. Create floating dots (particles)
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    
    const positions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position particles in a sphere around the main objects
      const radius = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Random particle sizes
      particleSizes[i] = Math.random() * 0.05 + 0.01;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x7928ca,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Animation setup
    const animateObjects = () => {
      // Animate symbols
      symbols.forEach((symbol, i) => {
        // Oscillate symbols
        const time = Date.now() * 0.001;
        const offset = i * 0.3;
        
        symbol.position.y = Math.sin(time + offset) * 0.1 - 0.3;
        symbol.rotation.x = time * 0.3 + offset;
        symbol.rotation.z = time * 0.2;
      });
      
      // Animate code lines with opacity pulsing
      codeLines.forEach((line, i) => {
        const time = Date.now() * 0.001;
        const pulse = Math.sin(time * 0.5 + i * 0.5) * 0.5 + 0.5;
        
        // Update line material opacity
        (line.material as THREE.MeshBasicMaterial).opacity = 0.5 + pulse * 0.5;
      });
      
      // Animate particles
      const particlePositions = particles.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const time = Date.now() * 0.001;
        
        // Create gentle wave effect
        particlePositions[i3 + 1] += Math.sin(time + i) * 0.002;
        
        // Reset if particles move too far
        if (Math.abs(particlePositions[i3 + 1]) > 4) {
          particlePositions[i3 + 1] = (Math.random() - 0.5) * 4;
        }
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Smoothly rotate the main group based on mouse position
      group.rotation.y += (targetRotation.current.x - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotation.current.y - group.rotation.x) * 0.05;
    };
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      // Get mouse position normalized to -1 to 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      
      mousePosition.current = { x, y };
      
      // Set target rotation (limited range)
      targetRotation.current.x = x * 0.3;
      targetRotation.current.y = -y * 0.2;
    };
    
    // Handle device orientation for mobile
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isMobileRef.current || !event.beta || !event.gamma) return;
      
      // Convert orientation to rotation (beta: x-axis, gamma: y-axis)
      const x = (event.gamma / 30) * 0.5; // gamma: -90 to 90
      const y = ((event.beta - 45) / 30) * 0.5; // beta: 0 to 180, center at 45
      
      // Set target rotation with constraints
      targetRotation.current.x = THREE.MathUtils.clamp(x, -0.5, 0.5);
      targetRotation.current.y = THREE.MathUtils.clamp(y, -0.3, 0.3);
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      animateObjects();
      renderer.render(scene, camera);
    };
    
    // Initial animations
    const setupInitialAnimations = () => {
      // Initial position offscreen
      group.position.z = -10;
      group.rotation.x = -0.5;
      group.rotation.y = -0.5;
      group.scale.set(0.5, 0.5, 0.5);
      
      particles.material.opacity = 0;
      
      // Animate in
      gsap.to(group.position, {
        z: 0,
        duration: 2,
        ease: "power2.out",
        delay: 0.5
      });
      
      gsap.to(group.rotation, {
        x: 0,
        y: 0,
        duration: 2,
        ease: "power2.out",
        delay: 0.5
      });
      
      gsap.to(group.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 2,
        ease: "power2.out",
        delay: 0.5
      });
      
      gsap.to(particles.material, {
        opacity: 0.6,
        duration: 3,
        ease: "power2.out",
        delay: 1
      });
    };
    
    // Set up event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      
      // Update mobile check
      isMobileRef.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation and initial setup
    setupInitialAnimations();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('resize', handleResize);
      
      // Dispose resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        }
      });
      
      particles.geometry.dispose();
      (particles.material as THREE.Material).dispose();
      
      renderer.dispose();
      
      // Remove canvas from DOM
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className={`w-full h-full ${className}`} />
  );
};

export default HeroCanvas;