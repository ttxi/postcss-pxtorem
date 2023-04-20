import { defineConfig } from 'umi';

const pxtorem = require('postcss-pxtorem');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [{ path: '/', component: '@/pages/index' }],
  routes: [{ path: '/', component: '@/pages/home/index', title: '首页' }],
  fastRefresh: {},
  define: {
    'process.env.publicPath': process.env.publicPath || '/',
  },
  dva: {
    hmr: true,
  },
  mfsu: {},
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      // unitPrecision: 5,
      propList: ['*'],
      // selectorBlackList: [],
      // replace: true,
      // mediaQuery: false,
      // minPixelValue: 0,
      // exclude: /node_modules/i,
    }),
  ],
});
