import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

declare global {
  interface Window {
    fbq: any;
  }
}

export const FormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare payload with ISO string for date
      // Note: Mapping 'whatsapp' form field to 'phone' column in DB, as 'whatsapp' column was reported missing.
      const payload = { 
        name: formData.name, 
        email: formData.email, 
        phone: formData.whatsapp, 
        created_at: new Date().toISOString()
      };

      // 1. Registrar no Supabase
      const { error } = await supabase
        .from('leads')
        .insert([payload]);

      if (error) {
        // Log detailed error and throw to catch block
        throw new Error(error.message || 'Erro desconhecido no banco de dados');
      }

      // 2. Registrar evento no Meta Pixel (Apenas se salvou no banco com sucesso)
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Copy Trader Signup',
          currency: 'BRL',
          value: 0.00
        });
      }

      // 3. Redirecionar para página de obrigado com pequeno delay para garantir envio do Pixel
      setTimeout(() => {
        window.location.href = '/obrigado';
      }, 300);
      
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      // Não redirecionar em caso de erro, mostrar feedback ao usuário
      alert("Houve um erro ao realizar sua inscrição. Por favor, verifique seus dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col-reverse md:flex-col justify-center px-4 md:px-8 lg:px-12 py-8 lg:py-0 relative z-20">
      
      {/* 
        Mobile Layout Strategy: 
        Using flex-col-reverse on mobile puts the Form (last element in HTML) at the Top, 
        and Text (first element in HTML) at the Bottom.
        
        However, the requirement is: Video (Top) -> Form (Middle) -> Text (Bottom).
        Video is handled in App.tsx.
        Here inside FormSection, we need Form to be visually first on mobile, then Text.
      */}

      {/* Text Group - Visually appears AFTER form on mobile due to flex-col-reverse */}
      <div className="mt-8 md:mt-0">
        {/* Pre-title */}
        <span className="text-gray-400 text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4 inline-block">
          fale investidor
        </span>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-[1.15] mb-6">
          Automatize Seus Resultados Sem Precisar Analisar Gráficos Com O Nosso <span className="text-cyan-brand inline-block">COPY TRADER</span>
        </h1>

        {/* Subtitle */}
        <div className="flex items-start gap-3 mb-8 md:mb-10">
          <ArrowRight className="text-cyan-brand w-6 h-6 mt-1 flex-shrink-0 animate-pulse" />
          <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed">
            Assista ao vídeo curto ao lado para entender como nosso <span className="font-bold text-cyan-brand">algoritmo trabalha por você 24 horas por dia.</span>
          </p>
        </div>
      </div>

      {/* Form Container - Visually appears FIRST on mobile due to flex-col-reverse */}
      <form id="signup-form" onSubmit={handleSubmit} className="w-full max-w-md bg-dark-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden group mb-0 md:mb-8">
        
        {/* Subtle glow effect on form hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-brand/20 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"></div>
        
        <div className="space-y-4 relative z-10">
          
          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Seu nome*</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Seu nome completo"
              className="w-full bg-dark-input border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-brand/50 focus:ring-1 focus:ring-cyan-brand/50 transition-all text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Seu e-mail*</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="seu.email@gmail.com"
              className="w-full bg-dark-input border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-brand/50 focus:ring-1 focus:ring-cyan-brand/50 transition-all text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* WhatsApp Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="whatsapp" className="text-sm font-medium text-gray-300 ml-1">Seu WhatsApp com DDD*</label>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pr-2 border-r border-white/10 pointer-events-none">
                 {/* Brazil Flag SVG */}
                <img 
                  src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/br.svg" 
                  alt="Brasil" 
                  className="w-5 h-auto rounded-sm"
                />
                <span className="text-gray-400 text-sm ml-2">+55</span>
              </div>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                required
                placeholder="(11) 99999-9999"
                className="w-full bg-dark-input border border-white/10 rounded-lg pl-24 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-brand/50 focus:ring-1 focus:ring-cyan-brand/50 transition-all text-sm"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-cyan-brand hover:bg-cyan-400 text-white font-heading font-bold text-base md:text-lg py-4 rounded-lg shadow-[0_0_20px_rgba(0,191,255,0.3)] hover:shadow-[0_0_30px_rgba(0,191,255,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'PROCESSANDO...' : 'GARANTIR ACESSO AGORA'}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-3">
            <Lock className="w-3 h-3 inline mr-1" />
            Seus dados estão 100% seguros
          </p>
        </div>
      </form>
    </div>
  );
};