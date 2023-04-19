import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [{ path: '/', component: '@/pages/index' }],
  routes: [{ path: '/', component: '@/pages/home/index' }],
  fastRefresh: {},
  define: {
    'process.env.publicPath': process.env.publicPath || '/',
  },
  dva: {
    hmr: true,
  },
});
