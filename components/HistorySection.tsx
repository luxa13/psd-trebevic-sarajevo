'use client';

import React from 'react';
import Image from 'next/image';
import { HISTORY_MILESTONES } from '@/lib/trebevic-data';
import { Landmark, Trophy, Mountain, Sparkles, CableCar, ShieldCheck } from 'lucide-react';

export default function HistorySection() {
  return (
    <section id="historija" className="py-16 md:py-24 border-t border-[#DEE8E1] dark:border-[#1F3327] bg-white dark:bg-[#0C1410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#143522] dark:text-[#9EB5A7] tracking-wider uppercase mb-2">
              <span className="text-[#B8282D] dark:text-[#D9383E] font-bold">06</span>
              <span aria-hidden="true">·</span>
              <span>Kulturno i Sportsko Naslijeđe</span>
              <span aria-hidden="true">·</span>
              <span>1896 - 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111D16] dark:text-[#F0F6F2] tracking-tight [text-wrap:balance]">
              Historija Trebevića: Od austrougarskih staza do XIV ZOI &apos;84
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#42584C] dark:text-[#9EB5A7] max-w-2xl">
              Planina koja grli Sarajevo vijekovima je bila inspiracija pjesnicima, planinarima i olimpijcima.
              Saznajte kako je Trebević postao svjetski prepoznatljiv sportski i prirodni dragulj.
            </p>
          </div>
        </div>

        {/* 2-Column Split: Visual Narrative & Historical Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Showcase & Heritage Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#DEE8E1] dark:border-[#1F3327] bg-[#143522] aspect-[4/3] group">
              <Image
                src="/images/bobsleigh.jpg"
                alt="Olimpijska bob staza na Trebeviću izgrađena za ZOI 1984"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase font-bold text-amber-300 block mb-1">
                  Sarajevo 1984 · 1.300 metara
                </span>
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  Olimpijska bob i sankaška staza Trebević
                </h3>
              </div>
            </div>

            {/* Geological & Nature Fact Box */}
            <div className="p-6 bg-[#F7FAF8] dark:bg-[#141F19] rounded-2xl border border-[#DEE8E1] dark:border-[#24352B] space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#143522] dark:text-[#42A169] uppercase tracking-wider">
                <Mountain className="w-4 h-4 text-[#B8282D]" />
                Geografske i botaničke specifičnosti
              </div>

              <div className="space-y-3 text-xs text-[#42584C] dark:text-[#9EB5A7] leading-relaxed">
                <p>
                  <strong className="text-[#111D16] dark:text-white">Geologija i kote:</strong> Trebević je krečnjačko-dolomitni masiv Dinarida.
                  Najviši vrh je <strong>Sofe (1629m)</strong>, telekomunikacijski toranj (1566m), Veliki Stupanj (1522m), Dom Jure Franko (1430m), izvor Dobre Vode (1310m), Vidikovac (1160m), Prvi Šumar na Ravnama (1070m), cilj bob staze (982m), te historijska austrougarska utvrda i opservatorij Čolina Kapa (966m).
                </p>
                <p>
                  <strong className="text-[#111D16] dark:text-white">Endemska flora:</strong> Na stijenama Trebevića raste rijetka 
                  <strong> Trebevićka ljubičica (Viola beckiana)</strong>, dinarska mlečika, te stoljetne šume munike i crnog bora zasađene krajem 19. vijeka.
                </p>
                <p>
                  <strong className="text-[#111D16] dark:text-white">Prirodni štit:</strong> Sa svojih 1.629 metara visine, Trebević stvara termički štit koji štiti Sarajevo od južnih ciklona i omogućava čist gorski zrak u svim godišnjim dobima.
                </p>
              </div>
            </div>

            {/* Official Club Emblem Showcase */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-[#143522] to-[#0A1B11] text-white rounded-2xl border border-[#244731] flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 shadow-md">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white shrink-0 p-1 shadow-inner ring-2 ring-[#B8282D]">
                <Image
                  src="/images/psd_trebevic_icon.png"
                  alt="Zvanični grb PSD Trebević Sarajevo"
                  width={192}
                  height={192}
                  className="object-contain w-full h-full"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#E04B50] font-bold block">
                  Autentični Znak Kluba
                </span>
                <h4 className="text-sm sm:text-base font-black tracking-tight leading-snug">
                  PSD Trebević Sarajevo (2006)
                </h4>
                <p className="text-[11px] sm:text-xs text-[#A8C2B3] leading-relaxed">
                  Zvanični simbol sarajevskih planinara — Trebevićka žičara, snježni vrhovi Dinarida i planinarski pijuci.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Editorial Timeline (7 cols) */}
          <div className="lg:col-span-7 relative pl-4 sm:pl-6 border-l-2 border-[#DEE8E1] dark:border-[#1F3327] space-y-8">
            {HISTORY_MILESTONES.map((milestone, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline dot */}
                <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#0C1410] border-4 border-[#143522] dark:border-[#42A169] group-hover:border-[#B8282D] transition-colors" />

                <div className="bg-[#F7FAF8] dark:bg-[#141F19] p-5 sm:p-6 rounded-xl border border-[#DEE8E1] dark:border-[#24352B] transition-all hover:border-[#143522] dark:hover:border-[#357D56] shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-black font-mono text-[#B8282D] dark:text-[#D9383E]">
                      {milestone.year}
                    </span>
                    <span aria-hidden="true" className="text-[#6E8679]">·</span>
                    <h3 className="text-base font-bold text-[#111D16] dark:text-white">
                      {milestone.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#42584C] dark:text-[#9EB5A7] leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
