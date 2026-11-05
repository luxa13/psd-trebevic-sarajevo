import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import {
  isWeatherRelatedQuestion,
  isWeatherSnapshot,
  type WeatherSnapshot,
} from '@/lib/weather-snapshot';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// Local authoritative domain knowledge for instant fallback
function getLocalMountainFallbackAnswer(
  userQuery: string,
  rolePreset?: string,
  weather?: WeatherSnapshot | null
): string {
  const queryLower = userQuery
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (isWeatherRelatedQuestion(userQuery)) {
    const summit = weather?.stations.summit;
    if (summit?.isLive) {
      return `Uživo za ${summit.name}: ${summit.tempC}°C, osjet ${summit.feelsLikeC}°C, ${summit.condition.toLowerCase()}, vjetar ${summit.windSpeedKmH} km/h (${summit.windDirection}); ažurirano u ${weather?.updatedAt ?? 'nepoznato'} (${weather?.source ?? 'vremenska stanica'}). Ovo su meteorološki podaci i ne potvrđuju stanje podloge, snijeg, led ni zatvaranje staze.`;
    }
    return 'Trenutni podaci o vremenu na vrhu Sofe nisu dostupni. Ne mogu potvrditi ni stanje podloge ili prohodnost staze; provjerite lokalne izvore prije polaska.';
  }

  if (queryLower.includes('vidikov') && (queryLower.includes('sofe') || queryLower.includes('vrh') || queryLower.includes('traje'))) {
    return `**Uspon: Vidikovac (1.160m) → Vrh Sofe (1.629m)**

• **Vrijeme uspona:** 1h 30min do 2 sata umjerenog hoda.
• **Dužina staze:** cca 4,2 km (u jednom smjeru).
• **Visinska razlika:** ~470 m uspona.
• **Profil terena:** 
  - Početni dio od gornje stanice žičare vodi uređenom šumskom stazom kroz crnogoričnu šumu pored planinarskog doma Jure Franko.
  - Srednji dio je umjerenog nagiba sa utabanim zemljanim i kamenim dionicama.
  - Završni greben ispod samog vrha Sofe je otvoren krečnjački krš — stjenovit i izložen vjetru, sa markacijama na stijenama.
• **Preporučena oprema:** Gojzerice sa profilisanim đonom, slojevita odjeća, zaštitni vjetrovak i minimalno 1.5 l vode. Zimi su obavezne dereze i štapovi.`;
  }

  if (queryLower.includes('zimsk') || queryLower.includes('oprem') || queryLower.includes('snijeg') || queryLower.includes('led')) {
    return `**Obavezna planinarska oprema za uspon na Trebević:**

1. **Obuća:** Duboke planinarske cipele (gojzerice) sa vibram đonom i termo čarapama.
2. **Zimski uslovi:** Dereze, planinarski štapovi sa krpljicama za snijeg i gamašne.
3. **Odjeća (troslojni princip):** Aktivni veš, flis dukserica, te vjetrootporna/vodootporna jakna (hardshell).
4. **Sigurnost:** Čeona lampa sa rezervnim baterijama, astro-folija, komplet prve pomoći i napunjen telefon sa spremljenim brojem GSS Sarajevo (121).
5. **Prehrana:** Termosica s toplim čajem i energetski obroci (orašasti plodovi, suho voće).`;
  }

  if (queryLower.includes('bob') || queryLower.includes('olimpij')) {
    return `**Olimpijska bob i sankaška staza ZOI '84 (Trebević):**

• Izgrađena za XIV Zimske olimpijske igre u Sarajevu 1984. godine.
• Ukupna dužina staze je 1.300 metara sa 13 specifičnih zavoja i visinskim padom od 126 metara.
• Danas je staza svjetski poznata turistička atrakcija, prekrivena umjetničkim grafitima, i predstavlja popularnu pješačku rutu koja spaja gornji i donji dio planine.
• Pristup je moguć pješke od Pino Nature hotela, sa Vidikovca ili iz pravca Bistrika.`;
  }

  if (queryLower.includes('gss') || queryLower.includes('hitn') || queryLower.includes('pomoć') || queryLower.includes('spašav')) {
    return `**Gorska služba spašavanja (GSS) Stanica Sarajevo:**

• **Hitni telefon 24/7:** 121 ili +387 62 112 112
• U slučaju nesreće na planini ostanite mirni, osigurajte povrijeđenu osobu od pothlađivanja, pošaljite GPS koordinate i ne napuštajte markiranu stazu.
• PSD Trebević Sarajevo sarađuje direktno sa spasilačkim timovima GSS stanice Sarajevo.`;
  }

  if (queryLower.includes('dom') || queryLower.includes('hrana') || queryLower.includes('čaj') || queryLower.includes('jure')) {
    return `**Planinarski domovi i ugostiteljski objekti na Trebeviću (tačne kote):**

1. **Dom Jure Franko (1.430m n.v.):** Nalazi se podno zapadnog grebena prema vrhu Sofe (1629m). Poznat po planinarskom čaju, grahu i vidikovcu, otvoren vikendom i praznicima.
2. **Hotel Pino Nature / Prvi Šumar (1.070m n.v.):** Na lokalitetu Ravne, polazište mnogih šumskih i grebenskih staza.
3. **Restoran Vidikovac (1.160m n.v.):** Neposredno uz gornju stanicu Trebevićke žičare.
4. **Planinarski dom Napredak (1.100m n.v.):** Tradicionalno okupljalište planinara na Trebeviću.
5. **Čolina Kapa / Bistrik Kula (966m n.v.):** Austrougarska utvrda i nekadašnja astronomska opservatorija.`;
  }

  if (rolePreset === 'safety') {
    return `Kao instruktor gorske sigurnosti PSD Trebević, preporučujem da se prije polaska na stazu informišete o trenutnim uslovima na vrhu Sofe (1629m). Krečnjački grebeni Trebevića postaju klizavi pri magli i vlažnom vremenu. Uvijek nosite napunjen telefon, adekvatnu obuću i krećite se isključivo crveno-bijelo markiranim stazama. Za hitne slučajeve pozovite GSS na 121.`;
  }

  return `Planinarsko-sportsko društvo „Trebević” Sarajevo stoji vam na raspolaganju za sve uspone i planinarske ture! 
Planina Trebević nudi 42 km markiranih staza sa tačnim kotama: najviši vrh Sofe (1629m), telekomunikacijski toranj (1566m), Veliki Stupanj (1522m), Dom Jure Franko (1430m), izvor Dobre Vode (1310m), Vidikovac i gornja stanica žičare (1160m), start Bob staze ZOI '84 (1109m), Prvi Šumar na Ravnama (1070m), cilj bob staze (982m) i Čolina Kapa sa opservatorijem (966m). Za detalje o klupskim ekspedicijama pregledajte kalendar tura na sajtu ili postavite specifično pitanje o željenoj ruti.`;
}

