import { useState, useEffect } from "react";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Animate the progress bar when component mounts
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [percentage]);
  
  return (
    <div className="progress-bar">
      <div 
        className="progress-bar-fill bg-gradient-to-r from-primary to-secondary"
        style={{ 
          width: `${width}%`,
          transition: "width 1s ease-in-out"
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;