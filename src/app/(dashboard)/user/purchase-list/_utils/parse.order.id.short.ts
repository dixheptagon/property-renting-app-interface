/**
 * Parse order ID menjadi format: ORDER-e99
 * Contoh: "ORDER-38980677-d871-4a7d-9d1e-f32967494e99" → "ORDER-e99"
 */
export function parseOrderIdShort(orderId: string): string {
  if (!orderId || typeof orderId !== "string") {
    return "ORDER-???";
  }

  // Pastikan dimulai dengan "ORDER-"
  const prefix = orderId.startsWith("ORDER-") ? "ORDER-" : "ORDER-";

  // Ambil 3 karakter terakhir
  const lastThree = orderId.slice(-3);

  // Gabungkan
  return `${prefix}${lastThree}`;
}
