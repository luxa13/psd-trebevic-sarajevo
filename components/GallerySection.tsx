'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GALLERY_PHOTOS, GalleryPhoto } from '@/lib/trebevic-data';
import { Camera, MapPin, X, ChevronLeft, ChevronRight, Maximize2, Tag } from 'lucide-react';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = ['Sve', 'Pejzaži', 'Zima', 'Olimpijska baština', 'Ture & Druženja'];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (selectedCategory === 'Sve') return true;
    return photo.category === selectedCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  return (
    <section id="galerija" className="py-12 sm:py-16 md:py-24 border-t border-[#DEE8E1] dark:border-[#1F3327] bg-white dark:bg-[#0C1410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#143522] dark:text-[#9EB5A7] tracking-wider uppercase mb-2">
              <span className="text-[#B8282D] dark:text-[#D9383E] font-bold">04</span>
              <span aria-hidden="true">·</span>
              <span>Fotografski Arhiv</span>
              <span aria-hidden="true">·</span>
              <span>Trebević u Kadru</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111D16] dark:text-[#F0F6F2] tracking-tight [text-wrap:balance]">
              Fotografska galerija planinskih motiva
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-[#42584C] dark:text-[#9EB5A7] max-w-2xl leading-relaxed">
              Autorske fotografije članova PSD Trebević sa zimskih uspona, mističnih magli iznad Sarajeva,
              betonskih zavoja olimpijske bob staze i sunčanih odmorišta na terasi Doma Jure Franko.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap sm:inline-flex items-center p-1 bg-[#F2F7F4] dark:bg-[#141F19] rounded-xl border border-[#DEE8E1] dark:border-[#24352B] shadow-sm shrink-0 overflow-x-auto max-w-full gap-1 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap min-h-[38px] flex items-center justify-center ${
                  selectedCategory === cat
                    ? 'bg-[#143522] text-white dark:bg-[#1F4E34] shadow-sm'
                    : 'text-[#42584C] dark:text-[#9EB5A7] hover:text-[#111D16] dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActivePhoto(photo);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Pogledaj fotografiju: ${photo.title}`}
              className="group relative rounded-2xl overflow-hidden border border-[#DEE8E1] dark:border-[#1F3327] bg-[#143522] aspect-[16/10] cursor-pointer shadow-sm hover:shadow-lg transition-all"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Top tag & Expand Icon */}
              <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 right-3.5 sm:right-4 flex items-center justify-between text-white text-xs">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium text-[11px] sm:text-xs">
                  {photo.category}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 text-white">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="line-clamp-1">{photo.location}</span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold leading-snug drop-shadow-sm line-clamp-1">
                  {photo.title}
                </h3>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] text-[#A8C2B3] font-mono">
                  <span>{photo.photographer}</span>
                  <span>{photo.cameraInfo.split('·')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6"
        >
          {/* Close Button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Zatvori preglednik fotografije"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Prethodna fotografija"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Sljedeća fotografija"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full flex flex-col rounded-2xl overflow-hidden bg-[#0C1410] border border-white/10 shadow-2xl"
          >
            {/* Main Image Display */}
            <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-[68vh] bg-black">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                priority
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Photo Details Ribbon */}
            <div className="p-4 sm:p-6 bg-[#141F19] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{activePhoto.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white/60">{activePhoto.category}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold">
                  {activePhoto.title}
                </h3>
                <p className="mt-1 text-xs text-[#A8C2B3] max-w-xl line-clamp-2">
                  {activePhoto.description}
                </p>
              </div>

              {/* Technical EXIF */}
              <div className="w-full sm:w-auto shrink-0 bg-black/40 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-white/10 text-xs font-mono space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Camera className="w-3.5 h-3.5 shrink-0" />
                  <span>{activePhoto.cameraInfo}</span>
                </div>
                <div className="text-[11px] text-[#A8C2B3]">
                  Autor: {activePhoto.photographer}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
