'use client';

import React, { useState } from 'react';
import { Zap, Send, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function FastCheckWidget() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const quickQuestions = [
    'Može li se sa psom na Trebevićku žičaru?',
    'Da li ima vode na izvoru Dobre Vode?',
    'Radi li Dom Jure Franko vikendom?',
    'Kakva je prohodnost bob staze za šetnju?',
  ];

  const handleAsk = async (questionText: string) => {
    if (!questionText.trim() || isLoading) return;
    setIsLoading(true);
    setAnswer(null);
    const startTime = performance.now();

    try {
      let weather: unknown = null;
      try {
        const weatherResponse = await fetch('/api/weather');
        if (weatherResponse.ok) {
          weather = await weatherResponse.json();
        } else {
          console.error('Weather API request failed:', weatherResponse.status);
        }
      } catch (error: unknown) {
        console.error('Weather API request failed:', error);
      }

      const response = await fetch('/api/gemini/fast-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: questionText.trim(),
          context: 'Planinarsko-sportsko društvo Trebević Sarajevo, planina Trebević 1629m, žičara, Dom Jure Franko, bob staza',
          weather,
        }),
      });

      const data = await response.json();
      const endTime = performance.now();
      setLatencyMs(Math.round(endTime - startTime));

      if (!response.ok) {
        throw new Error(data.error || 'Greška pri brzom pregledu.');
      }

      setAnswer(data.answer);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Nije uspjelo.';
      setAnswer(`⚠️ ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 sm:py-14 md:py-16 border-t border-[#DEE8E1] dark:border-[#1F3327] bg-white dark:bg-[#0C1410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#F2F7F4] dark:bg-[#141F19] rounded-2xl border border-[#DEE8E1] dark:border-[#24352B] p-4 sm:p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-5 sm:mb-6">
            <div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#B8282D] dark:text-[#D9383E] tracking-wider uppercase mb-1">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                <span>Brzi odgovori · uz lokalne vremenske podatke</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[#143522] dark:text-[#42A169]">Open-Meteo · Gemini AI</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#111D16] dark:text-white tracking-tight [text-wrap:balance]">
                Trenutni odgovori o stazama, žičari i uslovima
              </h3>
              <p className="text-xs sm:text-sm text-[#526D5F] dark:text-[#88A393] mt-1">
                Vremenski podaci za vrh preuzimaju se uživo kada su dostupni; stanje snijega i prohodnost provjerite lokalno.
              </p>
            </div>

            {latencyMs !== null && (
              <div className="self-start md:self-auto shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-800 dark:text-emerald-300">
                <Clock className="w-3.5 h-3.5" />
                <span>Odziv: {latencyMs} ms</span>
              </div>
            )}
          </div>

          {/* Quick Clickable Query Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(q);
                  handleAsk(q);
                }}
                className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-lg bg-white dark:bg-[#0D1612] text-[#334A3E] dark:text-[#A8C2B3] hover:text-[#111D16] dark:hover:text-white border border-[#DEE8E1] dark:border-[#24352B] transition-colors text-left min-h-[38px] flex items-center"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(query);
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
          >
            <input
              id="fast-check-query"
              name="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Pitanje o stazama, žičari ili uslovima na Trebeviću"
              placeholder="Unesite brzi upit (npr. 'Kakvo je stanje staze do vrha?')..."
              disabled={isLoading}
              className="flex-1 px-3.5 sm:px-4 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-xl bg-white dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#24352B] text-[#111D16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B8282D]"
            />
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="px-5 py-2.5 min-h-[44px] text-xs sm:text-sm font-bold text-white bg-[#143522] dark:bg-[#1F4E34] hover:bg-[#B8282D] rounded-xl transition-colors disabled:opacity-40 flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              <Zap className="w-4 h-4" />
              <span>{isLoading ? 'Provjera...' : 'Pitaj dispečera'}</span>
            </button>
          </form>

          {/* Answer Box */}
          {answer && (
            <div className="mt-4 p-4 rounded-xl bg-white dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#24352B] text-xs sm:text-sm text-[#111D16] dark:text-[#F0F6F2] leading-relaxed shadow-sm">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="flex-1">{answer}</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
