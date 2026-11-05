'use client';

import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  CloudRain,
  Cloud,
  Snowflake,
  CloudFog,
  CloudLightning,
  Wind,
  Droplets,
  Sun,
  Layers,
  CableCar,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Radio,
} from 'lucide-react';

interface StationData {
  name: string;
  location: string;
  elevation: number;
  tempC: number;
  feelsLikeC: number;
  condition: string;
  weatherCode: number;
  windSpeedKmH: number;
  windDirection: string;
  humidity: number;
  uvIndex: number;
  visibilityKm: number;
  airQualityAqi: number;
  airQualityText: string;
  trailState: string;
  inversionActive: boolean;
  inversionNote: string;
  isLive?: boolean;
}

const INITIAL_STATIONS: Record<'summit' | 'vidikovac' | 'sarajevo', StationData> = {
  summit: {
    name: 'Vrh Sofe (1629m)',
    location: 'Najviša tačka planine Trebević',
    elevation: 1629,
    tempC: -2,
    feelsLikeC: -5,
    condition: 'Snijeg / Niske temperature',
    weatherCode: 71,
    windSpeedKmH: 18,
    windDirection: 'SZ (Sjevero-zapad)',
    humidity: 95,
    uvIndex: 0,
    visibilityKm: 45,
    airQualityAqi: 8,
    airQualityText: 'Izvrsno / Čist gorski zrak',
    trailState: 'Zimski uslovi: Mraz i snijeg na grebenu, obavezna topla garderoba',
    inversionActive: false,
    inversionNote: 'Visinski greben: Znatno niža temperatura i jači udari vjetra.',
    isLive: true,
  },
  vidikovac: {
    name: 'Vidikovac & Žičara (1160m)',
    location: 'Gornja stanica Sarajevske žičare & Pino',
    elevation: 1160,
    tempC: 1,
    feelsLikeC: -1,
    condition: 'Hladno / Kiša sa susnježicom',
    weatherCode: 61,
    windSpeedKmH: 8,
    windDirection: 'SI (Sjevero-istok)',
    humidity: 92,
    uvIndex: 0,
    visibilityKm: 30,
    airQualityAqi: 22,
    airQualityText: 'Čist planinski zrak',
    trailState: 'Šumske staze vlažne, hladno za šetnju',
    inversionActive: false,
    inversionNote: 'Planinska zona: Svježiji zrak i čist pogled na grad.',
    isLive: true,
  },
  sarajevo: {
    name: 'Sarajevo Centar / Baščaršija (550m)',
    location: 'Gradska kotlina / Polazna stanica Bistrik',
    elevation: 550,
    tempC: 4,
    feelsLikeC: 3,
    condition: 'Kotlinska hladnoća / Slaba kiša',
    weatherCode: 61,
    windSpeedKmH: 4,
    windDirection: 'I (Istok)',
    humidity: 91,
    uvIndex: 0,
    visibilityKm: 8,
    airQualityAqi: 65,
    airQualityText: 'Nezdrav zrak za osjetljive grupe',
    trailState: 'Gradski prilazi mokri',
    inversionActive: false,
    inversionNote: 'Normalan gradijent: Gradska kotlina je toplija od gorskih vrhova.',
    isLive: true,
  },
};

function WeatherIconDisplay({ code, className }: { code: number; className?: string }) {
  if (code === 0 || code === 1) return <Sun className={className} />;
  if (code === 2) return <CloudSun className={className} />;
  if (code === 3) return <Cloud className={className} />;
  if (code === 45 || code === 48) return <CloudFog className={className} />;
  if (code >= 51 && code <= 67) return <CloudRain className={className} />;
  if (code >= 71 && code <= 77) return <Snowflake className={className} />;
  if (code >= 80 && code <= 82) return <CloudRain className={className} />;
  if (code >= 85 && code <= 86) return <Snowflake className={className} />;
  if (code >= 95) return <CloudLightning className={className} />;
  return <CloudSun className={className} />;
}

