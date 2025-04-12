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

      // Create a realistic developer room
      // Create textures loader
      const textureLoader = new THREE.TextureLoader();
      
      // Wall texture
      const createWallMaterial = () => {
        const wallColor = 0x1A2D44; // Dark blue wall
        const wallMaterial = new THREE.MeshStandardMaterial({
          color: wallColor,
          roughness: 0.9,
          metalness: 0.1,
        });
        
        // Add subtle wall pattern
        const wallBumpMapIntensity = 0.02;
        wallMaterial.bumpScale = wallBumpMapIntensity;
        
        return wallMaterial;
      };
      
      // Create room structure
      const roomGroup = new THREE.Group();
      scene.add(roomGroup);
      
      // Left wall
      const leftWallGeometry = new THREE.BoxGeometry(0.2, 8, 10);
      const leftWall = new THREE.Mesh(leftWallGeometry, createWallMaterial());
      leftWall.position.set(-5, 0, -5);
      roomGroup.add(leftWall);
      
      // Back wall
      const backWallGeometry = new THREE.BoxGeometry(10, 8, 0.2);
      const backWall = new THREE.Mesh(backWallGeometry, createWallMaterial());
      backWall.position.set(0, 0, -10);
      roomGroup.add(backWall);
      
      // Window on back wall
      const windowFrameGeometry = new THREE.BoxGeometry(3, 4, 0.3);
      const windowFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0x3A4B5C,
        metalness: 0.4,
        roughness: 0.4
      });
      const windowFrame = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
      windowFrame.position.set(2, 1, -9.9);
      roomGroup.add(windowFrame);
      
      // Window glass
      const windowGlassGeometry = new THREE.PlaneGeometry(2.7, 3.7);
      const windowGlassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x88CCFF,
        transparent: true,
        opacity: 0.3,
        transmission: 0.9,
        roughness: 0,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0
      });
      const windowGlass = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial);
      windowGlass.position.set(2, 1, -9.7);
      roomGroup.add(windowGlass);
      
      // Floor with wooden texture
      const floorGeometry = new THREE.BoxGeometry(10, 0.2, 10);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x362F2D,
        roughness: 0.8,
        metalness: 0.2
      });
      
      // Floor wooden planks pattern
      const floorSegments = 20;
      const plankWidth = 10 / floorSegments;
      const floorGroup = new THREE.Group();
      
      for (let i = 0; i < floorSegments; i++) {
        const plankGeometry = new THREE.BoxGeometry(plankWidth * 0.95, 0.1, 10);
        const woodColor = i % 2 === 0 ? 0x362F2D : 0x2A2422;
        const plankMaterial = new THREE.MeshStandardMaterial({
          color: woodColor,
          roughness: 0.8,
          metalness: 0.1,
        });
        
        const plank = new THREE.Mesh(plankGeometry, plankMaterial);
        plank.position.set(-5 + plankWidth * i + plankWidth / 2, -4, 0);
        floorGroup.add(plank);
      }
      
      floorGroup.position.set(0, 0, -5);
      roomGroup.add(floorGroup);
      
      // Desk - more detailed with drawers
      const deskGroup = new THREE.Group();
      
      // Main desk surface
      const deskTopGeometry = new THREE.BoxGeometry(4, 0.1, 2);
      const deskMaterial = new THREE.MeshStandardMaterial({
        color: 0x4A3C2E,
        roughness: 0.7,
        metalness: 0.1
      });
      const deskTop = new THREE.Mesh(deskTopGeometry, deskMaterial);
      deskTop.position.set(0, -2, 0);
      deskGroup.add(deskTop);
      
      // Desk sides
      const deskSideGeometry = new THREE.BoxGeometry(0.1, 1.8, 2);
      const deskSideMaterial = new THREE.MeshStandardMaterial({
        color: 0x3A2E22,
        roughness: 0.7,
        metalness: 0.1
      });
      
      // Left desk side with drawers
      const leftDeskSide = new THREE.Mesh(deskSideGeometry, deskSideMaterial);
      leftDeskSide.position.set(-1.95, -2.9, 0);
      deskGroup.add(leftDeskSide);
      
      // Right desk side with drawers
      const rightDeskSide = new THREE.Mesh(deskSideGeometry, deskSideMaterial);
      rightDeskSide.position.set(1.95, -2.9, 0);
      deskGroup.add(rightDeskSide);
      
      // Desk drawers
      const drawerGeometry = new THREE.BoxGeometry(1.9, 0.5, 1.8);
      const drawerMaterial = new THREE.MeshStandardMaterial({
        color: 0x3A2E22,
        roughness: 0.7,
        metalness: 0.1
      });
      
      // Drawer fronts
      for (let i = 0; i < 3; i++) {
        const drawer = new THREE.Mesh(drawerGeometry, drawerMaterial);
        drawer.position.set(0, -2.35 - i * 0.5, 0);
        
        // Drawer handle
        const handleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
        const handleMaterial = new THREE.MeshStandardMaterial({
          color: 0xC0C0C0,
          metalness: 0.8,
          roughness: 0.2
        });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.rotation.z = Math.PI / 2;
        handle.position.set(0, 0, 0.8);
        drawer.add(handle);
        
        leftDeskSide.add(drawer.clone());
        rightDeskSide.add(drawer.clone());
      }
      
      // Position desk in the room
      deskGroup.position.set(0, 0, -3);
      roomGroup.add(deskGroup);
      
      // Computer setup
      const computerGroup = new THREE.Group();
      
      // Monitor
      const monitorStandGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.5, 8);
      const monitorBaseMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.8,
        roughness: 0.2
      });
      const monitorStand = new THREE.Mesh(monitorStandGeometry, monitorBaseMaterial);
      monitorStand.position.set(0, -1.7, -3.5);
      computerGroup.add(monitorStand);
      
      // Monitor frame
      const monitorFrameGeometry = new THREE.BoxGeometry(2.4, 1.5, 0.1);
      const monitorFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.8,
        roughness: 0.2
      });
      const monitorFrame = new THREE.Mesh(monitorFrameGeometry, monitorFrameMaterial);
      monitorFrame.position.set(0, -1, -3.6);
      computerGroup.add(monitorFrame);
      
      // Monitor screen
      const screenGeometry = new THREE.PlaneGeometry(2.2, 1.3);
      const screenMaterial = new THREE.MeshBasicMaterial({
        color: 0x0C1021
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(0, -1, -3.55);
      computerGroup.add(screen);
      
      // Code editor interface
      const createCodeBlock = () => {
        const codeGroup = new THREE.Group();
        
        // Editor background
        const editorBgGeometry = new THREE.PlaneGeometry(2.1, 1.2);
        const editorBgMaterial = new THREE.MeshBasicMaterial({
          color: 0x0C1021,
        });
        const editorBg = new THREE.Mesh(editorBgGeometry, editorBgMaterial);
        editorBg.position.set(0, 0, 0.001);
        codeGroup.add(editorBg);
        
        // Line numbers background
        const lineNumbersBgGeometry = new THREE.PlaneGeometry(0.2, 1.2);
        const lineNumbersBgMaterial = new THREE.MeshBasicMaterial({
          color: 0x0A0E1A,
        });
        const lineNumbersBg = new THREE.Mesh(lineNumbersBgGeometry, lineNumbersBgMaterial);
        lineNumbersBg.position.set(-0.95, 0, 0.002);
        codeGroup.add(lineNumbersBg);
        
        // Code lines
        const colors = {
          keyword: 0xFF7B29,  // orange
          string: 0x61CE3C,   // green
          comment: 0x676B79,  // gray
          variable: 0x8DDAF8, // light blue
          function: 0x8B7EF0,  // purple
          normal: 0xF8F8F8     // white
        };
        
        // Create line of code
        const createLine = (y: number, content: string, color: number) => {
          const lineGeometry = new THREE.PlaneGeometry(content.length * 0.05, 0.05);
          const lineMaterial = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.9
          });
          
          const line = new THREE.Mesh(lineGeometry, lineMaterial);
          line.position.set(-0.8 + content.length * 0.025, y, 0.003);
          return line;
        };
        
        // Create line number
        const createLineNumber = (y: number, number: number) => {
          const numGeometry = new THREE.PlaneGeometry(0.1, 0.05);
          const numMaterial = new THREE.MeshBasicMaterial({
            color: 0x3E4451,
            transparent: true,
            opacity: 0.9
          });
          
          const numMesh = new THREE.Mesh(numGeometry, numMaterial);
          numMesh.position.set(-0.95, y, 0.003);
          return numMesh;
        };
        
        // Add some code lines and numbers
        const linesCount = 15;
        const lineHeight = 0.07;
        
        for (let i = 0; i < linesCount; i++) {
          const y = 0.5 - i * lineHeight;
          
          // Line numbers
          codeGroup.add(createLineNumber(y, i + 1));
          
          // Code content with syntax highlighting
          let color = colors.normal;
          let length = 0.5 + Math.random() * 1.5; // Random line length
          
          // Some syntax highlighting patterns
          if (i === 0 || i === 5) {
            color = colors.keyword; // import/function keyword
            length = 1.5;
          } else if (i === 1 || i === 8) {
            color = colors.string; // strings
            length = 1.8;
          } else if (i === 3) {
            color = colors.comment; // comment
            length = 2;
          } else if (i === 6 || i === 9) {
            color = colors.function; // function name
            length = 1.2;
          } else if (i === 7 || i === 10) {
            color = colors.variable; // variable
            length = 0.9;
          }
          
          const line = createLine(y, "x".repeat(Math.floor(length * 10)), color);
          codeGroup.add(line);
        }
        
        // Cursor
        const cursorGeometry = new THREE.PlaneGeometry(0.01, 0.07);
        const cursorMaterial = new THREE.MeshBasicMaterial({
          color: 0xF8F8F8,
          transparent: true,
          opacity: 0.8
        });
        const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
        cursor.position.set(-0.3, 0.08, 0.004);
        codeGroup.add(cursor);
        
        // Animate cursor blinking
        const animateCursor = () => {
          cursorMaterial.opacity = 0.8;
          setInterval(() => {
            cursorMaterial.opacity = cursorMaterial.opacity > 0 ? 0 : 0.8;
          }, 500);
        };
        
        animateCursor();
        
        return codeGroup;
      };
      
      const codeEditor = createCodeBlock();
      screen.add(codeEditor);
      
      // Keyboard with detailed keys
      const keyboardGroup = new THREE.Group();
      
      // Keyboard base
      const keyboardBaseGeometry = new THREE.BoxGeometry(2, 0.1, 0.8);
      const keyboardMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.8,
        roughness: 0.2
      });
      const keyboardBase = new THREE.Mesh(keyboardBaseGeometry, keyboardMaterial);
      keyboardGroup.add(keyboardBase);
      
      // Create individual keys
      const createKey = (x: number, z: number, width = 0.06, height = 0.06) => {
        const keyGeometry = new THREE.BoxGeometry(width, 0.02, height);
        const keyMaterial = new THREE.MeshStandardMaterial({
          color: 0x333333,
          metalness: 0.5,
          roughness: 0.5
        });
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(x, 0.06, z);
        return key;
      };
      
      // Add keys in rows
      const rows = 5;
      const keysPerRow = 15;
      const keySpacing = 0.08;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < keysPerRow; col++) {
          const x = col * keySpacing - keysPerRow * keySpacing / 2 + keySpacing / 2;
          const z = row * keySpacing - rows * keySpacing / 2 + keySpacing;
          
          // Space bar is wider
          if (row === 4 && col > 3 && col < 11) {
            if (col === 4) {
              const spaceBar = createKey(0, z + 0.04, 0.7, 0.08);
              keyboardGroup.add(spaceBar);
            }
            continue;
          }
          
          keyboardGroup.add(createKey(x, z));
        }
      }
      
      // Position keyboard
      keyboardGroup.position.set(0, -1.95, -2.5);
      computerGroup.add(keyboardGroup);
      
      // Mouse
      const mouseGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
      const mouseMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.8,
        roughness: 0.2
      });
      const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
      mouse.position.set(1.2, -1.95, -2.5);
      computerGroup.add(mouse);
      
      // Mousepad
      const mousepadGeometry = new THREE.BoxGeometry(0.6, 0.01, 0.8);
      const mousepadMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.9,
        metalness: 0
      });
      const mousepad = new THREE.Mesh(mousepadGeometry, mousepadMaterial);
      mousepad.position.set(1.2, -1.99, -2.5);
      computerGroup.add(mousepad);
      
      // Add computer to scene
      roomGroup.add(computerGroup);
      
      // Chair - more detailed gaming/office chair
      const chairGroup = new THREE.Group();
      
      // Chair base (5-star base)
      const chairBaseGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.05, 5);
      const chairMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.8,
        roughness: 0.2
      });
      const chairBase = new THREE.Mesh(chairBaseGeometry, chairMaterial);
      chairBase.position.set(0, -3.8, -1.5);
      chairGroup.add(chairBase);
      
      // Chair wheels (5 wheels)
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const wheelGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const wheel = new THREE.Mesh(wheelGeometry, chairMaterial);
        wheel.position.set(
          Math.cos(angle) * 0.6,
          -3.9,
          -1.5 + Math.sin(angle) * 0.6
        );
        chairGroup.add(wheel);
      }
      
      // Chair stem
      const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
      const stem = new THREE.Mesh(stemGeometry, chairMaterial);
      stem.position.set(0, -3.3, -1.5);
      chairGroup.add(stem);
      
      // Chair seat
      const seatGeometry = new THREE.BoxGeometry(1.2, 0.1, 1.2);
      const seatMaterial = new THREE.MeshStandardMaterial({
        color: 0x0A1929,
        roughness: 0.9,
        metalness: 0.1
      });
      const seat = new THREE.Mesh(seatGeometry, seatMaterial);
      seat.position.set(0, -2.8, -1.5);
      chairGroup.add(seat);
      
      // Chair back
      const backGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.1);
      const back = new THREE.Mesh(backGeometry, seatMaterial);
      back.position.set(0, -2, -2.05);
      back.rotation.x = Math.PI * 0.1;
      chairGroup.add(back);
      
      // Add chair to room
      roomGroup.add(chairGroup);
      
      // Person sitting in chair (more detailed)
      const personGroup = new THREE.Group();
      
      // Head - with better shaping
      const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
      const skinMaterial = new THREE.MeshStandardMaterial({
        color: 0xE0C8A0,
        roughness: 0.7,
        metalness: 0.1
      });
      const head = new THREE.Mesh(headGeometry, skinMaterial);
      head.position.set(0, -1.3, -1.8);
      personGroup.add(head);
      
      // Hair
      const hairGeometry = new THREE.SphereGeometry(0.31, 32, 16);
      const hairMaterial = new THREE.MeshStandardMaterial({
        color: 0x1A1A1A,
        roughness: 0.9,
        metalness: 0
      });
      // Cut the bottom of the hair sphere
      const hairPos = new Float32Array(hairGeometry.attributes.position.array);
      for (let i = 0; i < hairPos.length; i += 3) {
        if (hairPos[i + 1] < 0) {
          hairPos[i + 1] = 0;
        }
      }
      hairGeometry.attributes.position.needsUpdate = true;
      
      const hair = new THREE.Mesh(hairGeometry, hairMaterial);
      hair.position.set(0, -1.3, -1.8);
      hair.rotation.x = 0.1;
      personGroup.add(hair);
      
      // Eyes
      const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const eyeMaterial = new THREE.MeshBasicMaterial({
        color: 0x222222
      });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.1, -1.28, -1.55);
      leftEye.scale.set(1, 0.5, 0.5);
      personGroup.add(leftEye);
      
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.1, -1.28, -1.55);
      rightEye.scale.set(1, 0.5, 0.5);
      personGroup.add(rightEye);
      
      // Torso
      const torsoGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.4);
      const clothesMaterial = new THREE.MeshStandardMaterial({
        color: 0x2E5C8A,
        roughness: 0.8,
        metalness: 0.1
      });
      const torso = new THREE.Mesh(torsoGeometry, clothesMaterial);
      torso.position.set(0, -1.9, -1.8);
      personGroup.add(torso);
      
      // Arms
      const upperArmGeometry = new THREE.BoxGeometry(0.15, 0.4, 0.15);
      const lowerArmGeometry = new THREE.BoxGeometry(0.12, 0.4, 0.12);
      
      // Left arm (in typing position)
      const leftUpperArm = new THREE.Mesh(upperArmGeometry, clothesMaterial);
      leftUpperArm.position.set(-0.35, -1.9, -1.8);
      leftUpperArm.rotation.z = -Math.PI / 6;
      personGroup.add(leftUpperArm);
      
      const leftLowerArm = new THREE.Mesh(lowerArmGeometry, skinMaterial);
      leftLowerArm.position.set(-0.6, -2.1, -2.2);
      leftLowerArm.rotation.set(Math.PI / 3, 0, -Math.PI / 6);
      personGroup.add(leftLowerArm);
      
      // Right arm (in typing position)
      const rightUpperArm = new THREE.Mesh(upperArmGeometry, clothesMaterial);
      rightUpperArm.position.set(0.35, -1.9, -1.8);
      rightUpperArm.rotation.z = Math.PI / 6;
      personGroup.add(rightUpperArm);
      
      const rightLowerArm = new THREE.Mesh(lowerArmGeometry, skinMaterial);
      rightLowerArm.position.set(0.6, -2.1, -2.2);
      rightLowerArm.rotation.set(Math.PI / 3, 0, Math.PI / 6);
      personGroup.add(rightLowerArm);
      
      // Legs (not visible but added for completeness)
      const legGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.2);
      const pantsMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.8,
        metalness: 0.1
      });
      
      const leftLeg = new THREE.Mesh(legGeometry, pantsMaterial);
      leftLeg.position.set(-0.2, -3.2, -1.5);
      personGroup.add(leftLeg);
      
      const rightLeg = new THREE.Mesh(legGeometry, pantsMaterial);
      rightLeg.position.set(0.2, -3.2, -1.5);
      personGroup.add(rightLeg);
      
      // Add person to room
      roomGroup.add(personGroup);
      
      // Add desk accessories
      
      // Coffee mug
      const mugGroup = new THREE.Group();
      
      const mugBodyGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 16);
      const mugMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.8,
        metalness: 0.1
      });
      const mugBody = new THREE.Mesh(mugBodyGeometry, mugMaterial);
      mugGroup.add(mugBody);
      
      // Handle
      const handleGeometry = new THREE.TorusGeometry(0.06, 0.02, 8, 16, Math.PI);
      const handle = new THREE.Mesh(handleGeometry, mugMaterial);
      handle.rotation.y = Math.PI / 2;
      handle.position.set(0.1, 0, 0);
      mugGroup.add(handle);
      
      // Coffee
      const coffeeGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.01, 16);
      const coffeeMaterial = new THREE.MeshStandardMaterial({
        color: 0x4A2C0F,
        roughness: 0.8,
        metalness: 0.1
      });
      const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
      coffee.position.set(0, 0.095, 0);
      mugGroup.add(coffee);
      
      // Position mug on desk
      mugGroup.position.set(1.5, -1.9, -3.3);
      roomGroup.add(mugGroup);
      
      // Desk lamp
      const lampGroup = new THREE.Group();
      
      // Lamp base
      const lampBaseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
      const lampBaseMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.8,
        metalness: 0.2
      });
      const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
      lampGroup.add(lampBase);
      
      // Lamp arm
      const lampArmGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
      const lampArmMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.8,
        metalness: 0.5
      });
      const lampArm = new THREE.Mesh(lampArmGeometry, lampArmMaterial);
      lampArm.position.set(0, 0.2, 0);
      lampGroup.add(lampArm);
      
      // Lamp head
      const lampHeadGeometry = new THREE.ConeGeometry(0.15, 0.2, 16, 1, true);
      const lampHeadMaterial = new THREE.MeshStandardMaterial({
        color: 0x777777,
        roughness: 0.8,
        metalness: 0.5,
        side: THREE.DoubleSide
      });
      const lampHead = new THREE.Mesh(lampHeadGeometry, lampHeadMaterial);
      lampHead.position.set(0, 0.4, 0);
      lampHead.rotation.x = Math.PI;
      lampGroup.add(lampHead);
      
      // Lamp light
      const lampLight = new THREE.SpotLight(0xFFECA9, 1, 10, Math.PI/3, 1, 1);
      lampLight.position.set(0, 0.4, 0);
      lampLight.target.position.set(0, -2, -3);
      lampGroup.add(lampLight);
      lampGroup.add(lampLight.target);
      
      // Position lamp on desk
      lampGroup.position.set(-1.5, -1.9, -3.7);
      lampGroup.rotation.x = Math.PI * 0.05;
      lampGroup.rotation.y = Math.PI * 0.1;
      roomGroup.add(lampGroup);

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
        
        // Subtle animation for the scene
        const time = Date.now() * 0.001;
        
        // Animate programmer with subtle floating motion
        if (personGroup) {
          personGroup.position.y = Math.sin(time * 0.5) * 0.05;
        }
        
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
