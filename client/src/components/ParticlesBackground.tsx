import { useEffect, useRef } from "react";
import Particles from "particles.js";

declare global {
  interface Window {
    particlesJS: any;
  }
}

const ParticlesBackground = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (particlesRef.current && window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#00e0ff" },
          shape: { type: "circle" },
          opacity: { 
            value: 0.1, 
            random: true, 
            anim: { 
              enable: true, 
              speed: 1, 
              opacity_min: 0.05, 
              sync: false 
            } 
          },
          size: { value: 3, random: true },
          line_linked: { 
            enable: true, 
            distance: 150, 
            color: "#00e0ff", 
            opacity: 0.1, 
            width: 1 
          },
          move: { 
            enable: true, 
            speed: 1, 
            direction: "none", 
            random: true, 
            straight: false, 
            out_mode: "out", 
            bounce: false 
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  return <div id="particles-js" ref={particlesRef} className="absolute inset-0 z-0"></div>;
};

export default ParticlesBackground;