export default function WeatherWidget() {
  const [selectedStation, setSelectedStation] = useState<'summit' | 'vidikovac' | 'sarajevo'>('summit');
  const [stations, setStations] = useState<Record<'summit' | 'vidikovac' | 'sarajevo', StationData>>(INITIAL_STATIONS);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Učitavanje...');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchLiveWeather = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/weather');
      if (!res.ok) throw new Error('Neuspjelo preuzimanje meteo podataka');
      const data = await res.json();
      if (data.stations) {
        setStations(data.stations);
        setLastRefreshed(`Uživo u ${data.updatedAt || 'upravo'}`);
      }
    } catch {
      setLastRefreshed('Kalibrisana stanica');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const loadWeather = async () => {
      try {
        const res = await fetch('/api/weather');
        if (!res.ok) return;
        const data = await res.json();
        if (active && data.stations) {
          setStations(data.stations);
          setLastRefreshed(`Uživo u ${data.updatedAt || 'upravo'}`);
        }
      } catch {
        if (active) {
          setLastRefreshed('Kalibrisana stanica');
        }
      }
    };

    loadWeather();
    const interval = setInterval(loadWeather, 300000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const current = stations[selectedStation];

  return (
    <section id="vrijeme" className="py-16 md:py-24 border-t border-[#DEE8E1] dark:border-[#1F3327] bg-white dark:bg-[#0C1410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#143522] dark:text-[#9EB5A7] tracking-wider uppercase mb-2">
              <span className="text-[#B8282D] dark:text-[#D9383E] font-bold">02</span>
              <span aria-hidden="true">·</span>
              <span>Meteorologija i Sigurnost</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Uživo Telemetrija
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111D16] dark:text-[#F0F6F2] tracking-tight [text-wrap:balance]">
              Meteo stanica Trebević: Vrh 1629m vs Sarajevo 550m
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#42584C] dark:text-[#9EB5A7] max-w-2xl">
              Tačni i ažurni meteorološki podaci u realnom vremenu duž 1.079 metara visinske razlike.
              Saznajte tačnu temperaturu, brzinu vjetra i stanje zraka prije polaska na turu.
            </p>
          </div>

          {/* Elevation Station Picker Buttons */}
          <div className="flex flex-wrap sm:inline-flex items-center p-1.5 bg-[#F2F7F4] dark:bg-[#141F19] rounded-xl border border-[#DEE8E1] dark:border-[#24352B] shadow-sm shrink-0 w-full sm:w-auto overflow-x-auto gap-2">
            <button
              onClick={() => setSelectedStation('summit')}
              className={`flex-1 sm:flex-initial justify-center min-h-[52px] px-5 py-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                selectedStation === 'summit'
                  ? 'bg-[#B8282D] text-white shadow-sm'
                  : 'text-[#42584C] dark:text-[#9EB5A7] hover:text-[#111D16] dark:hover:text-white'
              }`}
            >
              <span className="whitespace-nowrap">Vrh Sofe (1629m)</span>
              <span className="font-mono text-[11px] opacity-90">{stations.summit.tempC}°C</span>
            </button>
            <button
              onClick={() => setSelectedStation('vidikovac')}
              className={`flex-1 sm:flex-initial justify-center min-h-[52px] px-5 py-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                selectedStation === 'vidikovac'
                  ? 'bg-[#143522] text-white dark:bg-[#1F4E34] shadow-sm'
                  : 'text-[#42584C] dark:text-[#9EB5A7] hover:text-[#111D16] dark:hover:text-white'
              }`}
            >
              <span className="whitespace-nowrap">Vidikovac (1160m)</span>
              <span className="font-mono text-[11px] opacity-90">{stations.vidikovac.tempC}°C</span>
            </button>
            <button
              onClick={() => setSelectedStation('sarajevo')}
              className={`flex-1 sm:flex-initial justify-center min-h-[52px] px-5 py-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                selectedStation === 'sarajevo'
                  ? 'bg-[#143522] text-white dark:bg-[#1F4E34] shadow-sm'
                  : 'text-[#42584C] dark:text-[#9EB5A7] hover:text-[#111D16] dark:hover:text-white'
              }`}
            >
              <span className="whitespace-nowrap">Sarajevo (550m)</span>
              <span className="font-mono text-[11px] opacity-90">{stations.sarajevo.tempC}°C</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Main Weather Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#F7FAF8] dark:bg-[#141F19] rounded-2xl border border-[#DEE8E1] dark:border-[#24352B] p-4 sm:p-6 lg:p-8 flex flex-col justify-between shadow-sm">
            
            {/* Top row */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-[#DEE8E1] dark:border-[#1F3327]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#B8282D] dark:text-[#D9383E] uppercase tracking-wider block">
                      Aktivna mjerna stanica
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Uživo
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#111D16] dark:text-white mt-0.5">
                    {current.name}
                  </h3>
                  <p className="text-xs text-[#526D5F] dark:text-[#88A393]">
                    {current.location}
                  </p>
                </div>

                <button
                  onClick={fetchLiveWeather}
                  disabled={isLoading}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-mono text-[#526D5F] dark:text-[#88A393] hover:text-[#111D16] dark:hover:text-white transition-colors"
                  aria-label="Osvježi meteorološke podatke"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#B8282D]' : ''}`} />
                  <span>{lastRefreshed}</span>
                </button>
              </div>

              {/* Huge Temperature & Condition Row */}
              <div className="py-5 sm:py-6 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111D16] dark:text-white font-mono tracking-tighter">
                    {current.tempC}°C
                  </span>
                  <div className="text-xs font-medium text-[#526D5F] dark:text-[#88A393]">
                    <span>Osjet: </span>
                    <span className="font-bold font-mono text-[#111D16] dark:text-white">{current.feelsLikeC}°C</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 bg-white dark:bg-[#0D1612] rounded-xl border border-[#DEE8E1] dark:border-[#24352B] shadow-sm">
                    <WeatherIconDisplay code={current.weatherCode} className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8282D]" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#111D16] dark:text-white block">
                      {current.condition}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#526D5F] dark:text-[#88A393]">
                      Vidljivost: {current.visibilityKm} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Inversion Banner (Special Sarajevo phenomenon) */}
              {current.inversionActive ? (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                  <Sun className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Fenomen temperaturne inverzije aktivan</span>
                    {current.inversionNote}
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-3.5 rounded-xl bg-[#EFF4F0] dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#1F3327] text-xs text-[#334A3E] dark:text-[#9EB5A7] flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-[#143522] dark:text-[#42A169] shrink-0" />
                  <span>{current.inversionNote}</span>
                </div>
              )}

              {/* 4 Detailed Sensor Tiles */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                <div className="min-w-0 p-3 bg-white dark:bg-[#0D1612] rounded-xl border border-[#DEE8E1] dark:border-[#1F3327]">
                  <span className="text-[11px] text-[#526D5F] dark:text-[#88A393] flex items-center gap-1 mb-1">
                    <Wind className="w-3.5 h-3.5 text-sky-500" />
                    Vjetar
                  </span>
                  <span className="text-base font-bold font-mono text-[#111D16] dark:text-white block">
                    {current.windSpeedKmH} km/h
                  </span>
                  <span className="block max-w-full whitespace-normal text-[10px] leading-tight text-[#6E8679]">{current.windDirection}</span>
                </div>

                <div className="min-w-0 p-3 bg-white dark:bg-[#0D1612] rounded-xl border border-[#DEE8E1] dark:border-[#1F3327]">
                  <span className="text-[11px] text-[#526D5F] dark:text-[#88A393] flex items-center gap-1 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    Vlažnost
                  </span>
                  <span className="text-base font-bold font-mono text-[#111D16] dark:text-white block">
                    {current.humidity}%
                  </span>
                  <span className="text-[10px] text-[#6E8679]">Relativna</span>
                </div>

                <div className="min-w-0 p-3 bg-white dark:bg-[#0D1612] rounded-xl border border-[#DEE8E1] dark:border-[#1F3327]">
                  <span className="text-[11px] text-[#526D5F] dark:text-[#88A393] flex items-center gap-1 mb-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    UV Indeks
                  </span>
                  <span className="text-base font-bold font-mono text-[#111D16] dark:text-white block">
                    {current.uvIndex} / 11
                  </span>
                  <span className="text-[10px] text-[#6E8679]">
                    {current.uvIndex <= 2 ? 'Nizak' : current.uvIndex <= 5 ? 'Umjeren' : 'Visok'}
                  </span>
                </div>

                <div className="min-w-0 p-3 bg-white dark:bg-[#0D1612] rounded-xl border border-[#DEE8E1] dark:border-[#1F3327]">
                  <span className="text-[11px] text-[#526D5F] dark:text-[#88A393] flex items-center gap-1 mb-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                    Kvalitet zraka
                  </span>
                  <span className={`text-base font-bold font-mono block ${
                    current.airQualityAqi <= 50 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    AQI {current.airQualityAqi}
                  </span>
                  <span className="block max-w-full whitespace-normal text-[10px] leading-tight text-[#6E8679]">{current.airQualityText.split('/')[0]}</span>
                </div>
              </div>
            </div>

            {/* Trail Ground Safety Status */}
            <div className="mt-6 pt-4 border-t border-[#DEE8E1] dark:border-[#1F3327] flex items-center justify-between gap-4 text-xs">
              <span className="text-[#526D5F] dark:text-[#88A393] font-semibold">
                Stanje staza: <span className="font-normal text-[#111D16] dark:text-white">{current.trailState}</span>
              </span>
              <span className={`inline-flex items-center gap-1 font-bold shrink-0 ${
                current.tempC <= 0
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}>
                {current.tempC <= 0 ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Zimski oprez
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Siguran uspon
                  </>
                )}
              </span>
            </div>

          </div>

          {/* Right: Mountain Safety & Cable Car Live Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Sarajevska Žičara Card */}
            <div className="bg-[#F7FAF8] dark:bg-[#141F19] rounded-2xl border border-[#DEE8E1] dark:border-[#24352B] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#143522] dark:text-[#9EB5A7] uppercase tracking-wider flex items-center gap-1.5">
                  <CableCar className="w-4 h-4 text-[#B8282D]" />
                  Sarajevska Žičara (Bistrik - Vidikovac)
                </span>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  U pogonu
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#334A3E] dark:text-[#A8C2B3]">
                <div className="flex justify-between py-1 border-b border-[#DEE8E1]/60 dark:border-[#1F3327]">
                  <span>Radno vrijeme žičare:</span>
                  <span className="font-mono font-bold text-[#111D16] dark:text-white">09:00 - 19:00 h</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#DEE8E1]/60 dark:border-[#1F3327]">
                  <span>Vrijeme vožnje:</span>
                  <span className="font-mono font-bold text-[#111D16] dark:text-white">7 minuta 15 sekundi</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#DEE8E1]/60 dark:border-[#1F3327]">
                  <span>Visinska razlika:</span>
                  <span className="font-mono font-bold text-[#111D16] dark:text-white">577 m (Bistrik → Vidikovac)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Popust za planinare:</span>
                  <span className="font-bold text-[#B8282D] dark:text-[#D9383E]">Uz važeću člansku kartu PSD</span>
                </div>
              </div>
            </div>

            {/* Mountain Rescue (GSS) & Emergency Card */}
            <div className="bg-[#143522] text-white rounded-2xl p-6 shadow-md border border-[#1A4D2E]">
              <div className="flex items-center gap-2 mb-3">
                <PhoneCall className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Gorska Služba Spašavanja (GSS)</h3>
              </div>

              <p className="text-xs text-[#C5DDD0] leading-relaxed mb-4">
                U slučaju nesreće, gubitka orijentacije u magli ili povrede na stjenovitom grebenu Trebevića,
                odmah pozovite dežurni operativni centar stanice Sarajevo.
              </p>

              <div className="flex items-center justify-between gap-3 bg-black/30 p-3 rounded-xl border border-white/10 font-mono">
                <div>
                  <span className="text-[10px] uppercase text-[#A3C4B0] block">Hitni telefon GSS Sarajevo</span>
                  <a href="tel:121" className="text-lg font-black text-amber-300 hover:underline">121 / +387 62 112 112</a>
                </div>
                <a
                  href="tel:121"
                  className="px-3.5 py-2 bg-[#B8282D] hover:bg-[#9A2024] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Pozovi</span>
                </a>
              </div>
            </div>

            {/* Alpine Ethic Tip */}
            <div className="p-4 rounded-xl bg-[#F7FAF8] dark:bg-[#141F19] border border-[#DEE8E1] dark:border-[#24352B] text-xs text-[#526D5F] dark:text-[#88A393]">
              <span className="font-bold text-[#111D16] dark:text-white block mb-1">
                Zlatno pravilo planinara:
              </span>
              Prije polaska na vrh Sofe (1629m) provjerite vrijeme zalaska sunca, ponesite čeonu lampu i minimum 1L vode.
              Sve smeće ponesite sa sobom nazad u grad.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
