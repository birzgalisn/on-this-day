import babelConfig from './babel.config.js';

/** @type {import('postcss-load-config').Config} */
const postcssConfig = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['./**/*.{js,jsx,ts,tsx}'],
      useCSSLayers: true,
      babelConfig,
    },
    autoprefixer: {},
  },
};

export default postcssConfig;
