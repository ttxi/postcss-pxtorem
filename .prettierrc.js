const fabric = require('@umijs/fabric');

module.exports = {
  // singleQuote: true,
  // trailingComma: 'none',
  // printWidth: 80,
  // overrides: [
  //   {
  //     files: '.prettierrc',
  //     options: { parser: 'json' },
  //   },
  // ],
  // tabWidth: 2,
  // semi: false,
  // quoteProps: 'as-needed',
  // jsxSingleQuote: false,
  // bracketSpacing: true,
  // bracketSameLine: false,
  // arrowParens: 'avoid',
  ...fabric.prettier,
};
