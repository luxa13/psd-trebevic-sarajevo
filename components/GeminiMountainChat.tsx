'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  Send,
  X,
  Sparkles,
  Bot,
  User,
  Shield,
  Trophy,
  Zap,
  Cpu,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import { isWeatherSnapshot, type WeatherSnapshot } from '@/lib/weather-snapshot';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

interface GeminiMountainChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GeminiMountainChat({ isOpen, onClose }: GeminiMountainChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content:
        'Pozdrav planinaru! Ja sam vaš AI vodič PSD Trebević Sarajevo. Mogu vam pomoći oko detalja uspona na vrh Sofe (1629m), stanja na stazama, olimpijskog boba ZOI \'84, potrebne opreme ili klupskih tura našeg društva. Kako vam mogu pomoći danas?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.1-flash-lite' | 'gemini-3.8-flash' | 'gemini-4-argon'>('gemini-3.1-flash-lite');
  const [rolePreset, setRolePreset] = useState<'guide' | 'safety' | 'olympic_historian'>('guide');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      let weather: WeatherSnapshot | null = null;
      try {
        const weatherResponse = await fetch('/api/weather');
        if (weatherResponse.ok) {
          const weatherData: unknown = await weatherResponse.json();
          if (isWeatherSnapshot(weatherData)) {
            weather = weatherData;
          } else {
            console.error('AI Guide received an invalid weather response.');
          }
        } else {
          console.error(`AI Guide weather request failed: ${weatherResponse.status}`);
        }
      } catch (weatherError: unknown) {
        console.error('AI Guide could not load weather data:', weatherError);
      }

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          model: selectedModel,
          rolePreset,
          weather,
        }),
      });

      const data = await response.json();
      if (!response.ok && !data.reply) {
        throw new Error(data.error || 'Privremena nedostupnost servisa.');
      }

      setMessages((prev) => [...prev, { role: 'model', content: data.reply }]);
    } catch (err: unknown) {
      let errorMsg = err instanceof Error ? err.message : 'Nije uspjelo povezivanje.';
      // Strip raw JSON error payloads if any leaked
      if (errorMsg.includes('{') && errorMsg.includes('}')) {
        errorMsg = 'Model je trenutno pod visokim opterećenjem. Uključujem automatski brzi režim vodiča.';
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: `⚠️ ${errorMsg} Molimo pokušajte ponovo ili odaberite "Brzi & stabilni vodič".`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        role: 'model',
        content: 'Razgovor je resetovan. Postavite novo pitanje o Trebeviću!',
      },
    ]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-chat-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl h-[85vh] max-h-[750px] bg-white dark:bg-[#141F19] rounded-2xl shadow-2xl border border-[#DEE8E1] dark:border-[#24352B] flex flex-col overflow-hidden">
        
        {/* Header with Role & Model Switcher */}
        <div className="bg-[#143522] text-white p-3.5 sm:p-5 flex flex-col gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#B8282D] flex items-center justify-center shadow-inner shrink-0">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 id="ai-chat-title" className="text-sm sm:text-base font-bold flex items-center gap-1.5 sm:gap-2">
                  <span>AI Planinarski Vodič Trebević</span>
                  <span className="text-[9px] sm:text-[10px] bg-white/20 px-1.5 sm:px-2 py-0.5 rounded font-mono">
                    Multi-turn
                  </span>
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[#A8C2B3]">
                  PSD Trebević Sarajevo · Inteligentni planinarski asistent
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleClearHistory}
                className="p-2 min-w-[38px] min-h-[38px] rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs flex items-center justify-center"
                title="Isprazni historiju razgovora"
                aria-label="Isprazni historiju razgovora"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 min-w-[38px] min-h-[38px] rounded-lg text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center"
                aria-label="Zatvori razgovor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Model & Role Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-white/10 text-xs">
            {/* Model Selector */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="model-select" className="text-[#A8C2B3] text-[10px] sm:text-[11px] shrink-0">
                Model:
              </label>
              <div className="relative min-w-0 flex-1">
                <select
                  id="model-select"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as typeof selectedModel)}
                  className="w-full appearance-none bg-[#0D1612] text-white text-[11px] pl-2 pr-8 py-1.5 min-h-[36px] rounded border border-white/20 focus:outline-none"
                >
                  <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Preporučeno · Brzi & stabilni vodič)</option>
                  <option value="gemini-3.8-flash">gemini-3.8-flash (Standardni vodič + Auto-fallback)</option>
                  <option value="gemini-4-argon">gemini-4-argon (Duboka analiza i rute)</option>
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A8C2B3]" />
              </div>
            </div>

            {/* Role Preset */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="role-select" className="text-[#A8C2B3] text-[10px] sm:text-[11px] shrink-0">
                Uloga:
              </label>
              <div className="relative min-w-0 flex-1">
                <select
                  id="role-select"
                  value={rolePreset}
                  onChange={(e) => setRolePreset(e.target.value as typeof rolePreset)}
                  className="w-full appearance-none bg-[#0D1612] text-white text-[11px] pl-2 pr-8 py-1.5 min-h-[36px] rounded border border-white/20 focus:outline-none"
                >
                  <option value="guide">Planinarski vodič (Staze, domovi)</option>
                  <option value="safety">Gorska sigurnost (Rizik, meteo)</option>
                  <option value="olympic_historian">Olimpijski hroničar (ZOI &#39;84)</option>
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A8C2B3]" />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 p-3.5 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 bg-[#F7FAF8] dark:bg-[#0C1410]">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex gap-2.5 sm:gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#143522] dark:bg-[#1F4E34] text-white flex items-center justify-center shrink-0 text-xs shadow-sm mt-1">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[75%] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#B8282D] text-white rounded-tr-none shadow-sm'
                      : 'bg-white dark:bg-[#141F19] text-[#111D16] dark:text-[#F0F6F2] border border-[#DEE8E1] dark:border-[#24352B] rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>

                {isUser && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#B8282D] text-white flex items-center justify-center shrink-0 text-xs shadow-sm mt-1">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 sm:gap-3 justify-start items-center text-xs text-[#526D5F] dark:text-[#88A393]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#143522] text-white flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
              </div>
              <span className="italic">Planinarski asistent razmišlja ({selectedModel})...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-2 sm:px-4 bg-white dark:bg-[#141F19] border-t border-[#DEE8E1] dark:border-[#24352B] flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-[11px] whitespace-nowrap">
          <span className="text-[#6E8679] shrink-0 text-[10px] sm:text-xs">Predloženo:</span>
          <button
            onClick={() => {
              setInput('Koliko traje uspon sa Vidikovca na vrh Sofe i kakav je teren?');
            }}
            className="px-2.5 sm:px-3 py-1.5 min-h-[34px] rounded bg-[#EFF4F0] dark:bg-[#1E2D24] text-[#143522] dark:text-white hover:bg-[#DEE8E1] dark:hover:bg-[#2B4033] transition-colors flex items-center"
          >
            Vrh Sofe uspon
          </button>
          <button
            onClick={() => {
              setInput('Koja je obavezna oprema za zimski uspon na Trebević?');
            }}
            className="px-2.5 sm:px-3 py-1.5 min-h-[34px] rounded bg-[#EFF4F0] dark:bg-[#1E2D24] text-[#143522] dark:text-white hover:bg-[#DEE8E1] dark:hover:bg-[#2B4033] transition-colors flex items-center"
          >
            Zimska oprema
          </button>
          <button
            onClick={() => {
              setInput('Ispričaj mi historiju bob staze sa ZOI 1984 u Sarajevu.');
            }}
            className="px-2.5 sm:px-3 py-1.5 min-h-[34px] rounded bg-[#EFF4F0] dark:bg-[#1E2D24] text-[#143522] dark:text-white hover:bg-[#DEE8E1] dark:hover:bg-[#2B4033] transition-colors flex items-center"
          >
            Bob staza ZOI &apos;84
          </button>
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-2.5 sm:p-4 bg-white dark:bg-[#141F19] border-t border-[#DEE8E1] dark:border-[#24352B] flex items-center gap-2 shrink-0"
        >
          <input
            id="ai-guide-message"
            name="message"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Poruka za AI planinarskog vodiča"
            placeholder="Postavite pitanje o stazama, vremenu ili klubu..."
            disabled={isLoading}
            className="flex-1 px-3.5 sm:px-4 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-xl bg-[#F7FAF8] dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#24352B] text-[#111D16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B8282D]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-[#B8282D] hover:bg-[#9A2024] text-white rounded-xl disabled:opacity-40 transition-colors shrink-0 shadow-sm"
            aria-label="Pošalji poruku"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
