import moment from 'moment';
import { history } from 'umi';
import { loginUrl, allowToLogin, isDev } from '../../config';

// excel类型 {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}
// application/vnd.ms-excel
export const downloadBlobFile = (data: any, fileName?: string) => {
  const blob = new Blob([data], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
  });
  const href = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  const date = moment().format('YYYY-MM-DD');
  a.download = `${date}_${fileName || 'file'}.xls`; // 自定义文件名
  a.click();
  window.URL.revokeObjectURL(href); // 移除链接对象
};

export const navTo = (url: string) => {
  // 之后 可能统一 跳转新页面
  url && history.push(url);
};

export const getWarehouseId = () => {
  // 获取仓库 id
  return '1263670673727401985';
};

export const HandleDateRange = ([start, end]: [any, any]) => {
  // 处理 日期区间 (时分秒)
  const DATE_FORMAT = 'YYYY-MM-DD';
  return [
    `${start.format(DATE_FORMAT)} 00:00:00`,
    `${end.format(DATE_FORMAT)} 23:59:59`,
  ];
};

export const encode = (str: string) => {
  try {
    return encodeURIComponent(str)
  } catch (err) {
    console.log('encode err', err)
    return str;
  }
}

export const decode = (str: string) => {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    console.log('decode err', err)
    return str;
  }
}

// 统一跳转 登录
export const navToLogin = () => {
  if (!loginUrl) return
  if (isDev && !allowToLogin) return; // 开发环境 && 不允许跳登录 
  const a = document.createElement('a');
  let currentUrl = window.location.href;
  const href = `${loginUrl}#/user/login?redirect=${encode(currentUrl)}`
  a.href = href;
  a.click();
};

export const navToNotAuthPage = () => {
  history.replace('/403');
};

export const navToNotFoundPage = () => {
  history.replace('/404');
};



export const FormatTime = (time: any, format: string = "YYYY-MM-DD") => {
  return time ? moment(time).format(format) : '-';
}


// 下载 通过连接 下载文件
export const downloadFileByUrl = (href: string) => {
  if (!href) return
  let a: any = document.createElement('a')
  a.href = href;
  a.click();
  a = null;
}

export const retDate = (timestamp?: string, format?: string) => {
  if (!timestamp) return '';
  return moment(new Date(timestamp)).format(format || 'YYYY-MM-DD')
}

// 分转元  默认保留2位
export const formatMoney = (number: number, n = 2) => {
  if (typeof number !== 'number') return '';
  const res = number / Math.pow(10, 2)
  return res.toFixed(n)
}
