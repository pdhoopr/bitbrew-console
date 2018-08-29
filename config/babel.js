module.exports = function buildBabelPreset() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
        },
      ],
      [
        '@babel/preset-react',
        {
          development: !isProd,
          useBuiltIns: true,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-catch-binding',
      '@babel/plugin-syntax-dynamic-import',
      [
        'babel-plugin-styled-components',
        {
          displayName: !isProd,
        },
      ],
      isProd && [
        'babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true,
        },
      ],
    ].filter(Boolean),
  };
};
