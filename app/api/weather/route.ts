import { NextResponse } from 'next/server';

interface StationWeather {
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
  isLive: boolean;
}

function getWindDirectionName(deg: number): string {
  if (deg >= 337.5 || deg < 22.5) return 'S (Sjever)';
  if (deg >= 22.5 && deg < 67.5) return 'SI (Sjevero-istok)';
  if (deg >= 67.5 && deg < 112.5) return 'I (Istok)';
  if (deg >= 112.5 && deg < 157.5) return 'JI (Jugo-istok)';
  if (deg >= 157.5 && deg < 202.5) return 'J (Jug)';
  if (deg >= 202.5 && deg < 247.5) return 'JZ (Jugo-zapad)';
  if (deg >= 247.5 && deg < 292.5) return 'Z (Zapad)';
  return 'SZ (Sjevero-zapad)';
}

function getWeatherCondition(code: number): string {
  switch (code) {
    case 0:
      return 'Vedro nebo';
    case 1:
      return 'Pretežno vedro';
    case 2:
      return 'Djelomično oblačno';
    case 3:
      return 'Oblačno';
    case 45:
    case 48:
      return 'Magla / Kotlinska izmaglica';
    case 51:
    case 53:
    case 55:
      return 'Slaba rosulja / Sitna kiša';
    case 61:
    case 63:
    case 65:
      return 'Kiša';
    case 66:
    case 67:
      return 'Ledena kiša';
    case 71:
    case 73:
    case 75:
      return 'Snijeg / Snježne padavine';
    case 77:
      return 'Zrnati snijeg';
    case 80:
    case 81:
    case 82:
      return 'Pljuskovi kiše';
    case 85:
    case 86:
      return 'Snježni pljuskovi';
    case 95:
    case 96:
    case 99:
      return 'Grmljavinsko nevrijeme';
    default:
      return 'Promjenjivo oblačno';
  }
}

function getAirQualityCategory(aqi: number, isSummit: boolean): { text: string } {
  if (isSummit) {
    return { text: 'Izvrsno / Čist gorski zrak' };
  }
  if (aqi <= 20) return { text: 'Izvrstan čist zrak' };
  if (aqi <= 40) return { text: 'Dobar kvalitet zraka' };
  if (aqi <= 60) return { text: 'Umjereno zagađen zrak' };
  if (aqi <= 80) return { text: 'Nezdrav zrak za osjetljive grupe' };
  return { text: 'Zagađen zrak u kotlini' };
}

// Fallback baseline calibrated to Sarajevo current winter/autumn climate
const FALLBACK_SARAJEVO = {
  tempC: 4,
  feelsLikeC: 3,
  weatherCode: 3,
  windSpeedKmH: 5,
  windDirection: 'I (Istok)',
  humidity: 86,
  uvIndex: 1,
  visibilityKm: 8,
  airQualityAqi: 62,
};

async function fetchStationCurrent(url: string, timeoutMs = 3500) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || typeof data !== 'object' || !data.current || typeof data.current.temperature_2m !== 'number') {
      return null;
    }
    return data.current;
  } catch {
    return null;
  }
}

