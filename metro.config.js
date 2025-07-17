const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { resolver: defaultResolver } = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    // Ajout pour le support des assets (polices)
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    ...defaultResolver,
    assetExts: [...defaultResolver.assetExts.filter(ext => ext !== 'svg'), 
      // Ajout des extensions de polices
      'ttf',
      'otf',
      'woff',
      'woff2'
    ],
    sourceExts: [...defaultResolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);