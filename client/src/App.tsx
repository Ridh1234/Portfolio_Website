import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CustomCursor from "@/components/CustomCursor";
import IntroAnimation from "@/components/IntroAnimation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [appReady, setAppReady] = useState(false);
  
  // Check if the user has seen the intro before
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
      setAppReady(true);
    }
  }, []);
  
  const handleIntroComplete = () => {
    setShowIntro(false);
    setAppReady(true);
    // Store that the user has seen the intro
    localStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <QueryClientProvider client={queryClient}>
      {showIntro && <IntroAnimation onAnimationComplete={handleIntroComplete} />}
      {/* Only show the content after the intro is complete */}
      {(appReady || !showIntro) && (
        <>
          <CustomCursor />
          <Router />
          <Toaster />
        </>
      )}
    </QueryClientProvider>
  );
}

export default App;
