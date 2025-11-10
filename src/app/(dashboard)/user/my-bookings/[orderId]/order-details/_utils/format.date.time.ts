// utils/formatDate.js

export function formatDateTime(isoString: Date | undefined) {
  if (!isoString) return;

  const date = new Date(isoString);

  // Options untuk bagian tanggal
  const dayName = date.toLocaleString("en-US", { weekday: "short" });
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  // Ambil jam, menit, detik dalam 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // ubah 0 jadi 12 untuk format 12-hour
  const formattedTime = `${hours}.${minutes}.${seconds} ${ampm}`;

  return `${dayName}, ${monthName} ${day} ${year}, ${formattedTime}`;
}
