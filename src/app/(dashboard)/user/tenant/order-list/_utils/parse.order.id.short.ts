/**
 * Parse order ID menjadi format: ORDER-e99
 * Contoh: "ORDER-38980677-d871-4a7d-9d1e-f32967494e99" → "ORDER-e99"
 */
export function parseOrderIdShort(orderId: string): string {
  if (!orderId || typeof orderId !== "string") {
    return "#N/A";
  }

  // Pastikan dimulai dengan "ORDER-"
  const prefix = "#";

  // Ambil 3 karakter terakhir
  const lastFive = orderId.slice(-5);

  // Gabungkan
  return `${prefix}${lastFive}`;
}
