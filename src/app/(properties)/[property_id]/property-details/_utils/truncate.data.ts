const truncateTitle = (text: string, maxLength = 35) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const truncateAddress = (text: string, maxLength = 85) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const truncateDescription = (text: string, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export { truncateTitle, truncateAddress, truncateDescription };
