const capitalize = (str: string | null | undefined) => {
  if (!str) return "Guest"; // fallback
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default capitalize;
