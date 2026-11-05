/**
 * Pure calculation logic for Mount Trebević hiking trails,
 * elevation grades, Naismith/Langmuir travel time formulas,
 * difficulty rankings, and hydration guidelines.
 */

export interface TrailMetrics {
  distanceKm: number;
  elevationGainM: number;
  elevationLossM: number;
  startElevationM: number;
  peakElevationM: number;
}

export type TrailDifficulty = 'Lako' | 'Umjereno' | 'Zahtjevno' | 'Vrlo zahtjevno';

/**
 * Calculates estimated hiking time in hours using modified Naismith's rule
 * with Langmuir correction for alpine terrain:
 * 1 hour per 4.0 km horizontal distance
 * + 1 hour per 500m ascent
 * + 10 mins per 300m descent if steep (>12% grade)
 */
export function calculateHikingTimeHours(
  distanceKm: number,
  elevationGainM: number,
  elevationLossM: number = 0
): number {
  if (distanceKm <= 0) return 0;
  const baseTimeHours = distanceKm / 4.0;
  const ascentTimeHours = Math.max(0, elevationGainM) / 500.0;
  
  // Steep descent penalty for knees and careful footing
  const descentTimeHours = elevationLossM > 400 ? (elevationLossM / 1000.0) * 0.3 : 0;
  
  const total = baseTimeHours + ascentTimeHours + descentTimeHours;
  return Math.round(total * 10) / 10;
}

/**
 * Returns human-readable time (e.g. "2h 45m" or "45m")
 */
export function formatHikingTime(hours: number): string {
  if (hours <= 0) return '0 min';
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  if (wholeHours === 0) return `${minutes} min`;
  if (minutes === 0) return `${wholeHours}h`;
  return `${wholeHours}h ${minutes}m`;
}

/**
 * Calculates average slope grade percentage
 */
export function calculateAverageGrade(distanceKm: number, elevationGainM: number): number {
  if (distanceKm <= 0) return 0;
  const horizontalM = distanceKm * 1000;
  const grade = (elevationGainM / horizontalM) * 100;
  return Math.round(grade * 10) / 10;
}

/**
 * Classifies trail difficulty for Trebević and Dinaric Alps terrain
 */
export function classifyDifficulty(distanceKm: number, elevationGainM: number): TrailDifficulty {
  if (distanceKm < 4.5 && elevationGainM < 300) {
    return 'Lako';
  }
  if (distanceKm <= 9.0 && elevationGainM <= 650) {
    return 'Umjereno';
  }
  if (distanceKm <= 15.0 && elevationGainM <= 1100) {
    return 'Zahtjevno';
  }
  return 'Vrlo zahtjevno';
}

/**
 * Recommends minimum water in liters needed for hike
 */
export function calculateRecommendedWaterLiters(
  hikingHours: number,
  temperatureC: number = 20
): number {
  if (hikingHours <= 0) return 0.5;
  // Base 0.5L per hour of alpine ascent
  let litersPerHour = 0.5;
  if (temperatureC > 25) {
    litersPerHour = 0.75;
  } else if (temperatureC < 5) {
    litersPerHour = 0.4;
  }
  const total = Math.max(0.75, hikingHours * litersPerHour);
  return Math.round(total * 10) / 10;
}

/**
 * Estimates energy expenditure in kcal for an average hiker (75kg with 8kg backpack)
 */
export function calculateCaloriesBurned(
  hours: number,
  bodyWeightKg: number = 75,
  packWeightKg: number = 8
): number {
  if (hours <= 0) return 0;
  const totalWeight = bodyWeightKg + packWeightKg;
  // MET 7.3 for mountain hiking with backpack
  const kcalPerHour = 7.3 * 1.05 * (totalWeight / 75) * 65;
  return Math.round(hours * kcalPerHour);
}
