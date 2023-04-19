const escapeURLBracket = (url) => {
  return url.replace(/\(/g, '%28').replace(/\)/g, '%29').trim();
};

const unescapeURLBracket = (url) => {
  return url.replace(/%28/g, '(').replace(/%29/g, ')').trim();
};

export default {
  escapeURLBracket,
  unescapeURLBracket,
};

export { escapeURLBracket, unescapeURLBracket };
