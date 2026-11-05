'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrailExplorer from '@/components/TrailExplorer';
import WeatherWidget from '@/components/WeatherWidget';
import ToursSection from '@/components/ToursSection';
import GallerySection from '@/components/GallerySection';
import NewsSection from '@/components/NewsSection';
import HistorySection from '@/components/HistorySection';
import FastCheckWidget from '@/components/FastCheckWidget';
import Footer from '@/components/Footer';
import { ClubTour } from '@/lib/trebevic-data';

const TourRegistrationModal = dynamic(() => import('@/components/TourRegistrationModal'));
const GeminiMountainChat = dynamic(() => import('@/components/GeminiMountainChat'));

export default function HomePage() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [hasOpenedTourModal, setHasOpenedTourModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState<ClubTour | null>(null);
  const [isAiGuideOpen, setIsAiGuideOpen] = useState(false);
  const [hasOpenedAiGuide, setHasOpenedAiGuide] = useState(false);

  const handleOpenTourModal = (tour?: ClubTour) => {
    setSelectedTour(tour || null);
    setHasOpenedTourModal(true);
    setIsTourModalOpen(true);
  };

  const handleOpenAiGuide = () => {
    setHasOpenedAiGuide(true);
    setIsAiGuideOpen(true);
  };

  const handleCloseTourModal = () => {
    setIsTourModalOpen(false);
    setSelectedTour(null);
  };

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen flex flex-col bg-[#F7FAF8] dark:bg-[#0C1410] text-[#111D16] dark:text-[#F0F6F2] transition-colors duration-200"
    >
      <Navbar
        onOpenTourModal={() => handleOpenTourModal()}
        onOpenAiGuide={handleOpenAiGuide}
      />

      <main className="flex-1">
        <Hero
          onOpenTourModal={() => handleOpenTourModal()}
          onOpenAiGuide={handleOpenAiGuide}
        />
        <FastCheckWidget />
        <TrailExplorer onSelectTrailForTour={() => handleOpenTourModal()} />
        <WeatherWidget />
        <ToursSection onRegisterTour={(tour) => handleOpenTourModal(tour)} />
        <GallerySection />
        <NewsSection />
        <HistorySection />
      </main>

      <Footer />

      {hasOpenedTourModal && (
        <TourRegistrationModal
          isOpen={isTourModalOpen}
          onClose={handleCloseTourModal}
          preselectedTour={selectedTour}
        />
      )}

      {hasOpenedAiGuide && (
        <GeminiMountainChat
          isOpen={isAiGuideOpen}
          onClose={() => setIsAiGuideOpen(false)}
        />
      )}
    </div>
  );
}
