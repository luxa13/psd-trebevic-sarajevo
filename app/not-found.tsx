import Link from 'next/link';
import { Compass, Home, Mountain } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      suppressHydrationWarning
      className="min-h-screen flex flex-col items-center justify-center bg-[#F7FAF8] dark:bg-[#0C1410] text-[#111D16] dark:text-[#F0F6F2] px-4 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[#B8282D]/10 dark:bg-[#B8282D]/20 text-[#B8282D] flex items-center justify-center mb-6">
        <Mountain className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold tracking-[0.2em] text-[#B8282D] uppercase mb-2">
        404 · Stranica nije pronađena
      </span>

      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#143522] dark:text-[#EAF3EC] mb-3">
        Skrenuli ste sa markirane staze
      </h1>

      <p className="text-sm text-[#42584C] dark:text-[#9EB5A7] max-w-md mb-8">
        Stranica koju tražite ne postoji ili je premještena. Vratite se na glavnu stazu i istražite Mount Trebević.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#B8282D] hover:bg-[#9A2024] transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Početna stranica</span>
        </Link>
        <Link
          href="/#staze"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#143522] dark:text-[#EAF3EC] bg-[#EFF4F0] dark:bg-[#18261E] hover:bg-[#DEE8E1] dark:hover:bg-[#22352A] transition-colors border border-[#DEE8E1] dark:border-[#243A2C]"
        >
          <Compass className="w-4 h-4 text-[#B8282D]" />
          <span>Vodič kroz staze</span>
        </Link>
      </div>
    </div>
  );
}