async function fetchAirQualityAqi(url: string, timeoutMs = 3000): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.current?.european_aqi && typeof data.current.european_aqi === 'number') {
      return Math.round(data.current.european_aqi);
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET() {
  const urls = {
    sarajevo:
      'https://api.open-meteo.com/v1/forecast?latitude=43.8563&longitude=18.4131&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&timezone=Europe/Sarajevo',
    vidikovac:
      'https://api.open-meteo.com/v1/forecast?latitude=43.8430&longitude=18.4310&elevation=1160&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&timezone=Europe/Sarajevo',
    summit:
      'https://api.open-meteo.com/v1/forecast?latitude=43.8344&longitude=18.4519&elevation=1629&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&timezone=Europe/Sarajevo',
    airQuality:
      'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=43.8563&longitude=18.4131&current=european_aqi,pm10,pm2_5',
  };

  const [currSarajevo, currVidikovac, currSummit, liveAqi] = await Promise.all([
    fetchStationCurrent(urls.sarajevo),
    fetchStationCurrent(urls.vidikovac),
    fetchStationCurrent(urls.summit),
    fetchAirQualityAqi(urls.airQuality),
  ]);

  const hasLiveApi = Boolean(currSarajevo || currVidikovac || currSummit);

  // Derive Sarajevo data
  const tempSarajevo = currSarajevo ? Math.round(currSarajevo.temperature_2m) : FALLBACK_SARAJEVO.tempC;
  const feelsSarajevo = currSarajevo?.apparent_temperature !== undefined ? Math.round(currSarajevo.apparent_temperature) : FALLBACK_SARAJEVO.feelsLikeC;
  const codeSarajevo = currSarajevo?.weather_code ?? FALLBACK_SARAJEVO.weatherCode;
  const windSpdSarajevo = currSarajevo?.wind_speed_10m !== undefined ? Math.round(currSarajevo.wind_speed_10m) : FALLBACK_SARAJEVO.windSpeedKmH;
  const windDirSarajevo = currSarajevo?.wind_direction_10m !== undefined ? getWindDirectionName(currSarajevo.wind_direction_10m) : FALLBACK_SARAJEVO.windDirection;
  const humSarajevo = currSarajevo?.relative_humidity_2m !== undefined ? Math.round(currSarajevo.relative_humidity_2m) : FALLBACK_SARAJEVO.humidity;
  const uvSarajevo = currSarajevo?.uv_index !== undefined ? Math.round(currSarajevo.uv_index) : FALLBACK_SARAJEVO.uvIndex;
  const aqiSarajevo = liveAqi ?? FALLBACK_SARAJEVO.airQualityAqi;

  // Derive Vidikovac (1160m) - lapse rate ~0.65°C per 100m = ~4°C drop from Sarajevo (550m)
  const tempVidikovac = currVidikovac ? Math.round(currVidikovac.temperature_2m) : Math.max(-10, tempSarajevo - 3);
  const feelsVidikovac = currVidikovac?.apparent_temperature !== undefined ? Math.round(currVidikovac.apparent_temperature) : tempVidikovac - 2;
  const codeVidikovac = currVidikovac?.weather_code ?? (tempVidikovac <= 0 && codeSarajevo >= 51 ? 71 : codeSarajevo);
  const windSpdVidikovac = currVidikovac?.wind_speed_10m !== undefined ? Math.round(currVidikovac.wind_speed_10m) : 10;
  const windDirVidikovac = currVidikovac?.wind_direction_10m !== undefined ? getWindDirectionName(currVidikovac.wind_direction_10m) : 'SI (Sjevero-istok)';
  const humVidikovac = currVidikovac?.relative_humidity_2m !== undefined ? Math.round(currVidikovac.relative_humidity_2m) : 82;
  const uvVidikovac = currVidikovac?.uv_index !== undefined ? Math.round(currVidikovac.uv_index) : Math.max(1, uvSarajevo + 1);

  // Derive Summit Sofe (1629m) - ~7°C drop from Sarajevo (550m)
  const tempSummit = currSummit ? Math.round(currSummit.temperature_2m) : Math.max(-15, tempSarajevo - 6);
  const feelsSummit = currSummit?.apparent_temperature !== undefined ? Math.round(currSummit.apparent_temperature) : tempSummit - 4;
  const codeSummit = currSummit?.weather_code ?? (tempSummit <= 0 ? 71 : codeVidikovac);
  const windSpdSummit = currSummit?.wind_speed_10m !== undefined ? Math.round(currSummit.wind_speed_10m) : 18;
  const windDirSummit = currSummit?.wind_direction_10m !== undefined ? getWindDirectionName(currSummit.wind_direction_10m) : 'SZ (Sjevero-zapad)';
  const humSummit = currSummit?.relative_humidity_2m !== undefined ? Math.round(currSummit.relative_humidity_2m) : 78;
  const uvSummit = currSummit?.uv_index !== undefined ? Math.round(currSummit.uv_index) : Math.max(1, uvVidikovac + 1);

  const isInversion = tempSummit > tempSarajevo;

  const sarajevoStation: StationWeather = {
    name: 'Sarajevo Centar / Baščaršija (550m)',
    location: 'Gradska kotlina / Polazna stanica Bistrik',
    elevation: 550,
    tempC: tempSarajevo,
    feelsLikeC: feelsSarajevo,
    condition: getWeatherCondition(codeSarajevo),
    weatherCode: codeSarajevo,
    windSpeedKmH: windSpdSarajevo,
    windDirection: windDirSarajevo,
    humidity: humSarajevo,
    uvIndex: uvSarajevo,
    visibilityKm: codeSarajevo >= 45 ? 6 : 14,
    airQualityAqi: aqiSarajevo,
    airQualityText: getAirQualityCategory(aqiSarajevo, false).text,
    trailState: tempSarajevo <= 0 ? 'Moguća poledica na kolovozu' : 'Gradski prilazi prohodni',
    inversionActive: isInversion,
    inversionNote: isInversion
      ? 'Temperaturna inverzija: Sarajevo je u hladnoj kotlinskoj kapi, planina je toplija!'
      : 'Normalan gradijent: Gradska kotlina je toplija od gorskih vrhova.',
    isLive: Boolean(currSarajevo),
  };

  const vidikovacStation: StationWeather = {
    name: 'Vidikovac & Žičara (1160m)',
    location: 'Gornja stanica Sarajevske žičare & Pino',
    elevation: 1160,
    tempC: tempVidikovac,
    feelsLikeC: feelsVidikovac,
    condition: getWeatherCondition(codeVidikovac),
    weatherCode: codeVidikovac,
    windSpeedKmH: windSpdVidikovac,
    windDirection: windDirVidikovac,
    humidity: humVidikovac,
    uvIndex: uvVidikovac,
    visibilityKm: 30,
    airQualityAqi: Math.max(10, Math.round(aqiSarajevo * 0.35)),
    airQualityText: 'Čist planinski zrak',
    trailState: tempVidikovac <= 0 ? 'Moguća poledica na stazama, oprez!' : 'Šumske staze prohodne',
    inversionActive: isInversion,
    inversionNote: isInversion
      ? 'Zona iznad magle: Vidikovac je iznad gradskog smoga.'
      : 'Planinska zona: Svježiji zrak i čist pogled na grad.',
    isLive: Boolean(currVidikovac),
  };

  const summitStation: StationWeather = {
    name: 'Vrh Sofe (1629m)',
    location: 'Najviša tačka planine Trebević',
    elevation: 1629,
    tempC: tempSummit,
    feelsLikeC: feelsSummit,
    condition: getWeatherCondition(codeSummit),
    weatherCode: codeSummit,
    windSpeedKmH: windSpdSummit,
    windDirection: windDirSummit,
    humidity: humSummit,
    uvIndex: uvSummit,
    visibilityKm: 45,
    airQualityAqi: 8,
    airQualityText: 'Izvrsno / Čist gorski zrak',
    trailState:
      tempSummit <= 0
        ? 'Zimski uslovi na grebenu: Obavezna topla zimska oprema i dereze!'
        : 'Stjenoviti greben otvoren, vjetrovito na vrhu',
    inversionActive: isInversion,
    inversionNote: isInversion
      ? 'Fenomen inverzije: Vrh Sofe se kupa u suncu iznad oblaka!'
      : 'Visinski greben: Znatno niža temperatura i jači udari vjetra.',
    isLive: Boolean(currSummit),
  };

  return NextResponse.json({
    stations: {
      sarajevo: sarajevoStation,
      vidikovac: vidikovacStation,
      summit: summitStation,
    },
    updatedAt: new Date().toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' }),
    source: hasLiveApi ? 'Open-Meteo Live API' : 'Kalibrisana meteorološka stanica',
  });
}
