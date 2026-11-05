'use client';

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Mountain, MapPin, Mail, Phone, ShieldCheck, Heart, X, Footprints, Trash2, VolumeX, Leaf } from 'lucide-react';

export default function Footer() {
  const [isEtiquetteModalOpen, setIsEtiquetteModalOpen] = useState(false);

  return (
    <>
    <footer className="border-t border-[#DEE8E1] dark:border-[#1F3327] bg-white dark:bg-[#0C1410] text-[#42584C] dark:text-[#9EB5A7] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 sm:mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#DEE8E1] bg-white shrink-0">
                <Image
                  src="/images/psd_trebevic_icon.png"
                  alt="PSD Trebević Emblem"
                  width={88}
                  height={88}
                  className="object-contain w-full h-full"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>
              <div>
                <span className="text-base font-black text-[#143522] dark:text-white tracking-tight block">
                  PSD TREBEVIĆ
                  <span
                    aria-hidden="true"
                    className="mx-1.5 inline-block h-3 w-3 rounded-full border-[3px] border-[#B8282D] bg-white align-baseline dark:border-[#D9383E] dark:ring-[0.7px] dark:ring-white"
                  />
                  SARAJEVO
                </span>
                <span className="text-[11px] font-bold text-[#B8282D] dark:text-[#D9383E] tracking-wider uppercase">
                  Planinarsko-sportsko društvo · Osnovano 2006.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#526D5F] dark:text-[#88A393] leading-relaxed max-w-md">
              Posvećeni očuvanju prirode, markiranju planinarskih staza i edukaciji mladih generacija sarajevskih planinara.
              Trebević je zaštićeni pejzaž i prirodno utočište svih građana Sarajeva.
            </p>

            <div className="flex items-center gap-1 text-xs text-[#526D5F] dark:text-[#88A393]">
              <MapPin className="w-4 h-4 text-[#B8282D] shrink-0" />
              <span>Sarajevo, Bosna i Hercegovina · Sjedište: Zaštićeno područje Trebević</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#111D16] dark:text-white uppercase tracking-wider block">
              Navigacija
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#staze" className="hover:text-[#111D16] dark:hover:text-white transition-colors">
                  Planinarske staze
                </a>
              </li>
              <li>
                <a href="#vrijeme" className="hover:text-[#111D16] dark:hover:text-white transition-colors">
                  Meteo stanica i zrak
                </a>
              </li>
              <li>
                <a href="#ture" className="hover:text-[#111D16] dark:hover:text-white transition-colors">
                  Klupske ture i prijave
                </a>
              </li>
              <li>
                <a href="#galerija" className="hover:text-[#111D16] dark:hover:text-white transition-colors">
                  Fotografska galerija
                </a>
              </li>
              <li>
                <a href="#historija" className="hover:text-[#111D16] dark:hover:text-white transition-colors">
                  Olimpijska bob staza ZOI &apos;84
                </a>
              </li>
              <li>
                <a href="#galerija" className="text-[#143522] dark:text-[#42A169] font-medium hover:underline">
                  Klupske ekspedicije i fotografije
                </a>
              </li>
            </ul>
          </div>

          {/* Safety & Club Info */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#111D16] dark:text-white uppercase tracking-wider block">
              Gorska Sigurnost
            </span>
            <div className="p-3 rounded-xl bg-[#F7FAF8] dark:bg-[#141F19] border border-[#DEE8E1] dark:border-[#1F3327] space-y-1.5 font-mono">
              <span className="text-[10px] uppercase text-[#6E8679] block">GSS Stanica Sarajevo:</span>
              <a href="tel:121" className="text-sm font-bold text-[#B8282D] dark:text-[#D9383E] block hover:underline">
                121 / 062 112 112
              </a>
              <span className="text-[10px] text-[#526D5F] dark:text-[#88A393] block">
                Hitni pozivi na planini 24/7
              </span>
            </div>

            <div className="text-[11px] text-[#6E8679] space-y-1">
              <div>Članica Planinarskog saveza BiH</div>
              <div>Registarski broj: 03-05-1422/06</div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#DEE8E1] dark:border-[#1F3327] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E8679]">
          <p>© 2026 PSD „Trebević” Sarajevo. Sva prava pridržana.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsEtiquetteModalOpen(true)}
              className="hover:underline"
              style={{ textTransform: 'none', letterSpacing: 'normal' }}
            >
              Pravila ponašanja na planini
            </button>
            <span aria-hidden="true">·</span>
            <span className="text-[#526D5F] dark:text-[#88A393]">Zaštićeni pejzaž Trebević</span>
          </div>
        </div>

      </div>
    </footer>
    {isEtiquetteModalOpen && (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={() => setIsEtiquetteModalOpen(false)}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="mountain-etiquette-title"
          className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#DEE8E1] dark:border-[#2C4235] bg-white dark:bg-[#141F19] p-5 sm:p-7 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFF4F0] dark:bg-[#1E2D24] text-[#143522] dark:text-[#A8C2B3]">
                <Mountain className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id="mountain-etiquette-title" className="text-lg sm:text-xl font-bold text-[#143522] dark:text-[#F0F6F2]">
                  Pravila ponašanja na planini
                </h2>
                <p className="mt-1 text-xs text-[#526D5F] dark:text-[#88A393]">
                  Čuvajmo Trebević i brinimo jedni o drugima.
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Zatvori pravila ponašanja"
              onClick={() => setIsEtiquetteModalOpen(false)}
              className="rounded-lg p-2 text-[#526D5F] dark:text-[#A8C2B3] hover:bg-[#EFF4F0] dark:hover:bg-[#1E2D24]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="space-y-4 text-sm text-[#334A3E] dark:text-[#C7D8CD]">
            <li className="flex gap-3">
              <Footprints className="h-5 w-5 shrink-0 text-[#B8282D] dark:text-[#D9383E]" aria-hidden="true" />
              <span><strong>Drži se markiranih staza.</strong> Ne pravi prečice i poštuj oznake, upute vodiča i zatvorene dionice.</span>
            </li>
            <li className="flex gap-3">
              <Trash2 className="h-5 w-5 shrink-0 text-[#B8282D] dark:text-[#D9383E]" aria-hidden="true" />
              <span><strong>Ne ostavljaj otpad.</strong> Sve što poneseš sa sobom, uključujući opuške i maramice, vrati u dolinu.</span>
            </li>
            <li className="flex gap-3">
              <Leaf className="h-5 w-5 shrink-0 text-[#B8282D] dark:text-[#D9383E]" aria-hidden="true" />
              <span><strong>Čuvaj prirodu.</strong> Ne oštećuj biljke, ne uznemiravaj životinje i ne pali vatru izvan dozvoljenih mjesta.</span>
            </li>
            <li className="flex gap-3">
              <VolumeX className="h-5 w-5 shrink-0 text-[#B8282D] dark:text-[#D9383E]" aria-hidden="true" />
              <span><strong>Poštuj mir planine.</strong> Smanji buku i ostavi prostor drugim planinarima i životinjama.</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#B8282D] dark:text-[#D9383E]" aria-hidden="true" />
              <span><strong>Planiraj sigurno.</strong> Provjeri vremensku prognozu, ponesi odgovarajuću opremu i obavijesti nekoga o svojoj ruti. U hitnom slučaju pozovi GSS na <a href="tel:121" className="font-bold text-[#B8282D] dark:text-[#D9383E] underline">121</a>.</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setIsEtiquetteModalOpen(false)}
            className="mt-6 w-full rounded-lg bg-[#143522] px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-[#1F4E34] dark:bg-[#1F4E34] dark:hover:bg-[#357D56]"
          >
            Razumijem
          </button>
        </section>
      </div>
    )}
    </>
  );
}
