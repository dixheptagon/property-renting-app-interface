export const getTotalNights = (
  checkInDate: Date | undefined,
  checkOutDate: Date | undefined
) => {
  if (!checkInDate || !checkOutDate) return "N/A";

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const diffInDays = Math.round(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
  );
  return diffInDays;
};
