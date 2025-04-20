/** @type {import('@vitejs/plugin-react').BabelOptions} */
const babelConfig = {
  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: [
    ['babel-plugin-react-compiler', {}],
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV === 'development',
        test: process.env.NODE_ENV === 'test',
        genConditionalClasses: true,
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: import.meta.dirname,
        },
      },
    ],
  ],
};

export default babelConfig;
