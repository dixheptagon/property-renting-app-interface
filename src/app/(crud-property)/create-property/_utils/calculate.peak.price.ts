export function calculatePeakPrice(
  basePrice: number,
  peakPricePercentage: number
) {
  if (isNaN(basePrice) || isNaN(peakPricePercentage)) return 0;

  const increase = (peakPricePercentage / 100) * basePrice; // hitung kenaikan
  return Math.round(basePrice + increase); // total harga
}
