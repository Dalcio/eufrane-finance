module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            components: './src/components',
            'components/*': './src/components/*',
            constants: './src/constants',
            'constants/*': './src/constants/*',
            hooks: './src/hooks',
            'hooks/*': './src/hooks/*',
            navigation: './src/navigation',
            'navigation/*': './src/navigation/*',
            screens: './src/screens',
            'screens/*': './src/screens/*',
            assets: './src/assets',
            'assets/*': './src/assets/*',
            store: './src/store',
            'store/*': './src/store/*',
            theme: './src/theme',
            'theme/*': './src/theme/*',
            'services/*': './src/services/*',
            'api/*': './src/api/*',
          },
        },
      ],
    ],
  };
};
