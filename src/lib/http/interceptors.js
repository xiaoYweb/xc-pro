/* eslint-disable no-param-reassign */
import axios from 'axios';
import { notification } from 'antd';
import { navToLogin } from '@/utils';

const HTTP_STATUS_TEXT = {
  401: '您还没有登录', // 您还没有登录
  403: '没有权限访问', // 没有权限访问
  404: '请求资源不存在', // 请求资源不存在
  502: '服务端出现了问题', // 服务端出现了问题
};

function interceptors(instance) {
  const { xhr } = instance;
  xhr.interceptors.request.use(
    requestConfig => {
      const { method } = requestConfig;
      const re = /put|post|patch/; // 这3中请求方式 使用data字段
      // get post 请求参数中加入 这个operator 操作人 参数
      if (re.test(method)) {
        if (requestConfig.data instanceof FormData) {
          return requestConfig
        }
        const payload = { ...requestConfig.data };
        requestConfig.data = {
          ...handleParamsStringTrim(payload),
          // operator
        }; // 可能为 undefined 为此需如此赋值
      } else {
        const payload = { ...requestConfig.params };
        requestConfig.params = {
          ...handleParamsStringTrim(payload),
          // operator
        };
      }

      return requestConfig;
    },
    err => {
      notification.error({
        message: '请求发生未知错误',
        description: '这可能是个兼容问题，请升级您的浏览器',
      });
      return Promise.reject(err);
    },
  );

  xhr.interceptors.response.use(
    res => {
      // console.log('res---', res)
      validateToken(res.data);
      return res.data;
    },
    err => {
      const { response } = err;
      if (axios.isCancel(err)) {
        notification({
          message: '请求被取消',
          description: err.message || '您取消了这次网络请求',
        });
      } else if (response && response.status) {
        const {
          status,
          statusText,
          config: { url },
        } = response;
        if (status === 401) {
          //
        }
        const errorText = HTTP_STATUS_TEXT[status] || statusText;

        notification.error({
          message: `请求错误 [${status}: ${url}]`,
          description: errorText,
        });
      } else if (!response) {
        // console.log('err', err, err?.message, Object.entries(err))
        // 跨域错误 或者 访问不存在的服务
        notification.error({
          message: '网络异常',
          description: err?.message || '您的网络发生异常，无法连接服务器',
        });
      }

      return Promise.reject(err);
    },
  );
}

export default interceptors;

/**
 * const HTTP_STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    CLIENT_ERROR: 400,
    AUTHENTICATE: 401, // 您还没有登录
    FORBIDDEN: 403, // 没有权限访问
    NOT_FOUND: 404, // 请求资源不存在
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502, // 服务端出现了问题
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  };
 */

/**
 * post put patch --- data
 * other          --- params
 */

function handleParamsStringTrim(payload) { // 针对 传参对象 第一层的value === sting 的 做 trim 处理
  const res = {}
  Object.keys(payload).forEach(key => {
    const val = payload[key];
    // 过滤 空字符串 及 null 值 
    if (val === null || val === '') return 
    if (typeof val === 'string') {
      res[key] = val.trim()
      return
    }
    res[key] = val;
  })
  return res;
}

function validateToken(data) {
  // 检验 token 是否失效 / 过期 或者 未登陆 / 未携带 token
  // console.log('validateToken -> data', data);
  try {
    const { responseCode, status } = data;
    if (status) return; // true 为成功返回 不做校验
    if (String(responseCode) === '1000010001') {
      // 1000010001 登陆状态失败  未携带 token
      console.log("validateToken -> 登陆状态失败")
      navToLogin();
    }
    if (String(responseCode) === '1000040003') {
      // 1000040003 token 失效 / 过期
      navToLogin();
    }
  } catch (err) {
    console.log('validateToken err 返回的数据格式 非对象', err);
  }
}
