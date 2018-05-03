module.exports = function configureBabel() {
  const isTest = process.env.NODE_ENV === 'test';
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isTest ? 'commonjs' : false,
          targets: isTest ? { node: 'current' } : {},
          useBuiltIns: 'entry',
        },
      ],
      [
        '@babel/preset-react',
        {
          development: true,
          useBuiltIns: true,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      'babel-plugin-styled-components',
    ],
  };
};
