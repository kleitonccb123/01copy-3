import React from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import { MacBookFrame } from './MacBookFrame';

export const VideoSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      
      {/* Laptop Container - Increased Size */}
      <div className="w-full relative z-10 transform lg:scale-125 origin-center transition-transform duration-500">
        <MacBookFrame>
          <iframe
            src="https://player.vimeo.com/video/1140514322?autoplay=1&muted=0&title=0&byline=0&portrait=0"
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Copy Trader Demo"
          ></iframe>
        </MacBookFrame>
      </div>

      {/* Reflection/Glow under laptop */}
      <div className="w-[80%] h-12 bg-cyan-brand/20 blur-3xl -mt-6 rounded-full opacity-40 pointer-events-none"></div>

      {/* Trust Badges - Positioned below */}
      <div className="w-full flex flex-wrap gap-4 md:gap-8 mt-10 justify-center items-center relative z-20 px-4">
        <div className="flex items-center gap-2 group justify-center">
          <div className="p-1.5 rounded-full bg-cyan-brand/10 border border-cyan-brand/20 group-hover:border-cyan-brand/50 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-cyan-brand" />
          </div>
          <span className="text-sm font-medium text-gray-300 tracking-wide uppercase font-heading text-center">
            Método Validado
          </span>
        </div>

        <div className="flex items-center gap-2 group justify-center">
          <div className="p-1.5 rounded-full bg-cyan-brand/10 border border-cyan-brand/20 group-hover:border-cyan-brand/50 transition-colors">
            <Lock className="w-5 h-5 text-cyan-brand" />
          </div>
          <span className="text-sm font-medium text-gray-300 tracking-wide uppercase font-heading text-center">
            Acesso Seguro
          </span>
        </div>
      </div>
    </div>
  );
};