import { defineConfig } from 'umi';
import routes from './routes';
import theme from './theme';
import proxy from './proxy';
import { needProxy } from './index';


// 默认配置
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  publicPath: process.env.publicPath || '/',
  routes,
  theme,
  proxy: needProxy ? proxy : undefined,
  define: {
    'process.slot_login_url': 'https://dev.xinc818.net/sso-system/',
    'process.slot_api_url': 'https://api.dev.xinc818.net/',
  },
});
