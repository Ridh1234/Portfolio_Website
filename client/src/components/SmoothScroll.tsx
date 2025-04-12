import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Get the container and scrollable elements
    const container = containerRef.current;
    const scrollable = scrollableRef.current;
    
    if (!container || !scrollable) return;
    
    // Store the current scroll position
    let scrollPosition = 0;
    
    // Initialize timeline for scroll animations
    const scrollTl = gsap.timeline();
    
    // Function to update scroll animations
    const updateScroll = () => {
      // Get the current scroll position
      const newScrollPosition = window.scrollY;
      
      // Calculate scroll delta
      const delta = newScrollPosition - scrollPosition;
      
      // Store the new scroll position
      scrollPosition = newScrollPosition;
      
      // Apply smooth scrolling to the container
      gsap.to(scrollable, {
        y: -scrollPosition,
        ease: 'power3.out',
        duration: 0.8,
        overwrite: 'auto',
      });
      
      // Update ScrollTrigger
      ScrollTrigger.update();
    };
    
    // Set up scroll listener
    window.addEventListener('scroll', updateScroll);
    
    // Set up resizing measurements and update ScrollTrigger
    const handleResize = () => {
      // Update body height to match scrollable content
      document.body.style.height = scrollable.scrollHeight + 'px';
      
      // Recalculate ScrollTrigger positions
      ScrollTrigger.refresh();
    };
    
    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();
    
    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', handleResize);
      
      // Kill ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div ref={containerRef} className="smooth-scroll-container fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <div ref={scrollableRef} className="smooth-scroll-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;