import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Import our custom shader code
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    
    // Create subtle wave effect
    float elevation = sin(pos.x * 3.0 + uTime) * 0.1;
    elevation += sin(pos.y * 2.0 + uTime * 0.8) * 0.1;
    
    pos.z += elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  #define PI 3.14159265359
  
  // Color palette
  vec3 primary = vec3(0.46, 0.16, 0.79); // Purple
  vec3 secondary = vec3(0.0, 0.88, 1.0); // Cyan
  vec3 dark = vec3(0.06, 0.06, 0.1); // Dark background
  
  // Function to create electric-like patterns
  float electricField(vec2 uv, float time) {
    // Create electric pattern
    float strength = 0.0;
    vec2 pos = vec2(uv * 10.0);
    
    // Add noise
    pos.x += sin(pos.y * 4.0 + time * 0.5) * 0.4;
    pos.y += sin(pos.x * 3.0 + time * 0.3) * 0.4;
    
    // Create electric lines
    float lineIntensity = 0.5 + 0.5 * sin(pos.x * 10.0 + time);
    lineIntensity *= 0.5 + 0.5 * cos(pos.y * 12.0 - time * 0.8);
    
    strength += lineIntensity * 0.5;
    
    // Add bright points where electric lines intersect
    float points = sin(pos.x * 2.0) * sin(pos.y * 2.0);
    points = smoothstep(0.2, 0.9, points);
    
    strength = smoothstep(0.2, 0.9, strength) + points * 0.2;
    
    return clamp(strength, 0.0, 1.0);
  }
  
  // Function to create a glowing orb
  float glowingOrb(vec2 uv, vec2 center, float radius, float intensity) {
    float dist = distance(uv, center);
    return intensity * smoothstep(radius, 0.0, dist);
  }
  
  void main() {
    // Normalized coordinates
    vec2 uv = vUv;
    vec2 mouseUV = uMouse / uResolution;
    
    // Create background color
    vec3 color = dark;
    
    // Create electric field effect
    float electric = electricField(uv, uTime);
    
    // Create orb around mouse position
    float orb = glowingOrb(uv, mouseUV, 0.2, 1.0);
    
    // Add electric field to the background
    color = mix(color, primary, electric * 0.4);
    
    // Add orb effect
    color = mix(color, secondary, orb * 0.8);
    
    // Add subtle glow at the corners
    float cornerGlow = glowingOrb(uv, vec2(0.0, 0.0), 0.8, 0.3);
    cornerGlow += glowingOrb(uv, vec2(1.0, 0.0), 0.8, 0.2);
    cornerGlow += glowingOrb(uv, vec2(0.0, 1.0), 0.8, 0.3);
    cornerGlow += glowingOrb(uv, vec2(1.0, 1.0), 0.8, 0.2);
    
    color = mix(color, mix(primary, secondary, sin(uTime * 0.3) * 0.5 + 0.5), cornerGlow * 0.15);
    
    // Add pulsing effect based on time
    float pulse = 0.5 + 0.5 * sin(uTime * 0.5);
    color += pulse * 0.05 * mix(primary, secondary, sin(uTime) * 0.5 + 0.5);
    
    // Output final color
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface ShaderBackgroundProps {
  className?: string;
}

const ShaderBackground = ({ className = '' }: ShaderBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
    });
    
    const container = containerRef.current;
    const { offsetWidth: width, offsetHeight: height } = container;
    
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    // Set camera position
    camera.position.z = 1;
    
    // Create plane geometry that covers the screen
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Create shader material
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(width / 2, height / 2) }
    };
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });
    
    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      // Get mouse position relative to canvas
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Update mouse position
      mousePosition.current = { x, y };
      
      // Update uniform
      uniforms.uMouse.value.x = x;
      uniforms.uMouse.value.y = height - y; // Flip y-coordinate for WebGL
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      
      // Update renderer and camera
      renderer.setSize(newWidth, newHeight);
      uniforms.uResolution.value.x = newWidth;
      uniforms.uResolution.value.y = newHeight;
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let lastTime = 0;
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Update time uniform (convert to seconds)
      uniforms.uTime.value += deltaTime * 0.001;
      
      // Render scene
      renderer.render(scene, camera);
      
      // Request next frame
      requestAnimationFrame(animate);
    };
    
    // Start animation loop
    requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose resources
      geometry.dispose();
      material.dispose();
      
      // Remove renderer from DOM
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Cancel animation frame
      renderer.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};

export default ShaderBackground;