'use client';

import React, { useState } from 'react';
import { UPCOMING_TOURS, ClubTour } from '@/lib/trebevic-data';
import { Calendar, Clock, MapPin, Users, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';

interface ToursSectionProps {
  onRegisterTour: (tour: ClubTour) => void;
}

export default function ToursSection({ onRegisterTour }: ToursSectionProps) {
  const [expandedGear, setExpandedGear] = useState<Set<string>>(() => new Set());

  const toggleGear = (tourId: string) => {
    setExpandedGear((current) => {
      const next = new Set(current);
      if (next.has(tourId)) {
        next.delete(tourId);
      } else {
        next.add(tourId);
      }
      return next;
    });
  };

  return (
    <section id="ture" className="py-12 sm:py-16 md:py-24 border-t border-[#DEE8E1] dark:border-[#1F3327] bg-[#F7FAF8] dark:bg-[#0C1410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#143522] dark:text-[#9EB5A7] tracking-wider uppercase mb-2">
              <span className="text-[#B8282D] dark:text-[#D9383E] font-bold">03</span>
              <span aria-hidden="true">·</span>
              <span>Kalendar Aktivnosti</span>
              <span aria-hidden="true">·</span>
              <span>Ekspedicije 2026/2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111D16] dark:text-[#F0F6F2] tracking-tight [text-wrap:balance]">
              Predstojeće klupske ture i usponi
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-[#42584C] dark:text-[#9EB5A7] max-w-2xl leading-relaxed">
              Pridružite se organizovanim pohodima PSD Trebević pod vodstvom licenciranih planinarskih vodiča.
              Svi pohodi uključuju sigurnosni protokol i besplatni su za građane i članove.
            </p>
          </div>

          <div className="text-xs text-[#526D5F] dark:text-[#88A393] font-mono">
            Aktivne prijave za {UPCOMING_TOURS.length} ture
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {UPCOMING_TOURS.map((tour) => {
            const seatsLeft = tour.maxParticipants - tour.currentRegistered;
            return (
              <div
                key={tour.id}
                className="bg-white dark:bg-[#141F19] rounded-2xl border border-[#DEE8E1] dark:border-[#24352B] p-4 sm:p-6 lg:p-7 flex flex-col justify-between shadow-sm hover:border-[#143522] dark:hover:border-[#357D56] transition-all"
              >
                <div>
                  {/* Top Bar on Card: Date, Time & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-[#DEE8E1]/60 dark:border-[#1F3327]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#143522] dark:text-[#42A169]">
                      <Calendar className="w-4 h-4 text-[#B8282D]" />
                      <span>{tour.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{tour.time}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        tour.status === 'Otvorene prijave'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}
                    >
                      {tour.status} ({seatsLeft} slobodno)
                    </span>
                  </div>

                  {/* Tour Title */}
                  <h3 className="mt-3.5 sm:mt-4 text-base sm:text-lg md:text-xl font-black text-[#111D16] dark:text-white leading-snug">
                    {tour.title}
                  </h3>

                  {/* Route & Guide Info */}
                  <div className="mt-3 space-y-1.5 text-xs text-[#42584C] dark:text-[#9EB5A7]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#B8282D] shrink-0 mt-0.5" />
                      <span><strong>Mjesto polaska:</strong> {tour.meetingPoint}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#143522] dark:text-[#42A169] shrink-0 mt-0.5" />
                      <span><strong>Vodič:</strong> {tour.guideName} ({tour.guideTitle})</span>
                    </div>
                  </div>

                  {/* Required Gear summary */}
                  <div className="mt-4 p-3 bg-[#F7FAF8] dark:bg-[#0D1612] rounded-xl border border-[#DEE8E1] dark:border-[#1F3327] text-xs">
                    <span className="font-bold text-[#111D16] dark:text-white block mb-1">
                      Potrebna oprema:
                    </span>
                    <p
                      id={`gear-${tour.id}`}
                      className={`text-[#526D5F] dark:text-[#88A393] ${expandedGear.has(tour.id) ? '' : 'line-clamp-2'}`}
                    >
                      {tour.requiredGear
                        .map((item, index) => index === 0 ? item : item.charAt(0).toLowerCase() + item.slice(1))
                        .join(', ')}
                    </p>
                    {tour.requiredGear.length > 2 && (
                      <button
                        type="button"
                        aria-expanded={expandedGear.has(tour.id)}
                        aria-controls={`gear-${tour.id}`}
                        onClick={() => toggleGear(tour.id)}
                        className="mt-1 inline-flex min-h-8 items-center gap-1 text-[11px] font-semibold text-[#143522] hover:text-[#B8282D] dark:text-[#9EB5A7] dark:hover:text-white"
                      >
                        {expandedGear.has(tour.id) ? 'Prikaži manje' : 'Prikaži više'}
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 transition-transform ${expandedGear.has(tour.id) ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#DEE8E1]/60 dark:border-[#1F3327] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="text-xs text-[#526D5F] dark:text-[#88A393]">
                    <span className="font-bold text-[#111D16] dark:text-white font-mono">
                      {tour.durationHours}h
                    </span>{' '}
                    trajanje · {tour.difficulty}
                  </div>

                  <button
                    onClick={() => onRegisterTour(tour)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-xs font-bold text-white bg-[#B8282D] hover:bg-[#9A2024] rounded-lg transition-colors shadow-sm"
                  >
                    <span>Prijavi se besplatno</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
