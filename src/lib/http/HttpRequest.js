import axios from 'axios';
import { baseUrl, timeout } from '../../../config';
import interceptors from './interceptors';

class HttpRequest {
  constructor() {
    // 由于登录为 其他网址 跳转并携带token 然后 app.js 代码执行 将 token 设置到 localStorage 此为前提 然后才是 页面内部的组件渲染 调用 http请求
    // this.token = localStorage.getItem(SESSION_KEY)
    this.xhr = axios.create(this.getInsideConfig());
    interceptors(this);
  }

  getInsideConfig = () => {
    return {
      baseURL: baseUrl,
      timeout,
      withCredentials: true, // 支持跨站 携带 cookie
      headers: {
        // token: this.token
        // http://wiki.xinc818.com/pages/viewpage.action?pageId=8554302
        // 新增 权限 埋点校验
        'app-code': 'APOLLO', // APOLLO 
        'device-type': isWindows() ? 'WINDOWS' : 'MAC',
      },
      validateStatus: status => {
        // 控制 返回 resolved p  or  rejected p
        return status >= 200 && status < 300;
      },
    };
  };

  request(options) {
    // this.userId || (this.userId = localStorage.getItem(USER_ID))
    return this.xhr(options);
  }
}

export default HttpRequest;

function isWindows() {
  const re = /windows/gi;
  return re.test(navigator.userAgent);
}
