module.exports = function buildBabelPreset() {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
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
