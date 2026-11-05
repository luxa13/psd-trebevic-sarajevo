'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CLUB_NEWS, NewsArticle } from '@/lib/trebevic-data';
import { Calendar, Clock, User, ArrowRight, X, Newspaper } from 'lucide-react';

export default function NewsSection() {
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  return (
    <section id="novosti" className="py-12 sm:py-16 md:py-24 border-t border-[#DEE8E1] dark:border-[#1F3327] bg-[#F7FAF8] dark:bg-[#0C1410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#143522] dark:text-[#9EB5A7] tracking-wider uppercase mb-2">
              <span className="text-[#B8282D] dark:text-[#D9383E] font-bold">05</span>
              <span aria-hidden="true">·</span>
              <span>Klupske Vijesti</span>
              <span aria-hidden="true">·</span>
              <span>PSD Trebević Info</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111D16] dark:text-[#F0F6F2] tracking-tight [text-wrap:balance]">
              Aktuelnosti, akcije i obavještenja
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-[#42584C] dark:text-[#9EB5A7] max-w-2xl leading-relaxed">
              Pratite rad markacističke sekcije, ekološke akcije očuvanja planine Trebević
              i novosti o pogodnostima za članove društva.
            </p>
          </div>

          <div className="text-xs text-[#526D5F] dark:text-[#88A393] font-mono">
            Zvanični bilten društva
          </div>
        </div>

        {/* Dynamic News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CLUB_NEWS.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveArticle(article);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Pročitaj vijest: ${article.title}`}
              className="bg-white dark:bg-[#141F19] rounded-2xl border border-[#DEE8E1] dark:border-[#24352B] overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#143522] dark:hover:border-[#357D56] transition-all cursor-pointer group"
            >
              <div>
                {/* Article Thumbnail */}
                <div className="relative w-full aspect-[16/9] bg-[#143522] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#143522]/90 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded">
                    {article.category}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-[#526D5F] dark:text-[#88A393] mb-2 font-mono">
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#111D16] dark:text-white leading-snug group-hover:text-[#B8282D] dark:group-hover:text-[#D9383E] transition-colors">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#42584C] dark:text-[#9EB5A7] line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Read More CTA */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 sm:pt-2 flex items-center justify-between text-xs font-bold text-[#143522] dark:text-[#42A169] group-hover:text-[#B8282D] dark:group-hover:text-[#D9383E] transition-colors">
                <span>Pročitaj cijeli članak</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#141F19] rounded-2xl shadow-2xl border border-[#DEE8E1] dark:border-[#24352B] overflow-hidden my-4 sm:my-8">
            {/* Header */}
            <div className="bg-[#143522] text-white px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#A8C2B3]">
                <Newspaper className="w-4 h-4 text-amber-400" />
                <span>{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.date}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                aria-label="Zatvori članak"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Body */}
            <div className="p-4 sm:p-6 lg:p-8 max-h-[75vh] overflow-y-auto space-y-4">
              <h3 id="article-modal-title" className="text-lg sm:text-xl md:text-2xl font-black text-[#111D16] dark:text-white leading-tight">
                {activeArticle.title}
              </h3>

              <div className="text-xs text-[#526D5F] dark:text-[#88A393] flex items-center gap-4 py-2 border-b border-[#DEE8E1] dark:border-[#1F3327]">
                <span>Autor: <strong>{activeArticle.author}</strong></span>
                <span>{activeArticle.readTime}</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#334A3E] dark:text-[#A8C2B3] leading-relaxed pt-2">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 sm:pt-6 border-t border-[#DEE8E1] dark:border-[#1F3327] flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] text-xs font-bold text-white bg-[#143522] dark:bg-[#1F4E34] hover:bg-[#B8282D] rounded-lg transition-colors flex items-center justify-center"
                >
                  Zatvori
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
