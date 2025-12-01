import React, { useState, useEffect } from 'react';
import { VideoSection } from './components/VideoSection';
import { FormSection } from './components/FormSection';
import ThankYou from './pages/ThankYou';
import { ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Simple path listener in case we manipulate history, 
    // though FormSection uses window.location.href for hard reload to ensure pixel fires.
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Basic routing
  if (currentPath === '/obrigado') {
    return <ThankYou />;
  }

  const scrollToForm = () => {
    const formElement = document.getElementById('signup-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main className="min-h-screen w-full bg-dark-bg text-white relative overflow-x-hidden font-sans selection:bg-cyan-brand/30 selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Texture */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-[0.15]"></div>
        
        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-brand/5 rounded-full blur-[120px]"></div>
        
        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* 
            Grid Layout 
            Mobile Requested Order: Video (Top) -> Form (Middle) -> Text (Bottom)
            
            App.tsx handles: 
            1. VideoSection (Contains Video)
            2. FormSection (Contains Form + Text)
            
            On Mobile:
            - We render VideoSection first.
            - We render FormSection second.
            - Inside FormSection (see FormSection.tsx), we use flex-col-reverse to put Form above Text.
          */}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            
            {/* 
              Left Column (Video)
              Desktop: Order 1 (Left)
              Mobile: Order 1 (Top)
            */}
            <div className="w-full lg:w-1/2 order-1 lg:order-1">
              <VideoSection />
            </div>

            {/* 
              Right Column (Form/Copy)
              Desktop: Order 2 (Right)
              Mobile: Order 2 (Bottom)
            */}
            <div className="w-full lg:w-1/2 order-2 lg:order-2">
              <FormSection />
            </div>

          </div>
          
        </div>
      </div>

      {/* Decorative Footer Line */}
      <div className="fixed bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-brand/30 to-transparent"></div>

      {/* Mobile Sticky CTA Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-50 bg-[#0A0A0A]/90 backdrop-blur border-t border-white/10 md:hidden animate-in slide-in-from-bottom-5 duration-700">
        <button 
          onClick={scrollToForm}
          className="w-full bg-cyan-brand text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(0,191,255,0.4)] flex items-center justify-center gap-2 uppercase tracking-wide"
        >
          QUERO MEU ACESSO AUTOMÁTICO <ChevronUp className="w-4 h-4" />
        </button>
      </div>

    </main>
  );
};

export default App;