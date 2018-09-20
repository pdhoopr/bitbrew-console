module.exports = function buildBabelPreset() {
  const isDevelopmentEnv = process.env.NODE_ENV === 'development';
  const isProductionEnv = process.env.NODE_ENV === 'production';
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
          development: isDevelopmentEnv,
          useBuiltIns: true,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-catch-binding',
      [
        'babel-plugin-styled-components',
        {
          displayName: isDevelopmentEnv,
          pure: true,
        },
      ],
      isProductionEnv && [
        'babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true,
        },
      ],
    ].filter(Boolean),
  };
};
