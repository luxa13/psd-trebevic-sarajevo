'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Compass, ShieldAlert, Mountain } from 'lucide-react';

interface NavbarProps {
  onOpenTourModal: () => void;
  onOpenAiGuide: () => void;
}

const emptySubscribe = () => () => {};

export default function Navbar({ onOpenTourModal, onOpenAiGuide }: NavbarProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#0C1410]/95 backdrop-blur-md shadow-sm border-b border-[#DEE8E1] dark:border-[#1F3327]'
          : 'bg-white/80 dark:bg-[#0C1410]/80 backdrop-blur-sm border-b border-[#DEE8E1]/60 dark:border-[#1F3327]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 h-16 sm:h-20">
          {/* Zone 1: Brand Wordmark & Emblem */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
            aria-label="PSD Trebević Sarajevo naslovna stranica"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-sm dark:ring-1 dark:ring-white/70 dark:group-hover:ring-white/90 transition-all bg-white shrink-0">
              <Image
                src="/images/psd_trebevic_icon.png"
                alt="PSD Trebević Logo"
                width={96}
                height={96}
                priority
                className="object-contain w-full h-full"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
            <div className="flex w-max flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-[#143522] dark:text-[#EAF3EC] transition-colors leading-none">
                PSD TREBEVIĆ
              </span>
              <span className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#B8282D] dark:text-[#D9383E] uppercase">
                Sarajevo · 2006
              </span>
            </div>
          </Link>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] xl:text-[14px] font-medium text-[#42584C] dark:text-[#9EB5A7]"
            aria-label="Glavna navigacija"
          >
            <a
              href="#staze"
              className="hover:text-[#143522] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Staze i Usponi
            </a>
            <a
              href="#vrijeme"
              className="hover:text-[#143522] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Meteo Vrh <span aria-hidden="true" className="mx-1 opacity-50">|</span> 1629<span style={{ textTransform: 'none' }}>m</span>
            </a>
            <a
              href="#ture"
              className="hover:text-[#143522] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Klupske Ture
            </a>
            <a
              href="#galerija"
              className="hover:text-[#143522] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Galerija
            </a>
            <a
              href="#historija"
              className="hover:text-[#143522] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Olimpijska Historija
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Utility Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* AI Mountain Guide Quick Launch */}
            <button
              onClick={onOpenAiGuide}
              className="group hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg text-[#143522] dark:text-[#EAF3EC] bg-[#EFF4F0] dark:bg-[#18261E] hover:bg-[#111111] hover:text-white dark:hover:bg-[#2B4935] dark:hover:text-[#EAF3EC] transition-colors border border-[#DEE8E1] dark:border-[#243A2C] hover:border-[#111111] dark:hover:border-[#3B5B45]"
              aria-label="Otvori AI planinarskog vodiča"
            >
              <Compass className="w-3.5 h-3.5 text-[#B8282D] group-hover:text-white transition-colors" />
              <span className="whitespace-nowrap">AI Vodič</span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              suppressHydrationWarning
              className="p-2 rounded-lg text-[#42584C] dark:text-[#9EB5A7] hover:bg-[#EFF4F0] dark:hover:bg-[#18261E] transition-colors border border-transparent hover:border-[#DEE8E1] dark:hover:border-[#243A2C]"
              aria-label={mounted ? (isDark ? 'Prebaci na svijetli način' : 'Prebaci na tamni način') : 'Promijeni temu'}
            >
              {!mounted || isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#143522]" />
              )}
            </button>

            {/* Primary Action Button - visible on sm+ screens, available in mobile drawer on small screens */}
            <button
              onClick={onOpenTourModal}
              className="hidden sm:inline-flex px-3.5 py-2 text-xs font-bold text-white bg-[#B8282D] hover:bg-[#9A2024] dark:bg-[#B8282D] dark:hover:bg-[#9A2024] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Prijavi se na turu
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#143522] dark:text-[#EAF3EC] hover:bg-[#EFF4F0] dark:hover:bg-[#18261E] shrink-0"
              aria-label={mobileMenuOpen ? 'Zatvori meni' : 'Otvori navigacijski meni'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0C1410] border-b border-[#DEE8E1] dark:border-[#1F3327] px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3.5 text-base font-medium text-[#42584C] dark:text-[#9EB5A7]">
            <a
              href="#staze"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#143522] dark:hover:text-white transition-colors"
            >
              Staze i Usponi
            </a>
            <a
              href="#vrijeme"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#143522] dark:hover:text-white transition-colors"
            >
              Meteo Vrh <span aria-hidden="true" className="mx-1 opacity-50">|</span> 1629<span style={{ textTransform: 'none' }}>m</span>
            </a>
            <a
              href="#ture"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#143522] dark:hover:text-white transition-colors"
            >
              Klupske Ture
            </a>
            <a
              href="#galerija"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#143522] dark:hover:text-white transition-colors"
            >
              Fotografska Galerija
            </a>
            <a
              href="#historija"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#143522] dark:hover:text-white transition-colors"
            >
              Olimpijska Historija
            </a>
          </nav>

          <div className="pt-4 border-t border-[#DEE8E1] dark:border-[#1F3327] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiGuide();
              }}
              className="group w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-[#143522] dark:text-white bg-[#EFF4F0] dark:bg-[#18261E] hover:bg-[#111111] hover:text-white dark:hover:bg-[#2B4935] dark:hover:text-white transition-colors border border-[#DEE8E1] dark:border-[#243A2C] hover:border-[#111111] dark:hover:border-[#3B5B45]"
            >
              <Compass className="w-4 h-4 text-[#B8282D] group-hover:text-white transition-colors" />
              AI Planinarski Vodič & Dispečer
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTourModal();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-bold text-white bg-[#B8282D] hover:bg-[#9A2024]"
            >
              Prijavi se na turu
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
