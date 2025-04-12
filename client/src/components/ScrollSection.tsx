import { useEffect, useRef, ReactNode } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  index: number;
  transitionType?: 'fade' | 'slide' | 'scale' | 'perspective' | 'reveal';
  backgroundColor?: string;
}

const ScrollSection = ({
  children,
  id,
  className = '',
  index,
  transitionType = 'fade',
  backgroundColor
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: false });
  const controls = useAnimation();
  
  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !contentRef.current) return;
    
    const section = sectionRef.current;
    const content = contentRef.current;
    
    // Different transition effects based on type
    let timeline: gsap.core.Timeline;
    
    const createTransition = () => {
      // Clear previous timeline if exists
      if (timeline) timeline.kill();
      
      // Create new timeline
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });
      
      // Apply different transitions based on type
      switch (transitionType) {
        case 'slide':
          // Slide in from the side
          timeline.fromTo(content, 
            { 
              x: index % 2 === 0 ? -100 : 100, 
              opacity: 0 
            }, 
            { 
              x: 0, 
              opacity: 1, 
              duration: 1, 
              ease: 'power3.out' 
            }
          );
          break;
          
        case 'scale':
          // Scale up from small size
          timeline.fromTo(content, 
            { 
              scale: 0.8, 
              opacity: 0 
            }, 
            { 
              scale: 1, 
              opacity: 1, 
              duration: 1, 
              ease: 'back.out(1.7)' 
            }
          );
          break;
          
        case 'perspective':
          // 3D perspective effect
          gsap.set(content.parentElement, { perspective: 1000 });
          timeline.fromTo(content, 
            { 
              rotationX: 25, 
              y: 100, 
              opacity: 0 
            }, 
            { 
              rotationX: 0, 
              y: 0, 
              opacity: 1, 
              duration: 1.2, 
              ease: 'power3.out' 
            }
          );
          break;
          
        case 'reveal':
          // Create reveal effect with mask
          // First create a wrapper around content for the mask effect
          const wrapper = document.createElement('div');
          wrapper.style.position = 'relative';
          wrapper.style.overflow = 'hidden';
          
          // Clone content into wrapper
          if (content.parentElement) {
            content.parentElement.insertBefore(wrapper, content);
            wrapper.appendChild(content);
            
            // Create mask overlay
            const mask = document.createElement('div');
            mask.style.position = 'absolute';
            mask.style.top = '0';
            mask.style.left = '0';
            mask.style.right = '0';
            mask.style.bottom = '0';
            mask.style.backgroundColor = backgroundColor || 'var(--background)';
            mask.style.transformOrigin = index % 2 === 0 ? 'left center' : 'right center';
            
            wrapper.appendChild(mask);
            
            // Create animation
            timeline.to(mask, {
              scaleX: 0,
              duration: 1.2,
              ease: 'power4.inOut'
            });
          }
          break;
          
        case 'fade':
        default:
          // Simple fade in
          timeline.fromTo(content, 
            { 
              y: 30, 
              opacity: 0 
            }, 
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.8, 
              ease: 'power2.out' 
            }
          );
          break;
      }
    };
    
    createTransition();
    
    // Update on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
      createTransition();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (timeline) timeline.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, [index, transitionType, backgroundColor]);
  
  // Trigger Framer Motion animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);
  
  return (
    <section 
      ref={sectionRef}
      id={id}
      className={`relative py-20 px-6 min-h-screen flex items-center ${className}`}
      style={{ backgroundColor }}
    >
      <div 
        ref={contentRef}
        className="w-full max-w-7xl mx-auto z-10"
      >
        {children}
      </div>
      
      {/* Section indicator */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:block">
        <div className="w-2 h-[150px] bg-background-alt rounded-full flex flex-col items-center justify-around py-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i === index ? 'bg-primary' : 'bg-border'}`}
              animate={{ 
                scale: i === index ? [1, 1.5, 1] : 1,
                transition: {
                  duration: 1.5,
                  repeat: i === index ? Infinity : 0,
                  repeatDelay: 1
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;