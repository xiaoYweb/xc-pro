import HttpRequest from './HttpRequest';
import { message as msg } from 'antd';

const http = new HttpRequest();

export const get = (url, params, config) => {
  const options = {
    method: 'get',
    url,
    params,
    ...config,
  };
  return http.request(options).then(thenCallback);
};

export const post = (url, data, config) => {
  const options = {
    method: 'post',
    url,
    data,
    ...config,
  };
  return http.request(options).then(thenCallback);
};

export const requestExcel = (url, data, config) => {
  const options = {
    method: 'post',
    url,
    data,
    responseType: 'blob',
    ...config,
  };
  return http.request(options);
};

function thenCallback(res) {
  const { status, message } = res;
  if (!status) {
    msg.error(message || '请求失败');
    return Promise.reject({}); //
  }
  return res;
}
