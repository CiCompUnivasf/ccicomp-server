export const capitalizeToWhiteSpace = (str: string): string => {
  if (typeof str === 'string') {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }

  return str;
};

export const DEFAULT_ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const randomString = (
  size: number,
  alphabet: string = DEFAULT_ALPHABET,
): string => {
  let result = '';

  for (let i = size; i > 0; --i) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return result;
};
