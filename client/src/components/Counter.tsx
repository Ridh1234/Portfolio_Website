import { useState, useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const Counter = ({ value, decimals = 0, suffix = "", prefix = "", className = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const frameRef = useRef(0);
  
  useEffect(() => {
    const duration = 2000; // Duration in milliseconds
    const startTimestamp = performance.now();
    const startValue = 0;
    
    const step = (timestamp: number) => {
      if (!countRef.current) countRef.current = 0;
      
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentCount = Math.floor(easedProgress * (value - startValue) + startValue);
      
      if (countRef.current !== currentCount) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    
    frameRef.current = requestAnimationFrame(step);
    
    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [value]);
  
  // Easing function for smoother animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };
  
  const formatNumber = (num: number): string => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    
    return formatter.format(num);
  };
  
  return (
    <span className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default Counter;