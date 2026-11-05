'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  TREBEVIC_TRAILS,
  Trail,
} from '@/lib/trebevic-data';
import {
  calculateHikingTimeHours,
  formatHikingTime,
  calculateAverageGrade,
  calculateRecommendedWaterLiters,
  calculateCaloriesBurned,
} from '@/lib/trail-calculator';
import {
  Mountain,
  Compass,
  Droplets,
  Home,
  Flame,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Sliders,
  MapPin,
} from 'lucide-react';

interface TrailExplorerProps {
  onSelectTrailForTour?: (trail: Trail) => void;
}

type TrailRangeStyle = React.CSSProperties & { '--range-progress': string };

export default function TrailExplorer({ onSelectTrailForTour }: TrailExplorerProps) {
  const [selectedFilter, setSelectedFilter] = useState<'Sve' | 'Lako' | 'Umjereno' | 'Zahtjevno'>('Sve');
  const [activeTrailId, setActiveTrailId] = useState<string>(TREBEVIC_TRAILS[0].id);

  // Personalized Calculator State
  const [hikerWeightKg, setHikerWeightKg] = useState<number>(75);
  const [packWeightKg, setPackWeightKg] = useState<number>(8);
  const [ambientTempC, setAmbientTempC] = useState<number>(18);

  const filteredTrails = TREBEVIC_TRAILS.filter((trail) => {
    if (selectedFilter === 'Sve') return true;
    return trail.difficulty === selectedFilter;
  });

  const activeTrail = TREBEVIC_TRAILS.find((t) => t.id === activeTrailId) || TREBEVIC_TRAILS[0];

  const estimatedHours = calculateHikingTimeHours(
    activeTrail.distanceKm,
    activeTrail.elevationGainM,
    activeTrail.elevationLossM
  );
  const averageGrade = calculateAverageGrade(activeTrail.distanceKm, activeTrail.elevationGainM);
  const recommendedWater = calculateRecommendedWaterLiters(estimatedHours, ambientTempC);
  const estimatedCalories = calculateCaloriesBurned(estimatedHours, hikerWeightKg, packWeightKg);
  const getRangeStyle = (value: number, min: number, max: number): TrailRangeStyle => ({
    '--range-progress': `${((value - min) / (max - min)) * 100}%`,
  });

  return (
    <section id="staze" className="py-12 sm:py-16 md:py-24 border-t border-[#DEE8E1] dark:border-[#1F3327] bg-[#F7FAF8] dark:bg-[#0C1410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#143522] dark:text-[#9EB5A7] tracking-wider uppercase mb-2">
              <span className="text-[#B8282D] dark:text-[#D9383E] font-bold">01</span>
              <span aria-hidden="true">·</span>
              <span>Topografija i Rute</span>
              <span aria-hidden="true">·</span>
              <span>Planina Trebević</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111D16] dark:text-[#F0F6F2] tracking-tight [text-wrap:balance]">
              Najljepše planinarske staze i usponi
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-[#42584C] dark:text-[#9EB5A7] max-w-2xl leading-relaxed">
              Od porodičnih šetnji kroz borovu šumu do strmog stjenovitog grebena na vrh Sofe (1629m).
              Sve staze su redovno markirane standardnom Knafelčevom crveno-bijelom oznakom.
            </p>
          </div>

          {/* Interactive Filter Tabs (Button Segmented Controls) */}
          <div className="flex flex-wrap sm:inline-flex items-center p-1 bg-white dark:bg-[#141F19] rounded-xl border border-[#DEE8E1] dark:border-[#24352B] shadow-sm shrink-0 gap-1 w-full sm:w-auto">
            {(['Sve', 'Lako', 'Umjereno', 'Zahtjevno'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap min-h-[38px] flex items-center justify-center ${
                  selectedFilter === filter
                    ? 'bg-[#143522] text-white dark:bg-[#1F4E34] shadow-sm'
                    : 'text-[#42584C] dark:text-[#9EB5A7] hover:text-[#111D16] dark:hover:text-white'
                }`}
              >
                {filter === 'Sve' ? 'Sve staze' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Responsive Layout: Trail List & Deep Dive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Trail Cards Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {filteredTrails.map((trail) => {
              const isActive = trail.id === activeTrailId;
              return (
                <div
                  key={trail.id}
                  onClick={() => setActiveTrailId(trail.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveTrailId(trail.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  className={`text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-[#141F19] border-[#143522] dark:border-[#357D56] shadow-md ring-1 ring-[#143522]/20 dark:ring-[#357D56]/30'
                      : 'bg-white/60 dark:bg-[#111B15] border-[#DEE8E1] dark:border-[#1F3327] hover:border-[#B5C9BE] dark:hover:border-[#2B4736]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                    <h3 className="text-sm sm:text-base font-bold text-[#111D16] dark:text-[#F0F6F2] leading-snug">
                      {trail.id === 'trebevic-educational-trail' ? (
                        <>
                          Trebević - <span className="tracking-[0.05em]">EDUCATIONAL TRAIL</span>
                        </>
                      ) : trail.name}
                    </h3>
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                        trail.difficulty === 'Lako'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : trail.difficulty === 'Umjereno'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                    >
                      {trail.difficulty}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#42584C] dark:text-[#9EB5A7] line-clamp-2">
                    {trail.subtitle}
                  </p>

                  {/* Single Line Clean Metadata with Unboxed Dots */}
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#DEE8E1]/60 dark:border-[#1F3327] flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs text-[#526D5F] dark:text-[#88A393] font-mono tabular-nums">
                    <span>{trail.distanceKm} km</span>
                    <span aria-hidden="true">·</span>
                    <span>+{trail.elevationGainM}m uspon</span>
                    <span aria-hidden="true">·</span>
                    <span>{trail.peakElevationM}m vrh</span>
                    <span aria-hidden="true">·</span>
                    <span>~{trail.estimatedHours}h</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Trail Deep Profile & Interactive Math (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#141F19] rounded-2xl border border-[#DEE8E1] dark:border-[#24352B] p-4 sm:p-6 lg:p-8 shadow-sm">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 sm:pb-6 border-b border-[#DEE8E1] dark:border-[#1F3327]">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#B8282D] dark:text-[#D9383E] uppercase tracking-wider mb-1">
                  <span>Izabrana staza</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeTrail.difficulty}</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#111D16] dark:text-white leading-tight">
                  {activeTrail.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#42584C] dark:text-[#9EB5A7]">
                  {activeTrail.subtitle}
                </p>
              </div>

              {activeTrail.gpxFile ? (
                <a
                  href={activeTrail.gpxFile}
                  download
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-xs font-bold rounded-lg text-[#143522] dark:text-white bg-[#EFF4F0] dark:bg-[#1E2D24] hover:bg-[#DEE8E1] dark:hover:bg-[#283C30] transition-colors shrink-0 border border-[#DEE8E1] dark:border-[#2C4235]"
                  aria-label={`Preuzmi provjerenu GPX rutu za stazu ${activeTrail.name}`}
                >
                  <MapPin className="h-4 w-4 text-[#B8282D]" aria-hidden="true" />
                  <span>Preuzmi GPX rutu</span>
                </a>
              ) : (
                <div
                  role="note"
                  className="w-full sm:max-w-56 shrink-0 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[11px] leading-snug text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Tačan GPX nije dostupan jer nemamo provjerene GPS tragove za ovu stazu.</span>
                </div>
              )}
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-5 sm:py-6 border-b border-[#DEE8E1] dark:border-[#1F3327]">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#42584C] dark:text-[#9EB5A7] uppercase tracking-wider">Dužina</span>
                <div className="text-lg sm:text-xl font-black text-[#111D16] dark:text-white font-mono tabular-nums">{activeTrail.distanceKm} km</div>
                <span className="text-[10px] sm:text-[11px] text-[#526D5F] dark:text-[#7A9686]">
                  {activeTrail.isLoop ? 'kružna staza' : activeTrail.gpxFile ? 'u jednom smjeru' : 'u oba smjera'}
                </span>
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#42584C] dark:text-[#9EB5A7] uppercase tracking-wider">Uspon</span>
                <div className="text-lg sm:text-xl font-black text-[#143522] dark:text-[#42A169] font-mono tabular-nums">+{activeTrail.elevationGainM} m</div>
                <span className="text-[10px] sm:text-[11px] text-[#526D5F] dark:text-[#7A9686]">Prosj. nagib {averageGrade}%</span>
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#42584C] dark:text-[#9EB5A7] uppercase tracking-wider">Najviša tačka</span>
                <div className="text-lg sm:text-xl font-black text-[#B8282D] dark:text-[#D9383E] font-mono tabular-nums">{activeTrail.peakElevationM} m</div>
                <span className="text-[10px] sm:text-[11px] text-[#526D5F] dark:text-[#7A9686]">Start: {activeTrail.startElevationM}m</span>
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#42584C] dark:text-[#9EB5A7] uppercase tracking-wider">Vrijeme hoda</span>
                <div className="text-lg sm:text-xl font-black text-[#111D16] dark:text-white font-mono tabular-nums">{formatHikingTime(estimatedHours)}</div>
                <span className="text-[10px] sm:text-[11px] text-[#526D5F] dark:text-[#7A9686]">Naismith algoritam</span>
              </div>
            </div>

            {/* Elevation Profile Visual (Dynamic SVG Curve) */}
            <div className="py-6 border-b border-[#DEE8E1] dark:border-[#1F3327]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#143522] dark:text-[#9EB5A7] uppercase tracking-wider flex items-center gap-1.5">
                  <Mountain className="w-4 h-4 text-[#B8282D]" />
                  {activeTrail.gpxFile ? 'Profil na osnovu GPX traga' : 'Visinski profil staze (orijentacione kote)'}
                </span>
                <span className="text-xs font-mono text-[#526D5F] dark:text-[#7A9686]">
                  {activeTrail.startElevationM}m → {activeTrail.peakElevationM}m (raspon: {activeTrail.peakElevationM - activeTrail.startElevationM}m)
                </span>
              </div>

              {/* Dynamic Auto-Scaling SVG Chart */}
              {(() => {
                const elevations = activeTrail.elevationProfile.map((pt) => pt.elevationM);
                const minEle = Math.min(...elevations);
                const maxEle = Math.max(...elevations);
                const eleSpan = maxEle - minEle;
                const step = eleSpan > 350 ? 100 : 50;
                const chartMin = Math.max(0, Math.floor((minEle - 25) / step) * step);
                const chartMax = Math.ceil((maxEle + 25) / step) * step;
                const chartSpan = chartMax - chartMin || 100;
                const chartMid = Math.round((chartMin + chartMax) / 2);

                const getYCoord = (ele: number) => {
                  return 110 - ((ele - chartMin) / chartSpan) * 80;
                };

                const getXCoord = (index: number) => {
                  const total = activeTrail.elevationProfile.length;
                  if (total <= 1) return 430;
                  return 90 + (index / (total - 1)) * 680;
                };

                const ptsString = activeTrail.elevationProfile
                  .map((pt, i) => `${getXCoord(i)},${getYCoord(pt.elevationM)}`)
                  .join(' ');

                const lastX = getXCoord(activeTrail.elevationProfile.length - 1);
                const polygonPoints = `90,125 ${ptsString} ${lastX},125`;

                return (
                  <div className="space-y-4">
                    {/* Mobile swipe helper */}
                    <div className="flex sm:hidden items-center justify-between text-[11px] text-[#526D5F] dark:text-[#7A9686] px-1">
                      <span>Interaktivni profil visina</span>
                      <span className="font-semibold text-[#B8282D] dark:text-[#D9383E]">← prevucite horizontalno →</span>
                    </div>

                    <div className="w-full bg-[#F7FAF8] dark:bg-[#0D1612] p-3 sm:p-5 rounded-xl border border-[#DEE8E1] dark:border-[#1F3327] overflow-x-auto">
                      <svg viewBox="0 0 860 215" className="w-full min-w-[720px] h-52 overflow-visible" aria-label="Visinski profil staze">
                        {/* Grid Lines */}
                        <line x1="60" y1="30" x2="800" y2="30" stroke="#DEE8E1" strokeDasharray="3 3" className="dark:stroke-[#22352A]" />
                        <line x1="60" y1="70" x2="800" y2="70" stroke="#DEE8E1" strokeDasharray="3 3" className="dark:stroke-[#22352A]" />
                        <line x1="60" y1="110" x2="800" y2="110" stroke="#DEE8E1" strokeDasharray="3 3" className="dark:stroke-[#22352A]" />

                        {/* Elevation axis labels */}
                        <text x="52" y="34" textAnchor="end" className="text-[10px] fill-[#6E8679] font-mono font-medium">{chartMax}m</text>
                        <text x="52" y="74" textAnchor="end" className="text-[10px] fill-[#6E8679] font-mono font-medium">{chartMid}m</text>
                        <text x="52" y="114" textAnchor="end" className="text-[10px] fill-[#6E8679] font-mono font-medium">{chartMin}m</text>

                        {/* Shaded Area and Polyline */}
                        <defs>
                          <linearGradient id="elevationGradDynamic" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#B8282D" stopOpacity="0.30" />
                            <stop offset="60%" stopColor="#143522" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#143522" stopOpacity="0.02" />
                          </linearGradient>
                        </defs>

                        {/* Path computation */}
                        <polygon
                          points={polygonPoints}
                          fill="url(#elevationGradDynamic)"
                        />

                        <polyline
                          points={ptsString}
                          fill="none"
                          stroke="#B8282D"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Waypoint markers & strictly separated 2-row labels */}
                        {activeTrail.elevationProfile.map((pt, i) => {
                          const x = getXCoord(i);
                          const y = getYCoord(pt.elevationM);
                          const isPeak = pt.elevationM === maxEle;
                          const isEven = i % 2 === 0;
                          const labelWidth = Math.min(200, Math.max(72, pt.label.length * 5.5 + 24));
                          // Strictly separated alternating tiers: Tier 1 at 150px, Tier 2 at 186px
                          const labelY = isEven ? 150 : 186;

                          return (
                            <g key={i}>
                              {/* Guideline connecting node to bottom axis */}
                              <line
                                x1={x}
                                y1={y + 7}
                                x2={x}
                                y2={labelY - 14}
                                stroke="#D3E0D8"
                                strokeDasharray="2 3"
                                className="dark:stroke-[#263D31]"
                              />

                              {/* Elevation Badge above node */}
                              <rect
                                x={x - 24}
                                y={y - 30.4}
                                width="48"
                                height="18"
                                rx="4"
                                className={isPeak ? 'fill-[#B8282D]' : 'fill-[#143522] dark:fill-[#1C3225]'}
                              />
                              <text
                                x={x}
                                y={y - 17.4}
                                textAnchor="middle"
                                className="text-[10px] fill-white font-mono font-bold"
                              >
                                {pt.elevationM}m
                              </text>

                              {/* Waypoint Node Circle */}
                              <circle
                                cx={x}
                                cy={y}
                                r={isPeak ? 6.5 : 5.5}
                                fill={isPeak ? '#B8282D' : '#FFFFFF'}
                                stroke={isPeak ? '#FFFFFF' : '#B8282D'}
                                strokeWidth="2.5"
                              />

                              <rect
                                x={x - labelWidth / 2}
                                y={labelY - 14}
                                width={labelWidth}
                                height="24"
                                rx="12"
                                className="fill-white/95 dark:fill-[#14231A]/95 stroke-[#D0DFD6] dark:stroke-[#294233]"
                                strokeWidth="1"
                              />
                              <text
                                x={x}
                                y={labelY - 1.5}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize="9.5"
                                letterSpacing="0.35"
                                className="fill-[#143522] dark:fill-[#E0ECE5] font-bold"
                              >
                                {pt.label}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    {/* Prolazne kote i kilometraža rute sa prostranim karticama */}
                    <div className="pt-3">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold text-[#143522] dark:text-[#9EB5A7] uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B8282D]" />
                          Pregled svih visinskih kota staze
                        </span>
                        <span className="text-[11px] text-[#526D5F] dark:text-[#7A9686] font-mono">
                          {activeTrail.elevationProfile.length} kontrolne tačke
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
                        {activeTrail.elevationProfile.map((pt, i) => {
                          const isFirst = i === 0;
                          const isLast = i === activeTrail.elevationProfile.length - 1;
                          const isPeak = pt.elevationM === maxEle;
                          return (
                            <div
                              key={i}
                              className={`p-3 rounded-xl border transition-all ${
                                isPeak
                                  ? 'bg-[#B8282D]/5 dark:bg-[#B8282D]/15 border-[#B8282D]/40 shadow-sm'
                                  : 'bg-[#EFF4F0] dark:bg-[#14231B] border-[#DEE8E1] dark:border-[#22352A]'
                              } flex flex-col justify-between`}
                            >
                              <div className="flex items-center justify-between text-[10px] text-[#526D5F] dark:text-[#7A9686] mb-1">
                                <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                                  isPeak
                                    ? 'bg-[#B8282D] text-white'
                                    : isFirst
                                    ? 'bg-[#143522] text-white dark:bg-[#254F37]'
                                    : 'bg-white dark:bg-[#1A2E24] text-[#143522] dark:text-[#9EB5A7]'
                                }`}>
                                  {isFirst ? 'Start' : isLast ? 'Cilj' : isPeak ? 'Vrh' : `Kota ${i + 1}`}
                                </span>
                                <span className="font-mono font-medium">{pt.distanceKm} km</span>
                              </div>
                              <div className="text-xs font-bold text-[#111D16] dark:text-white mt-1 leading-snug">
                                {pt.label}
                              </div>
                              <div className="text-sm font-mono font-black text-[#143522] dark:text-[#42A169] mt-1.5">
                                {pt.elevationM} <span className="text-[10px] font-normal text-[#526D5F] dark:text-[#88A393]">m n.v.</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Description and Key Highlights */}
            <div className="py-6 border-b border-[#DEE8E1] dark:border-[#1F3327] space-y-4">
              <p className="text-sm text-[#334A3E] dark:text-[#A8C2B3] leading-relaxed">
                {activeTrail.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-[#334A3E] dark:text-[#9EB5A7]">
                  <Droplets className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#111D16] dark:text-white">Izvori vode:</span>{' '}
                    {activeTrail.waterSources.join(', ')}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-[#334A3E] dark:text-[#9EB5A7]">
                  <Home className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#111D16] dark:text-white">Planinarski domovi:</span>{' '}
                    {activeTrail.mountainHuts.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Calculator: Hydration, Calories & Load Math */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#143522] dark:text-[#9EB5A7] uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#B8282D]" />
                  Kalkulator opterećenja i hidratacije
                </span>
                <span className="text-xs text-[#6E8679]">Prilagodi svojim parametrima</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F2F7F4] dark:bg-[#0E1712] p-4 rounded-xl border border-[#DEE8E1] dark:border-[#1F3327] mb-4">
                <div>
                  <label htmlFor="hiker-weight" className="text-[11px] font-semibold text-[#42584C] dark:text-[#9EB5A7] block mb-1">
                    Težina planinara: <span className="font-mono font-bold text-[#111D16] dark:text-white">{hikerWeightKg} kg</span>
                  </label>
                  <input
                    id="hiker-weight"
                    type="range"
                    min="50"
                    max="115"
                    value={hikerWeightKg}
                    onChange={(e) => setHikerWeightKg(Number(e.target.value))}
                    style={getRangeStyle(hikerWeightKg, 50, 115)}
                    className="trail-range w-full cursor-pointer"
                  />
                </div>

                <div>
                  <label htmlFor="pack-weight" className="text-[11px] font-semibold text-[#42584C] dark:text-[#9EB5A7] block mb-1">
                    Težina ruksaka: <span className="font-mono font-bold text-[#111D16] dark:text-white">{packWeightKg} kg</span>
                  </label>
                  <input
                    id="pack-weight"
                    type="range"
                    min="2"
                    max="20"
                    value={packWeightKg}
                    onChange={(e) => setPackWeightKg(Number(e.target.value))}
                    style={getRangeStyle(packWeightKg, 2, 20)}
                    className="trail-range w-full cursor-pointer"
                  />
                </div>

                <div>
                  <label htmlFor="ambient-temp" className="text-[11px] font-semibold text-[#42584C] dark:text-[#9EB5A7] block mb-1">
                    Temperatura: <span className="font-mono font-bold text-[#111D16] dark:text-white">{ambientTempC} °C</span>
                  </label>
                  <input
                    id="ambient-temp"
                    type="range"
                    min="-5"
                    max="35"
                    value={ambientTempC}
                    onChange={(e) => setAmbientTempC(Number(e.target.value))}
                    style={getRangeStyle(ambientTempC, -5, 35)}
                    className="trail-range w-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated Results */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-white dark:bg-[#141F19] rounded-lg border border-[#DEE8E1] dark:border-[#24352B]">
                  <span className="text-[11px] text-[#526D5F] dark:text-[#88A393] block">Preporučena voda</span>
                  <span className="text-base font-black text-sky-600 dark:text-sky-400 font-mono tabular-nums flex items-center justify-center gap-1">
                    <Droplets className="w-3.5 h-3.5" />
                    {recommendedWater} L
                  </span>
                </div>

                <div className="p-3 bg-white dark:bg-[#141F19] rounded-lg border border-[#DEE8E1] dark:border-[#24352B]">
                  <span className="text-[11px] text-[#526D5F] dark:text-[#88A393] block">Potrošnja kalorija</span>
                  <span className="text-base font-black text-amber-600 dark:text-amber-400 font-mono tabular-nums flex items-center justify-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    ~{estimatedCalories} kcal
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 bg-white dark:bg-[#141F19] rounded-lg border border-[#DEE8E1] dark:border-[#24352B]">
                  <span className="text-[11px] text-[#526D5F] dark:text-[#88A393] block">Tempo hoda</span>
                  <span className="text-base font-black text-[#143522] dark:text-[#42A169] font-mono tabular-nums flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {Math.round((activeTrail.distanceKm / estimatedHours) * 10) / 10} km/h
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
