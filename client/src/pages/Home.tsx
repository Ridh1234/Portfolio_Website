import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import ParticlesBackground from "@/components/ParticlesBackground";
import GradientBlob from "@/components/GradientBlob";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Achievements from "@/sections/Achievements";
import Contact from "@/sections/Contact";

// Import necessary libraries
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Add scroll-based animations
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section, i) => {
      // Skip the hero section for initial animation
      if (i === 0) return;

      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add script tags for third-party libraries
  useEffect(() => {
    const loadScripts = async () => {
      // Load particles.js
      const particlesScript = document.createElement('script');
      particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      particlesScript.async = true;
      document.body.appendChild(particlesScript);
    };

    loadScripts();

    return () => {
      // Cleanup scripts if needed
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans overflow-x-hidden">
      <Helmet>
        <title>Hridyansh Sharma | Portfolio</title>
        <meta name="description" content="Portfolio of Hridyansh Sharma, a software developer specializing in full-stack development, machine learning, and AI." />
      </Helmet>

      {/* Particles Background */}
      <ParticlesBackground />

      {/* Gradient Blobs */}
      <GradientBlob 
        width="500px" 
        height="500px" 
        position={{ top: "-250px", right: "-100px" }} 
      />
      <GradientBlob 
        width="400px" 
        height="400px" 
        position={{ top: "30%", left: "-200px" }} 
        delay={2}
      />
      <GradientBlob 
        width="600px" 
        height="600px" 
        position={{ bottom: "10%", right: "-300px" }} 
        delay={4}
      />

      {/* Main Content */}
      <div className="content relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </div>
    </div>
  );
};

export default Home;
