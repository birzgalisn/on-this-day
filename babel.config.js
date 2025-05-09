import path from 'node:path';

/** @type {import('@vitejs/plugin-react').BabelOptions} */
const babelConfig = {
  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: [
    ['babel-plugin-react-compiler', {}],
    ['@babel/plugin-syntax-typescript', { isTSX: true }],
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV !== 'production',
        treeshakeCompensation: true,
        aliases: {
          '~/*': [path.join(import.meta.dirname, 'src/*')],
        },
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: import.meta.dirname,
        },
      },
    ],
  ],
};

export default babelConfig;
