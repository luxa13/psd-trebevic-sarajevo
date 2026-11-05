'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ClubTour, UPCOMING_TOURS } from '@/lib/trebevic-data';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Mail,
  Mountain,
  ChevronDown,
} from 'lucide-react';

interface TourRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTour?: ClubTour | null;
}

export default function TourRegistrationModal({
  isOpen,
  onClose,
  preselectedTour,
}: TourRegistrationModalProps) {
  const [selectedTourId, setSelectedTourId] = useState<string>(
    preselectedTour ? preselectedTour.id : UPCOMING_TOURS[0].id
  );

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'pocetnik' | 'rekreativac' | 'iskusan'>('rekreativac');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [gearConfirmed, setGearConfirmed] = useState(false);

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [confirmationData, setConfirmationData] = useState<{
    tourTitle: string;
    date: string;
    time: string;
    meetingPoint: string;
    userName: string;
  } | null>(null);

  if (!isOpen) return null;

  const currentTour = UPCOMING_TOURS.find((t) => t.id === selectedTourId) || UPCOMING_TOURS[0];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Molimo unesite vaše puno ime i prezime (min 3 znaka).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = 'Unesite ispravnu email adresu (npr. planinar@gmail.com).';
    }
    if (!phone.trim() || phone.trim().length < 6) {
      errs.phone = 'Unesite kontakt telefon za potrebe gorske sigurnosti.';
    }
    if (!gearConfirmed) {
      errs.gear = 'Morate potvrditi da posjedujete obaveznu planinarsku opremu.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/tour-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: currentTour.id,
          fullName,
          email,
          phone,
          emergencyContact,
          experienceLevel,
          gearConfirmed,
          website: formData.get('website'),
        }),
      });
      const result: unknown = await response.json();
      const responseData = typeof result === 'object' && result !== null
        ? result as { error?: unknown; sent?: unknown }
        : {};

      if (!response.ok || responseData.sent !== true) {
        setSubmissionError(
          typeof responseData.error === 'string'
            ? responseData.error
            : 'Prijavu trenutno nije moguće poslati. Pokušajte ponovo kasnije.'
        );
        return;
      }

      setConfirmationData({
        tourTitle: currentTour.title,
        date: currentTour.date,
        time: currentTour.time,
        meetingPoint: currentTour.meetingPoint,
        userName: fullName.trim(),
      });
    } catch {
      setSubmissionError('Prijavu trenutno nije moguće poslati. Provjerite internet i pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setConfirmationData(null);
    setSubmissionError(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setEmergencyContact('');
    setGearConfirmed(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-tour-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#141F19] rounded-2xl shadow-2xl border border-[#DEE8E1] dark:border-[#24352B] overflow-hidden my-4 sm:my-8">
        
        {/* Modal Top Header */}
        <div className="bg-[#143522] text-white px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 p-1 flex items-center justify-center shrink-0">
              <Mountain className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 id="modal-tour-title" className="text-base sm:text-lg font-bold">
                {confirmationData ? 'Prijava je poslana' : 'Prijava na planinarsku turu'}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#A8C2B3]">
                PSD Trebević Sarajevo · Planinarska sekcija
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Zatvori prozor prijave"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 max-h-[80vh] overflow-y-auto">
          {confirmationData ? (
            /* Email handoff view */
            <div className="space-y-5 sm:space-y-6">
              <div className="p-4 sm:p-6 rounded-2xl bg-[#F2F7F4] dark:bg-[#0E1712] border border-[#DEE8E1] dark:border-[#1F3327] relative">
                
                <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-[#DEE8E1] dark:border-[#1F3327] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#DEE8E1] bg-white shrink-0">
                      <Image
                        src="/images/psd_trebevic_icon.png"
                        alt="PSD Logo"
                        width={96}
                        height={96}
                        className="object-contain w-full h-full"
                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#B8282D] dark:text-[#D9383E] uppercase font-bold block">
                        Zahtjev za prijavu
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-[#111D16] dark:text-white">
                        {confirmationData.tourTitle}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-4 border-b border-[#DEE8E1] dark:border-[#1F3327] text-xs">
                  <div>
                    <span className="text-[10px] text-[#526D5F] dark:text-[#88A393] block">Učesnik</span>
                    <span className="font-bold text-[#111D16] dark:text-white">{confirmationData.userName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#526D5F] dark:text-[#88A393] block">Datum i vrijeme</span>
                    <span className="font-bold text-[#111D16] dark:text-white">{confirmationData.date} · {confirmationData.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#526D5F] dark:text-[#88A393] block">Mjesto okupljanja</span>
                    <span className="font-bold text-[#111D16] dark:text-white">{confirmationData.meetingPoint}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#526D5F] dark:text-[#88A393]">
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Zahtjev je poslan PSD Trebević e-mailom</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-100">
                Vaša prijava je poslata na <strong>psdtrebevic@icloud.com</strong>. Prijava nije konačno potvrđena dok vam PSD Trebević ne odgovori.
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full py-3 px-6 min-h-[44px] text-xs font-semibold text-[#143522] dark:text-white bg-[#EFF4F0] dark:bg-[#1E2D24] hover:bg-[#DEE8E1] dark:hover:bg-[#283C30] rounded-lg transition-colors border border-[#DEE8E1] dark:border-[#2C4235] flex items-center justify-center"
                >
                  Zatvori
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Registration Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-10000px' }}
              />
              
              {/* Tour Selection Dropdown */}
              <div>
                <label htmlFor="tour-select" className="text-xs font-bold text-[#111D16] dark:text-[#F0F6F2] uppercase tracking-wider block mb-1.5">
                  Izaberite turu ili pohod *
                </label>
                <div className="relative">
                  <select
                    id="tour-select"
                    value={selectedTourId}
                    onChange={(e) => setSelectedTourId(e.target.value)}
                    className="w-full appearance-none px-3.5 pr-10 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-lg bg-white dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#24352B] text-[#111D16] dark:text-white focus:ring-2 focus:ring-[#B8282D] focus:outline-none"
                  >
                    {UPCOMING_TOURS.map((tour) => (
                      <option key={tour.id} value={tour.id}>
                        {tour.date} · {tour.title} ({tour.difficulty})
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#526D5F] dark:text-[#A8C2B3]" />
                </div>
                <div className="mt-2 text-xs text-[#526D5F] dark:text-[#88A393] flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#B8282D] shrink-0" />
                    Polazak: {currentTour.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    {currentTour.meetingPoint}
                  </span>
                </div>
              </div>

              {/* Name & Email (2 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="full-name" className="text-xs font-semibold text-[#334A3E] dark:text-[#A8C2B3] block mb-1">
                    Ime i prezime *
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="npr. Emir Hadžić"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-lg bg-white dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#24352B] text-[#111D16] dark:text-white focus:ring-2 focus:ring-[#B8282D] focus:outline-none"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-[#B8282D] dark:text-[#D9383E] mt-1 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="user-email" className="text-xs font-semibold text-[#334A3E] dark:text-[#A8C2B3] block mb-1">
                    Email adresa *
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="planinar@sarajevo.ba"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-lg bg-white dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#24352B] text-[#111D16] dark:text-white focus:ring-2 focus:ring-[#B8282D] focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-[#B8282D] dark:text-[#D9383E] mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone-number" className="text-xs font-semibold text-[#334A3E] dark:text-[#A8C2B3] block mb-1">
                    Broj telefona (Viber/WhatsApp) *
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+387 61 000 000"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-lg bg-white dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#24352B] text-[#111D16] dark:text-white focus:ring-2 focus:ring-[#B8282D] focus:outline-none"
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-[#B8282D] dark:text-[#D9383E] mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="emergency-contact" className="text-xs font-semibold text-[#334A3E] dark:text-[#A8C2B3] block mb-1">
                    Kontakt osoba u slučaju nužde (Ime i tel)
                  </label>
                  <input
                    id="emergency-contact"
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="npr. Lejla (supruga) 062 123 456"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-lg bg-white dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#24352B] text-[#111D16] dark:text-white focus:ring-2 focus:ring-[#B8282D] focus:outline-none"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label htmlFor="experience-level" className="text-xs font-semibold text-[#334A3E] dark:text-[#A8C2B3] block mb-1">
                  Planinarsko iskustvo
                </label>
                <div className="relative">
                  <select
                    id="experience-level"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as 'pocetnik' | 'rekreativac' | 'iskusan')}
                    className="w-full appearance-none px-3.5 pr-10 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-lg bg-white dark:bg-[#0D1612] border border-[#DEE8E1] dark:border-[#24352B] text-[#111D16] dark:text-white focus:ring-2 focus:ring-[#B8282D] focus:outline-none"
                  >
                    <option value="pocetnik">Početnik (Prvi usponi)</option>
                    <option value="rekreativac">Rekreativac (Redovne šumske šetnje)</option>
                    <option value="iskusan">Iskusan planinar (Visokogorstvo, zimski usponi)</option>
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#526D5F] dark:text-[#A8C2B3]" />
                </div>
              </div>

              {/* Mandatory Gear Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 p-3 bg-[#F2F7F4] dark:bg-[#0E1712] rounded-xl border border-[#DEE8E1] dark:border-[#1F3327] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gearConfirmed}
                    onChange={(e) => setGearConfirmed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#B8282D] focus:ring-[#B8282D] accent-[#B8282D]"
                  />
                  <span className="text-xs text-[#334A3E] dark:text-[#A8C2B3] leading-snug">
                    <strong className="text-[#111D16] dark:text-white">Potvrđujem posjedovanje obavezne opreme:</strong>{' '}
                    planinarske cipele (gojzerice), slojevita garderoba, čeona lampa, termosica/voda i lični dokumenti.
                  </span>
                </label>
                {errors.gear && (
                  <span className="text-[11px] text-[#B8282D] dark:text-[#D9383E] mt-1 block">
                    {errors.gear}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                {submissionError && (
                  <p role="alert" className="mb-3 text-center text-xs text-[#B8282D] dark:text-[#F08080]">
                    {submissionError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 min-h-[48px] text-xs sm:text-sm font-bold text-white bg-[#B8282D] hover:bg-[#9A2024] disabled:opacity-70 disabled:cursor-wait rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isSubmitting ? 'Šaljem prijavu…' : 'Pošalji prijavu'}</span>
                </button>
                <p className="mt-2 text-center text-[11px] text-[#6E8679]">
                  Klikom se prijava direktno šalje PSD Trebević e-mailom.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
