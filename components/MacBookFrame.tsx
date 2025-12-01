import React from 'react';

interface MacBookFrameProps {
  children: React.ReactNode;
}

export const MacBookFrame: React.FC<MacBookFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto max-w-[900px] w-full transform transition-all duration-500 hover:scale-[1.01]">
      {/* Top Lid / Screen Bezel */}
      <div className="relative bg-[#0d0d0d] rounded-t-2xl border-[1px] border-[#333] shadow-2xl overflow-hidden aspect-video">
        {/* Camera Dot */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1a1a1a] rounded-full z-20 border border-[#222] shadow-[0_0_2px_rgba(255,255,255,0.1)]"></div>
        
        {/* Screen Content (The Video) */}
        <div className="absolute inset-[3px] md:inset-[6px] bg-black rounded-t-lg overflow-hidden border border-[#111] relative group">
          {children}
          
          {/* PREMIUM REFLECTION LAYERS (Glass Effect) */}
          <div className="absolute inset-0 pointer-events-none z-10 select-none">
             {/* 1. Main Ambient Glare (Top-Left Light Source) */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60 mix-blend-overlay"></div>
             
             {/* 2. Diagonal Sharp Reflection (Simulates a light strip reflection) */}
             <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 transform translate-y-10 opacity-20"></div>

             {/* 3. Subtle Bottom Reflection (Simulating keyboard/surface reflection on glass) */}
             <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Hinge Area */}
      <div className="relative h-4 bg-[#1a1a1a] mx-auto w-full rounded-b-md shadow-inner border-x border-b border-[#222] z-10"></div>

      {/* Base Top Edge (The metallic lip) */}
      <div className="relative h-[12px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-xl mx-auto w-[102%] -mt-3 shadow-[0_20px_40px_-10px_rgba(0,191,255,0.15)] flex justify-center items-end border-t border-[#333]">
         {/* Opening indent */}
         <div className="w-16 h-1 bg-[#111] rounded-full mb-1 opacity-60 shadow-[0_1px_0_rgba(255,255,255,0.05)]"></div>
      </div>
    </div>
  );
};