export async function POST(req: NextRequest) {
  let lastUserMessage = '';
  let weather: WeatherSnapshot | null = null;

  try {
    const { messages, model, rolePreset, weather: weatherInput } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Potrebna je barem jedna poruka u razgovoru.' },
        { status: 400 }
      );
    }

    lastUserMessage = [...messages].reverse().find((m: ChatMessage) => m.role === 'user')?.content || '';
    weather = isWeatherSnapshot(weatherInput) ? weatherInput : null;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: getLocalMountainFallbackAnswer(lastUserMessage, rolePreset, weather),
        modelUsed: 'psd-trebevic-mountain-guide-offline',
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

    // Role-specific system instructions
    let systemInstruction = `Vi ste licencirani planinarski vodič i instruktor Planinarsko-sportskog društva (PSD) "Trebević" Sarajevo, osnovanog 2006. godine.
Planina Trebević se uzdiže na 1629m nadmorske visine iznad Sarajeva.
Tačne službene planinarske i topografske kote Trebevića:
- Vrh Sofe: 1629m n.v. (najviša tačka planine)
- Telekomunikacijski toranj / greben: 1566m n.v.
- Veliki Stupanj: 1522m n.v.
- Planinarski dom Jure Franko: 1430m n.v.
- Lokalitet i izvor Dobre Vode: 1310m n.v.
- Izvor Tri budalaša: 1190m n.v.
- Vidikovac & Gornja stanica Trebevićke žičare: 1160m n.v.
- SRC Brus: 1150m n.v.
- Start olimpijske bob staze 1984: 1109m n.v.
- Ravne / Hotel Pino Nature / Prvi Šumar: 1070m n.v.
- Zavoj 8 bob staze: 1045m n.v.
- Cilj olimpijske bob staze: 982m n.v.
- Čolina Kapa (Bistrik Kula / opservatorij): 966m n.v.
- Donja stanica žičare Bistrik: 583m n.v.
- Sarajevo Centar / Baščaršija: 550m n.v.
Odgovarajte stručno, ljubazno i na bosanskom/hrvatskom/srpskom jeziku (ili na jeziku na kojem korisnik postavi pitanje). Dajte tačne savjete za sigurnost na planini, opremu, vremenske prilike, planinarsku etiku, te aktivnosti i ture društva.`;

    if (rolePreset === 'safety') {
      systemInstruction = `Vi ste Alpinistički instruktor za gorsku sigurnost i meteorologiju PSD Trebević Sarajevo.
Vaša uloga je stroga analiza planinarskih rizika: procjena snijega, magle, leda na stjenovitim grebenima Trebevića, oprema (dereze, štapovi, čeona lampa, prva pomoć, folija), postupanje u slučaju nezgode (GSS stanica Sarajevo broj 121 / +387 62 112 112), i hidratacija.`;
    } else if (rolePreset === 'olympic_historian') {
      systemInstruction = `Vi ste hroničar olimpijskog Sarajeva i kustos historije Trebevića.
Posebno poznajete Zimske olimpijske igre 1984. (XIV ZOI Sarajevo), izgradnju olimpijske bob i sankaške staze na Trebeviću, staru i novu Trebevićku žičaru (1959. i 2018.), austrougarske planinarske staze iz 19. vijeka, te historijat planinarstva u BiH.`;
    }

    const summit = weather?.stations.summit.isLive ? weather.stations.summit : null;
    systemInstruction += summit
      ? `\n\nAktuelni podaci Open-Meteo za Vrh Sofe (1629m): ${summit.tempC}°C, osjet ${summit.feelsLikeC}°C, ${summit.condition}, vjetar ${summit.windSpeedKmH} km/h (${summit.windDirection}); ažurirano u ${weather?.updatedAt ?? 'nepoznato'}. Koristite ove podatke kada su relevantni za pitanje i navedite da su vremenska procjena, a ne potvrda stanja podloge, snijega, leda ili zatvaranja staze.`
      : '\n\nTrenutni podaci o vremenu na vrhu nisu dostupni. Nemojte izmišljati live uslove niti tvrditi da je staza otvorena ili bez snijega/leda.';

    // Format chat contents
    const contents = messages.map((m: ChatMessage) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    // Cascade sequence of models: Primary chosen model first, then ultra-reliable lite models
    const requestedModel = model || 'gemini-3.1-flash-lite';
    const modelsToTry: string[] = [
      requestedModel,
      ...(requestedModel !== 'gemini-3.1-flash-lite' ? ['gemini-3.1-flash-lite'] : []),
      'gemini-flash-latest',
    ];

    let lastError: Error | null = null;
    let replyText = '';
    let successfullyUsedModel = '';

    for (const currentModel of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: currentModel,
          contents,
          config: {
            systemInstruction,
          },
        });

        if (response && response.text) {
          replyText = response.text;
          successfullyUsedModel = currentModel;
          break;
        }
      } catch (err: unknown) {
        lastError = err instanceof Error ? err : new Error(String(err));
        console.warn(`Model ${currentModel} failed, trying next fallback:`, lastError.message);
        // Continue loop to try next fallback model (e.g. if 503 UNAVAILABLE on 3.8-flash)
      }
    }

    // If all online models failed (e.g. network outage or 503 on all), use domain knowledge fallback
    if (!replyText) {
      replyText = getLocalMountainFallbackAnswer(lastUserMessage, rolePreset, weather);
      successfullyUsedModel = 'psd-trebevic-mountain-guide-offline';
    }

    return NextResponse.json({
      reply: replyText,
      modelUsed: successfullyUsedModel,
    });
  } catch (error: unknown) {
    console.error('Gemini Chat top-level error:', error);
    const fallbackAnswer = getLocalMountainFallbackAnswer(lastUserMessage, undefined, weather);
    return NextResponse.json({
      reply: fallbackAnswer,
      modelUsed: 'psd-trebevic-mountain-guide-offline',
    });
  }
}
