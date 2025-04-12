import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CustomCursor from "@/components/CustomCursor";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading resources
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 - prev) * 0.1;
        return newProgress >= 99 ? 100 : newProgress;
      });
    }, 100);

    // Add assets preloading logic here if needed
    const preloadResources = async () => {
      // Simulate loading time for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(loadingInterval);
      setProgress(100);
      
      // Allow animation to complete before hiding loader
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    };

    preloadResources();

    return () => {
      clearInterval(loadingInterval);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      
      {/* Initial Page Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="max-w-[300px] w-full px-6">
              <motion.h1 
                className="text-3xl font-heading font-bold mb-4 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-primary">H</span>ridyansh <span className="text-secondary">S</span>harma
              </motion.h1>
              
              <div className="relative h-1 bg-background-alt rounded-full overflow-hidden mb-6">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              
              <motion.div 
                className="text-center text-text-secondary text-sm font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {progress < 100 ? 'Loading experience...' : 'Ready!'}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="page-transitions">
        <Router />
      </div>
      
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
