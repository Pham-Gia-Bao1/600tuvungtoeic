export const formatMessage = (text: string): string => {
  // Markdown, links, etc.
  return text.replace(/\n/g, '<br />');
};

export const truncateText = (text: string, max: number): string => {
  return text.length > max ? `${text.slice(0, max)}...` : text;
};