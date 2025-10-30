export const formatToIDR = (value: number | string) => {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(Number(value))
    .replace("Rp", "Rp "); // biar ada spasi
};
