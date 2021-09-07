export const capitalizeToWhiteSpace = (str: string): string => {
  if (typeof str === 'string') {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }

  return str;
};
