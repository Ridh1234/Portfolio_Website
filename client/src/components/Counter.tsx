import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const Counter = ({ value, decimals = 0, suffix = "", prefix = "", className = "" }: CounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startValue = 0;
    const duration = 2000;
    const step = (value / duration) * 10;
    
    const counter = setInterval(() => {
      startValue += step;
      
      if (startValue >= value) {
        setDisplayValue(value);
        clearInterval(counter);
      } else {
        setDisplayValue(startValue);
      }
    }, 10);
    
    return () => {
      clearInterval(counter);
    };
  }, [isInView, value]);

  return (
    <span className={className} ref={counterRef}>
      {prefix}
      {displayValue < value 
        ? decimals > 0 
          ? displayValue.toFixed(decimals) 
          : Math.floor(displayValue)
        : decimals > 0 
          ? value.toFixed(decimals) 
          : value
      }
      {suffix}
    </span>
  );
};

export default Counter;
