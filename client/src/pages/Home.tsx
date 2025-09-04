import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Achievements from "@/sections/Achievements";
import Contact from "@/sections/Contact";

// Import necessary libraries for smooth animations
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Add subtle scroll-based animations
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section, i) => {
      // Skip the hero section for initial animation
      if (i === 0) return;

      gsap.fromTo(
        section,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
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

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Helmet>
        <title>Hridyansh Sharma | Portfolio</title>
        <meta name="description" content="Portfolio of Hridyansh Sharma, a software developer specializing in full-stack development, machine learning, and AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Minimal clean background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pointer-events-none" />
      <div className="fixed -top-24 -right-24 w-[40rem] h-[40rem] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-24 -left-24 w-[46rem] h-[46rem] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      
      {/* Main Content with padding to avoid navbar overlap */}
      <div className="relative z-10 pt-28">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Achievements />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default Home;
