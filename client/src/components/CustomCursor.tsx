import { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const mouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      cursor.style.transform = `translate3d(${clientX - 10}px, ${clientY - 10}px, 0)`;
      cursorDot.style.transform = `translate3d(${clientX - 3}px, ${clientY - 3}px, 0)`;
    };

    const mouseDownHandler = () => {
      cursor.style.transform = `translate3d(${parseInt(cursor.style.transform.split("(")[1]) - 5}px, ${parseInt(cursor.style.transform.split(", ")[1]) - 5}px, 0) scale(0.7)`;
      cursorDot.style.transform = `translate3d(${parseInt(cursorDot.style.transform.split("(")[1]) - 1}px, ${parseInt(cursorDot.style.transform.split(", ")[1]) - 1}px, 0) scale(0.7)`;
    };

    const mouseUpHandler = () => {
      cursor.style.transform = `translate3d(${parseInt(cursor.style.transform.split("(")[1]) + 5}px, ${parseInt(cursor.style.transform.split(", ")[1]) + 5}px, 0) scale(1)`;
      cursorDot.style.transform = `translate3d(${parseInt(cursorDot.style.transform.split("(")[1]) + 1}px, ${parseInt(cursorDot.style.transform.split(", ")[1]) + 1}px, 0) scale(1)`;
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
    };

    // Add interactive elements hover effect
    const handleElementsHover = () => {
      const interactiveElements = document.querySelectorAll('[data-cursor-interactive]');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setIsHovering(true);
          cursor.style.transform = `translate3d(${parseInt(cursor.style.transform.split("(")[1])}px, ${parseInt(cursor.style.transform.split(", ")[1])}px, 0) scale(1.5)`;
          cursor.style.border = '2px solid hsl(var(--primary))';
          cursorDot.style.width = '0px';
          cursorDot.style.height = '0px';
        });
        
        element.addEventListener('mouseleave', () => {
          setIsHovering(false);
          cursor.style.transform = `translate3d(${parseInt(cursor.style.transform.split("(")[1])}px, ${parseInt(cursor.style.transform.split(", ")[1])}px, 0) scale(1)`;
          cursor.style.border = '2px solid hsl(var(--primary))';
          cursorDot.style.width = '6px';
          cursorDot.style.height = '6px';
        });
      });
    };

    addEventListeners();
    handleElementsHover();

    return () => {
      removeEventListeners();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={cursorDotRef} className="cursor-dot"></div>
    </>
  );
};

export default CustomCursor;