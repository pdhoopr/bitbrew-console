module.exports = () => {
  const { NODE_ENV } = process.env;
  const isDev = NODE_ENV === 'development';
  const isTest = NODE_ENV === 'test';
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isTest ? 'commonjs' : false,
          targets: isTest ? { node: 'current' } : {},
          useBuiltIns: 'usage',
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
      [
        'babel-plugin-styled-components',
        {
          displayName: isDev,
        },
      ],
    ],
  };
};
