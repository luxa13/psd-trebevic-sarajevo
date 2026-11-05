export interface WeatherStationSnapshot {
  name: string;
  tempC: number;
  feelsLikeC: number;
  condition: string;
  windSpeedKmH: number;
  windDirection: string;
  isLive: boolean;
}

export interface WeatherSnapshot {
  stations: {
    summit: WeatherStationSnapshot;
  };
  updatedAt: string;
  source: string;
}

export function isWeatherRelatedQuestion(query: string): boolean {
  const normalizedQuery = query
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const asksAboutWeather =
    /\b(vrijem\w*|vrem\w*|temperatur\w*|vjet\w*|kis\w*|magl\w*|uslov\w*|weather|forecast|temperature|wind|rain|fog|conditions)\b/.test(normalizedQuery);
  const asksAboutSnowOrIce =
    /\b(snijeg|led|snow|ice)\b/.test(normalizedQuery) &&
    !/\b(oprem\w*|derez\w*|gear|boots|crampon\w*)/.test(normalizedQuery);
  const asksAboutTrailConditions =
    (/\bstaz\w*|\btrail\w*/.test(normalizedQuery) &&
      /\b(stanj\w*|prohod\w*|kakv\w*|otvoren\w*|zatvoren\w*|condition\w*|safe|open|closed|snow|ice)\b/.test(normalizedQuery));

  return asksAboutWeather || asksAboutSnowOrIce || asksAboutTrailConditions;
}

function isWeatherStationSnapshot(value: unknown): value is WeatherStationSnapshot {
  if (!value || typeof value !== 'object') return false;
  const station = value as Record<string, unknown>;
  return (
    typeof station.name === 'string' &&
    typeof station.tempC === 'number' &&
    typeof station.feelsLikeC === 'number' &&
    typeof station.condition === 'string' &&
    typeof station.windSpeedKmH === 'number' &&
    typeof station.windDirection === 'string' &&
    typeof station.isLive === 'boolean'
  );
}

export function isWeatherSnapshot(value: unknown): value is WeatherSnapshot {
  if (!value || typeof value !== 'object') return false;
  const snapshot = value as Record<string, unknown>;
  if (!snapshot.stations || typeof snapshot.stations !== 'object') return false;
  const stations = snapshot.stations as Record<string, unknown>;
  return (
    isWeatherStationSnapshot(stations.summit) &&
    typeof snapshot.updatedAt === 'string' &&
    typeof snapshot.source === 'string'
  );
}
