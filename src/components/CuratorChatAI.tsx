import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  ShieldCheck, 
  Award, 
  Calendar,
  Phone,
  ChevronDown
} from 'lucide-react';

interface CuratorChatAIProps {
  onOpenBooking: () => void;
  onExploreRelic: (keyword: string) => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestedAction?: {
    label: string;
    action: () => void;
  };
}

export const CuratorChatAI: React.FC<CuratorChatAIProps> = ({
  onOpenBooking,
  onExploreRelic,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Namaste & Welcome to Tulip International. I am your Digital Antiquarian Assistant, trained on over 38 years of Indian antique curation by Franchisko Gamini Paluwe. How may I assist your collection journey today?',
      time: 'Just now'
    }
  ]);

  const quickPrompts = [
    'How are Indian antiques evaluated & authenticated?',
    'Tell me about Wootz Damascus steel swords',
    'How do I book a private viewing in Munich?',
    'What brass temple lamps do you have from the 18th century?'
  ];

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');

    // Generate smart curatorial response
    setTimeout(() => {
      let replyText = '';
      let suggestedAction: any = undefined;

      const lower = textToSend.toLowerCase();
      if (lower.includes('book') || lower.includes('visit') || lower.includes('viewing') || lower.includes('appointment') || lower.includes('munich') || lower.includes('augustenstra')) {
        replyText = 'Private salon viewings at our Munich gallery (Augustenstraße 41, 80333 München) can be reserved online. Founder Franchisko Gamini Paluwe personally presents the requested relics with complete provenance documentation and hospitality service.';
        suggestedAction = {
          label: 'Open Booking Form',
          action: onOpenBooking
        };
      } else if (lower.includes('wootz') || lower.includes('sword') || lower.includes('khanda') || lower.includes('shield') || lower.includes('armor') || lower.includes('rajput')) {
        replyText = 'Our arms collection includes authenticated 18th-19th Century Mewar and Marwar battle weaponry, such as our c. 1815 Imperial Khanda in crucible Wootz Damascus steel with 24k gold koftgari inlay (Certificate TLP-1987-W02).';
        suggestedAction = {
          label: 'View Rajput Armory Relics',
          action: () => onExploreRelic('sword')
        };
      } else if (lower.includes('lamp') || lower.includes('diya') || lower.includes('brass') || lower.includes('bronze')) {
        replyText = 'We feature magnificent lost-wax cast Panchaloha brass temple lamps, notably the c. 1785 Royal 108-Wick Mayur Deepalakshmi (Certificate TLP-1987-L01) from the Marwar court, preserving authentic natural olive verdigris patinas.';
        suggestedAction = {
          label: 'View Antique Brass Collection',
          action: () => onExploreRelic('lamp')
        };
      } else if (lower.includes('authenticate') || lower.includes('provenance') || lower.includes('coa') || lower.includes('evaluate') || lower.includes('test')) {
        replyText = 'At Tulip International, every artifact undergoes multi-tier testing: X-Ray Fluorescence (XRF) spectrometry for metallurgy, Raman spectroscopy on miniature pigments, and legal provenance chain-of-custody verification before receiving a sealed CoA.';
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('buy') || lower.includes('acquire')) {
        replyText = 'Our collection spans verified royal artifacts ranging from €1,950 up to €9,500+, each fully insured for global crating and accompanied by a lifetime genuineness guarantee. Direct curator inquiries can also be placed via phone at 9083531892.';
      } else {
        replyText = `Thank you for your inquiry regarding "${textToSend}". Tulip International's Munich salon at Augustenstraße 41 houses over three centuries of authenticated Indian heritage relics. Would you like to schedule a private viewing or speak with curator Franchisko Gamini Paluwe directly at 9083531892?`;
        suggestedAction = {
          label: 'Book Private Salon Viewing',
          action: onOpenBooking
        };
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Widget Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            id="curator-ai-chat-trigger"
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#4A0E17] via-[#58111A] to-[#36080F] text-[#FFF3B0] rounded-full border-2 border-[#D4AF37] shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer font-display text-xs font-bold uppercase tracking-wider group"
          >
            <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#2E050B] flex items-center justify-center font-bold">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>Ask Curator Desk</span>
          </button>
        )}
      </div>

      {/* Chat Dialog Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-[#FAF7F2] rounded-2xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col max-h-[540px]">
          
          {/* Header */}
          <div className="bg-[#4A0E17] text-[#FAF7F2] px-4 py-3 border-b border-[#C5A059]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#2E050B] flex items-center justify-center font-bold font-display text-xs">
                TI
              </div>
              <div>
                <h4 className="font-display font-bold text-xs tracking-wider text-[#FFF3B0]">
                  TULIP CURATOR ASSISTANT
                </h4>
                <span className="text-[10px] text-[#E5C07B] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  Founder Paluwe's Heritage Desk
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#FAF7F2] hover:text-[#D4AF37] p-1"
              aria-label="Close chat"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3.5 text-xs text-neutral-800 bg-[#FAF7F2]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#4A0E17] text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    TI
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-xl space-y-1.5 ${
                    m.sender === 'user'
                      ? 'bg-[#4A0E17] text-[#FFF3B0] rounded-tr-none'
                      : 'bg-white text-neutral-800 border border-[#C5A059]/30 shadow-sm rounded-tl-none font-serif-sub'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  
                  {m.suggestedAction && (
                    <button
                      onClick={m.suggestedAction.action}
                      className="mt-1.5 block w-full text-center py-1.5 px-2 bg-[#F5EFEB] hover:bg-[#EBE2DC] text-[#4A0E17] font-sans font-bold text-[10px] uppercase tracking-wider rounded border border-[#C5A059]/40"
                    >
                      {m.suggestedAction.label} &rarr;
                    </button>
                  )}

                  <span className={`text-[9px] block text-right ${m.sender === 'user' ? 'text-[#FAF7F2]/60' : 'text-neutral-400'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-[#F5EFEB] border-t border-[#C5A059]/20 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-[10px] whitespace-nowrap bg-white text-[#4A0E17] px-2.5 py-1 rounded-full border border-[#C5A059]/30 hover:bg-[#4A0E17] hover:text-[#FFF3B0] transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#C5A059]/30 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Ask about swords, lamps, viewing..."
              className="flex-1 p-2 text-xs bg-[#FAF7F2] border border-[#C5A059]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] text-neutral-800"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 bg-[#4A0E17] text-[#FFF3B0] rounded-lg hover:bg-[#58111A] transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
