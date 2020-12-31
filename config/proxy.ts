/**
 * 本地开发 接口代理 配置
 */
import { targetUrl } from './index';

export default {
  // 账户中心
  '/iam': {
    target: targetUrl,
    changeOrigin: true,
  },
};
