import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const ThankYou: React.FC = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Nota: O evento 'Lead' agora é disparado no FormSection.tsx APÓS o sucesso do banco de dados.
    // Isso evita contagem dupla se o usuário recarregar esta página e garante que o Lead só conta se os dados foram salvos.

    // Lógica de redirecionamento
    const whatsappUrl = "https://chat.whatsapp.com/FBNQeg1MOgeA3OLvB72uri";
    
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const redirect = setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative p-4 bg-dark-bg text-white">
       {/* Background Ambience */}
       <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-[0.15]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/90"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full bg-dark-card/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
          Inscrição Confirmada!
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed">
          Parabéns pela decisão. Seu acesso ao sistema <span className="text-cyan-brand font-bold">Copy Trader</span> foi reservado com sucesso.
        </p>
        
        <div className="bg-dark-bg/80 rounded-xl p-6 border border-white/10 mb-8 max-w-md mx-auto">
          <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">Próximo Passo</p>
          <p className="text-white text-lg">
            Você será redirecionado para o Grupo VIP no WhatsApp em <span className="text-cyan-brand font-bold text-2xl mx-1">{countdown}</span> segundos...
          </p>
        </div>

        <a 
          href="https://chat.whatsapp.com/FBNQeg1MOgeA3OLvB72uri"
          className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg py-4 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-green-900/20 group"
        >
           Entrar no Grupo Agora <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default ThankYou;