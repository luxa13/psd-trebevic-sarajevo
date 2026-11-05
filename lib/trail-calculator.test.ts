import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateHikingTimeHours,
  formatHikingTime,
  calculateAverageGrade,
  classifyDifficulty,
  calculateRecommendedWaterLiters,
  calculateCaloriesBurned,
} from './trail-calculator.ts';

test('calculateHikingTimeHours calculates correct time with Naismith rule', () => {
  // 8.4 km hike with 600m ascent: 8.4/4 = 2.1h, 600/500 = 1.2h -> 3.3h
  const time = calculateHikingTimeHours(8.4, 600, 100);
  assert.equal(time, 3.3);
});

test('calculateHikingTimeHours handles zero distance', () => {
  assert.equal(calculateHikingTimeHours(0, 0), 0);
});

test('formatHikingTime formats hours and minutes properly', () => {
  assert.equal(formatHikingTime(2.5), '2h 30m');
  assert.equal(formatHikingTime(3.0), '3h');
  assert.equal(formatHikingTime(0.75), '45 min');
  assert.equal(formatHikingTime(0), '0 min');
});

test('calculateAverageGrade computes slope percentage', () => {
  // 600m gain over 6 km (6000m) -> 10%
  assert.equal(calculateAverageGrade(6.0, 600), 10);
  assert.equal(calculateAverageGrade(0, 500), 0);
});

test('classifyDifficulty categorizes trails correctly', () => {
  assert.equal(classifyDifficulty(3.2, 180), 'Lako');
  assert.equal(classifyDifficulty(7.5, 480), 'Umjereno');
  assert.equal(classifyDifficulty(12.0, 850), 'Zahtjevno');
  assert.equal(classifyDifficulty(18.0, 1300), 'Vrlo zahtjevno');
});

test('calculateRecommendedWaterLiters adjusts for hours and temp', () => {
  // 3 hours at 20C -> 1.5L
  assert.equal(calculateRecommendedWaterLiters(3, 20), 1.5);
  // 3 hours at 30C hot summer -> 2.25L -> 2.3L
  assert.equal(calculateRecommendedWaterLiters(3, 30), 2.3);
  // zero hours returns minimum safe reserve 0.5L
  assert.equal(calculateRecommendedWaterLiters(0), 0.5);
});

test('calculateCaloriesBurned computes reasonable caloric burn for hiking', () => {
  const calories = calculateCaloriesBurned(3.5, 75, 8);
  assert.ok(calories > 1500 && calories < 2500, `Calories ${calories} should be between 1500 and 2500`);
});
