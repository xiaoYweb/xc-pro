import { defineConfig } from 'umi';
import routes from './routes';
import theme from './theme';


export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  publicPath: process.env.publicPath || '/',
  routes,
  theme,
  define: {
    'process.slot_login_url': 'https://dev.xinc818.net/sso-system/',
    'process.slot_api_url': 'https://api.dev.xinc818.net/',
  },
});
