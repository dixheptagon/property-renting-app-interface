const truncateReply = (text: string, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const truncateComment = (text: string, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export { truncateReply, truncateComment };
