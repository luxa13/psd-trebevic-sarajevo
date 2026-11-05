'use client';

import React from 'react';
import Image from 'next/image';
import { Mountain, ArrowRight, ShieldCheck, CableCar, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenTourModal: () => void;
  onOpenAiGuide: () => void;
}

export default function Hero({ onOpenTourModal, onOpenAiGuide }: HeroProps) {
  return (
    <section className="relative pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 lg:pb-24 overflow-hidden">
      {/* Background Subtle Gradient Field */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2F7F4] via-transparent to-transparent dark:from-[#08120D] dark:via-transparent dark:to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Proposition & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Unboxed Metadata Kicker (Anti-Pill Rule) */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-semibold text-[#143522] dark:text-[#9EB5A7] tracking-wider uppercase">
              <span className="flex items-center gap-1.5 text-[#B8282D] dark:text-[#D9383E] font-bold">
                <Mountain className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                PSD TREBEVIĆ SARAJEVO
              </span>
              <span aria-hidden="true">·</span>
              <span>Osnovano 2006.</span>
              <span aria-hidden="true">·</span>
              <span>Vrh Sofe 1629<span className="normal-case">m</span></span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-[#111D16] dark:text-[#F0F6F2] tracking-tight leading-[1.18] sm:leading-[1.12] [text-wrap:balance]">
              Pluća Sarajeva i dom{' '}
              <span className="text-[#143522] dark:text-[#42A169] underline decoration-[#B8282D] decoration-4 underline-offset-8">
                sarajevskih planinara
              </span>
              <span className="ml-0.5 inline-block">.</span>
            </h1>

            {/* Concrete Value Proposition Prose */}
            <p className="text-sm sm:text-base md:text-lg text-[#42584C] dark:text-[#9EB5A7] leading-relaxed max-w-2xl font-normal">
              Dobrodošli na zvanični portal Planinarsko-sportskog društva „Trebević”.
              Istražite markirane staze preko Vidikovca i Bob staze 1984., provjerite stanje na vrhu Sofe (1629m),
              prijavite se na klupske ekspedicije i doživite zaštićeni pejzaž prirode Sarajeva.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#staze"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-bold text-white bg-[#B8282D] hover:bg-[#9A2024] dark:bg-[#B8282D] dark:hover:bg-[#9A2024] rounded-lg transition-all shadow-sm hover:shadow-md min-h-[44px] uppercase"
              >
                <span>Istraži Staze i Uspon</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#ture"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#143522] dark:text-[#EAF3EC] bg-white dark:bg-[#15231B] hover:bg-[#EFF4F0] dark:hover:bg-[#1C2F24] border border-[#DEE8E1] dark:border-[#243A2C] rounded-lg transition-all min-h-[44px] uppercase"
              >
                <span>Klupske Ture i Prijava</span>
              </a>

              <button
                onClick={onOpenAiGuide}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-[#42584C] dark:text-[#9EB5A7] hover:text-[#111D16] dark:hover:text-white transition-colors min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-[#B8282D]" />
                <span>AI Vodič</span>
              </button>
            </div>

            {/* Trust Markers & Adjacency */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#526D5F] dark:text-[#7A9686]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#143522] dark:text-[#42A169]" />
                Licencirani UIAA / PS BiH vodiči
              </span>
              <span className="flex items-center gap-1.5">
                <CableCar className="w-4 h-4 text-[#B8282D]" />
                Obnovljena Sarajevska žičara (1160m)
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500" />
                Zaštićeni pejzaž Kantona Sarajevo
              </span>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#DEE8E1] dark:border-[#1F3327] bg-[#143522] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
              <picture className="absolute inset-0">
                <source
                  type="image/avif"
                  media="(max-width: 768px)"
                  srcSet="/images/trebevic-summit-marker-640.avif 640w, /images/trebevic-summit-marker-768.avif 768w"
                  sizes="100vw"
                />
                <source
                  type="image/avif"
                  srcSet="/images/trebevic-summit-marker-1154.avif 1154w"
                  sizes="50vw"
                />
                <Image
                  src="/images/trebevic-summit-marker.jpeg"
                  alt="Pogled sa vrha Trebevića prema Sarajevu i okolnim planinama"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </picture>

              {/* Scrim Overlay for Typographic Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Floating Live Badge & Coordinates */}
              <div className="absolute top-3 left-3 right-3 flex flex-col items-start gap-2 text-white text-[10px] sm:top-4 sm:left-4 sm:right-4 sm:flex-row sm:items-center sm:justify-between sm:text-xs font-medium">
                <div className="bg-[#143522]/90 backdrop-blur-md px-2.5 py-1.5 sm:px-3 rounded-md border border-white/10 flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Stanje: Otvorene staze</span>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-2.5 py-1.5 sm:px-3 rounded-md border border-white/10 font-mono text-[10px] sm:text-[11px] tabular-nums whitespace-nowrap">
                  43.8344° N, 18.4519° E
                </div>
              </div>

              {/* Bottom Card Annotation */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                  Vrh Sofe · 1629<span className="normal-case">m</span>
                </p>
                <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm">
                  Dinarski krečnjački greben iznad Baščaršije
                </h3>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Metric Strip Directly Below Hero Split */}
        <div className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-[#DEE8E1] dark:border-[#1F3327] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-semibold text-[#42584C] dark:text-[#9EB5A7] uppercase tracking-wider">
              Nadmorska visina
            </span>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#143522] dark:text-white font-mono tabular-nums">
              1.629 m
            </div>
            <p className="text-[11px] sm:text-xs text-[#526D5F] dark:text-[#7A9686]">
              Najviša tačka (vrh Sofe)
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-semibold text-[#42584C] dark:text-[#9EB5A7] uppercase tracking-wider">
              Markirane staze
            </span>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#143522] dark:text-white font-mono tabular-nums">
              42 km
            </div>
            <p className="text-[11px] sm:text-xs text-[#526D5F] dark:text-[#7A9686]">
              Održava PSD Trebević
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-semibold text-[#42584C] dark:text-[#9EB5A7] uppercase tracking-wider">
              Olimpijska baština
            </span>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#B8282D] dark:text-[#D9383E] font-mono tabular-nums">
              ZOI &apos;84
            </div>
            <p className="text-[11px] sm:text-xs text-[#526D5F] dark:text-[#7A9686]">
              1.300m bob i sankaška staza
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-semibold text-[#42584C] dark:text-[#9EB5A7] uppercase tracking-wider">
              GSS Stanica Sarajevo
            </span>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#143522] dark:text-white font-mono tabular-nums">
              121
            </div>
            <p className="text-[11px] sm:text-xs text-[#526D5F] dark:text-[#7A9686]">
              Hitni poziv 24/7 na planini
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
