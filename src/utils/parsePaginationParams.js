const parseNumber = (number, defaultNumber) => {
  if (typeof number !== 'string') return defaultNumber;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultNumber;

  return parsedNumber;
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 9);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
