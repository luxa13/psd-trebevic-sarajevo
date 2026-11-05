import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import {
  isWeatherRelatedQuestion,
  isWeatherSnapshot,
  type WeatherSnapshot,
} from '@/lib/weather-snapshot';

function getOfflineAnswer(query: string, weather: WeatherSnapshot | null): string {
  const normalizedQuery = query
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (isWeatherRelatedQuestion(query)) {
    if (!weather || !weather.stations.summit.isLive) {
      return 'Trenutni podaci o vremenu na vrhu Sofe nisu dostupni. Ne mogu potvrditi ni stanje podloge ili prohodnost staze; provjerite lokalne izvore prije polaska.';
    }

    const summit = weather.stations.summit;
    return `Uživo za ${summit.name}: ${summit.tempC}°C, osjet ${summit.feelsLikeC}°C, ${summit.condition.toLowerCase()}, vjetar ${summit.windSpeedKmH} km/h (${summit.windDirection}); ažurirano u ${weather.updatedAt} (${weather.source}). Ovo su meteorološki podaci i ne potvrđuju stanje podloge, snijeg, led ni zatvaranje staze.`;
  }

  if (normalizedQuery.includes('vod') || normalizedQuery.includes('izvor')) {
    return 'Izvor Dobre Vode (oko 1310 m) nalazi se uz planinarsku rutu, ali dostupnost i ispravnost vode mogu varirati. Ponesite dovoljno vode za cijeli uspon.';
  }

  if (normalizedQuery.includes('pas') || normalizedQuery.includes('psom') || normalizedQuery.includes('zicar')) {
    return 'Pravila za prevoz pasa mogu zavisiti od operatera žičare i mijenjati se. Provjerite aktuelne uslove kod Sarajevske žičare prije polaska.';
  }

  if (normalizedQuery.includes('dom') || normalizedQuery.includes('jure') || normalizedQuery.includes('vikend')) {
    return 'Dom Jure Franko nalazi se na oko 1430 m, uz rutu prema vrhu Sofe. Radno vrijeme se može mijenjati, zato prije polaska provjerite direktno s domom ili organizatorom ture.';
  }

  if (normalizedQuery.includes('bob') || normalizedQuery.includes('olimp')) {
    return 'Olimpijska bob-staza na Trebeviću duga je oko 1300 m i dio je naslijeđa ZOI 1984. Pristup i stanje pojedinih dionica mogu se mijenjati, pa pratite lokalne oznake i upute.';
  }

  return 'Mogu pomoći s općim informacijama o Trebeviću i opremi. Vremenske podatke za vrh preuzimam uživo kada su dostupni; za stanje staze, snijeg i led provjerite lokalne izvore.';
}

export async function POST(req: NextRequest) {
  try {
    const { query, context, weather: weatherInput } = await req.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Potreban je upit za brzi pregled.' },
        { status: 400 }
      );
    }

    const weather = isWeatherSnapshot(weatherInput) ? weatherInput : null;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        answer: getOfflineAnswer(query, weather),
        modelUsed: isWeatherRelatedQuestion(query) && weather?.stations.summit.isLive
          ? 'offline-live-weather'
          : 'offline-local',
        timestamp: new Date().toISOString(),
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const liveSummit = weather?.stations.summit.isLive ? weather.stations.summit : null;
    const weatherContext = liveSummit
      ? `${liveSummit.name}: ${liveSummit.tempC}°C, osjećaj ${liveSummit.feelsLikeC}°C, ${liveSummit.condition}, vjetar ${liveSummit.windSpeedKmH} km/h (${liveSummit.windDirection}), ažurirano ${weather?.updatedAt ?? 'nepoznato'} (${weather?.source ?? 'vremenska stanica'}).`
      : 'Trenutni podaci za vrh nisu dostupni.';

    // gemini-3.1-flash-lite for ultra low-latency responses
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Kratak, trenutan i precizan planinarski odgovor za Trebević/Sarajevo.
Kontekst: ${context || 'Planina Trebević 1629m, Sarajevo'}
Podaci o vremenu: ${weatherContext}
Pitanje/Upit: ${query}
Format odgovora: Maksimalno 2 do 3 koncizne rečenice sa ključnim brojevima i preporukom. Bez uvoda. Ne predstavljajte vremenske podatke kao potvrdu da je staza otvorena ili bez snijega/leda.`,
      config: {
        systemInstruction: 'Vi ste brzi dispečer PSD Trebević Sarajevo. Dajte trenutne, direktne i praktične odgovore u 2-3 rečenice.',
      },
    });

    return NextResponse.json({
      answer: response.text || 'Brza provjera završena.',
      modelUsed: 'gemini-3.1-flash-lite',
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('Fast-check error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Greška pri brzom pregledu.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
