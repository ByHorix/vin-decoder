export const checkIsValid = (str: string): boolean => {
  const validChars = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  return str.split('').every((char) => validChars.includes(char)) && str.length === 17;
};