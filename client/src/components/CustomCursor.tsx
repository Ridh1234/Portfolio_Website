import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const magneticElementRef = useRef<HTMLElement | null>(null);
  const lastPosition = useRef<CursorPosition>({ x: 0, y: 0 });
  const mousePosition = useRef<CursorPosition>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  // Easing values for smooth cursor following
  const ease = 0.15;
  const easeMagnetic = 0.2;

  useEffect(() => {
    const cursorOuter = cursorOuterRef.current;
    const cursorInner = cursorInnerRef.current;
    const cursorText = cursorTextRef.current;

    if (!cursorOuter || !cursorInner || !cursorText) return;

    // Initialize cursor position off-screen
    gsap.set(cursorOuter, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(cursorInner, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(cursorText, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const mouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mousePosition.current = { x: clientX, y: clientY };
      
      // Create ripple effect on move
      if (Math.abs(clientX - lastPosition.current.x) > 5 || 
          Math.abs(clientY - lastPosition.current.y) > 5) {
        createRipple(clientX, clientY);
        lastPosition.current = { x: clientX, y: clientY };
      }
    };

    const mouseDownHandler = () => {
      setIsClicking(true);
      gsap.to(cursorOuter, { 
        scale: 0.8, 
        duration: 0.2, 
        backgroundColor: "hsla(var(--primary), 0.2)",
        borderColor: "hsla(var(--primary), 0.6)"
      });
      gsap.to(cursorInner, { scale: 0.6, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      setIsClicking(false);
      
      if (!isHovering) {
        gsap.to(cursorOuter, { 
          scale: 1, 
          duration: 0.2,
          backgroundColor: "transparent", 
          borderColor: "hsla(var(--secondary), 1)"
        });
        gsap.to(cursorInner, { scale: 1, duration: 0.2 });
      }
    };

    const addEventListeners = () => {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mousedown", mouseDownHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };

    // Create ripple effect
    const createRipple = (x: number, y: number) => {
      if (!isClicking) return; // Only create ripples when clicking
      
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      document.body.appendChild(ripple);

      gsap.set(ripple, { 
        left: x, 
        top: y, 
        xPercent: -50, 
        yPercent: -50,
        scale: 0,
        opacity: 0.8
      });

      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 1,
        onComplete: () => {
          document.body.removeChild(ripple);
        }
      });
    };

    // Add interactive elements hover effect
    const handleElementsHover = () => {
      // Gather all interactive elements
      const interactiveElements = document.querySelectorAll('[data-cursor-interactive]');
      const magneticElements = document.querySelectorAll('[data-cursor-magnetic]');
      const textElements = document.querySelectorAll('[data-cursor-text]');
      
      // Standard interactive elements
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setIsHovering(true);
          gsap.to(cursorOuter, { 
            scale: 1.5, 
            borderColor: "hsla(var(--primary), 1)",
            backgroundColor: "hsla(var(--primary), 0.1)",
            duration: 0.3
          });
          gsap.to(cursorInner, { scale: 0, duration: 0.3 });
        });
        
        element.addEventListener('mouseleave', () => {
          setIsHovering(false);
          gsap.to(cursorOuter, { 
            scale: 1, 
            borderColor: "hsla(var(--secondary), 1)",
            backgroundColor: "transparent",
            duration: 0.3
          });
          gsap.to(cursorInner, { scale: 1, duration: 0.3 });
        });
      });

      // Magnetic elements - pull cursor towards them
      magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setIsMagnetic(true);
          magneticElementRef.current = element as HTMLElement;
          gsap.to(cursorOuter, { 
            scale: 1.5, 
            borderColor: "hsla(var(--primary), 1)",
            backgroundColor: "hsla(var(--primary), 0.1)",
            duration: 0.3
          });
        });
        
        element.addEventListener('mouseleave', () => {
          setIsMagnetic(false);
          magneticElementRef.current = null;
          gsap.to(cursorOuter, { 
            scale: 1, 
            borderColor: "hsla(var(--secondary), 1)",
            backgroundColor: "transparent",
            duration: 0.3
          });
        });
      });

      // Text elements - display text near cursor
      textElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          const text = element.getAttribute('data-cursor-text') || '';
          setCursorText(text);
          gsap.to(cursorText, { opacity: 1, scale: 1, duration: 0.3 });
          gsap.to(cursorOuter, { opacity: 0.5, scale: 1.5, duration: 0.3 });
          gsap.to(cursorInner, { opacity: 0, duration: 0.3 });
        });
        
        element.addEventListener('mouseleave', () => {
          setCursorText('');
          gsap.to(cursorText, { opacity: 0, scale: 0.5, duration: 0.3 });
          gsap.to(cursorOuter, { opacity: 1, scale: 1, duration: 0.3 });
          gsap.to(cursorInner, { opacity: 1, duration: 0.3 });
        });
      });
    };

    // Animation loop for smooth cursor following
    const updateCursorPosition = () => {
      if (!cursorOuter || !cursorInner || !cursorText) return;

      // Calculate the target position
      let targetX = mousePosition.current.x;
      let targetY = mousePosition.current.y;

      // Get current positions
      const currentOuterX = parseFloat(gsap.getProperty(cursorOuter, "x") as string) || 0;
      const currentOuterY = parseFloat(gsap.getProperty(cursorOuter, "y") as string) || 0;
      const currentInnerX = parseFloat(gsap.getProperty(cursorInner, "x") as string) || 0;
      const currentInnerY = parseFloat(gsap.getProperty(cursorInner, "y") as string) || 0;

      // Apply magnetic effect if applicable
      if (isMagnetic && magneticElementRef.current) {
        const elem = magneticElementRef.current;
        const rect = elem.getBoundingClientRect();
        
        // Calculate center of element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Adjust target towards center of element
        targetX = centerX;
        targetY = centerY;
      }

      // Apply easing to create smooth following effect
      const dxOuter = targetX - currentOuterX;
      const dyOuter = targetY - currentOuterY;
      const dxInner = targetX - currentInnerX;
      const dyInner = targetY - currentInnerY;

      const easeValue = isMagnetic ? easeMagnetic : ease;

      // Set new positions with easing
      gsap.set(cursorOuter, { 
        x: currentOuterX + dxOuter * easeValue, 
        y: currentOuterY + dyOuter * easeValue 
      });
      
      gsap.set(cursorInner, { 
        x: currentInnerX + dxInner * easeValue * 1.2, 
        y: currentInnerY + dyInner * easeValue * 1.2 
      });

      gsap.set(cursorText, { 
        x: currentOuterX + dxOuter * easeValue, 
        y: currentOuterY + dyOuter * easeValue - 40 // Position text above cursor
      });

      rafId.current = requestAnimationFrame(updateCursorPosition);
    };

    addEventListeners();
    handleElementsHover();
    rafId.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      removeEventListeners();
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorOuterRef} 
        className="cursor fixed pointer-events-none z-[9999] mix-blend-difference"
      ></div>
      <div 
        ref={cursorInnerRef} 
        className="cursor-dot fixed pointer-events-none z-[9999] mix-blend-difference"
      ></div>
      <div
        ref={cursorTextRef}
        className="cursor-text fixed pointer-events-none z-[9999] text-white bg-primary/90 px-3 py-1 rounded-full text-sm font-medium opacity-0 whitespace-nowrap"
      >
        {cursorText}
      </div>
    </>
  );
};

export default CustomCursor;