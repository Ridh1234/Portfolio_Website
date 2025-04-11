import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GradientBlobProps {
  width: string;
  height: string;
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  delay?: number;
}

const GradientBlob = ({ width, height, position, delay = 0 }: GradientBlobProps) => {
  const blobRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!blobRef.current) return;
    
    // Create timeline for complex animation
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "power1.inOut" }
    });
    
    // Initial delay if specified
    if (delay > 0) {
      tl.delay(delay);
    }
    
    // Random morphing animations for blob shape
    tl.to(blobRef.current, {
      borderTopLeftRadius: "60% 70%",
      borderTopRightRadius: "30% 50%",
      borderBottomRightRadius: "70% 40%",
      borderBottomLeftRadius: "40% 60%",
      duration: 7,
    })
    .to(blobRef.current, {
      borderTopLeftRadius: "40% 50%",
      borderTopRightRadius: "70% 60%",
      borderBottomRightRadius: "50% 60%",
      borderBottomLeftRadius: "60% 40%",
      duration: 7,
    })
    .to(blobRef.current, {
      borderTopLeftRadius: "50% 60%",
      borderTopRightRadius: "40% 50%",
      borderBottomRightRadius: "60% 70%",
      borderBottomLeftRadius: "70% 30%",
      duration: 7,
    });
    
    // Slight movement animation
    gsap.to(blobRef.current, {
      x: "1rem",
      y: "1rem",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay + 2,
    });
    
    return () => {
      tl.kill();
    };
  }, [delay]);

  return (
    <div
      ref={blobRef}
      className="absolute rounded-blob bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-60 z-0 pointer-events-none"
      style={{
        width,
        height,
        ...position,
        borderTopLeftRadius: "50% 60%",
        borderTopRightRadius: "60% 40%",
        borderBottomRightRadius: "40% 60%",
        borderBottomLeftRadius: "60% 40%",
      }}
    ></div>
  );
};

export default GradientBlob;