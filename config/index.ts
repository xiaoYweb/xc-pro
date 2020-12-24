console.log(
  'slot_login_url --> ',
  //@ts-ignore
  process.slot_login_url,
  'slot_api_url --> ',
  //@ts-ignore
  process.slot_api_url,
);

export const isDev = process.env.NODE_ENV === 'development';

export const needAuth = true; // 是否开启 权限功能 // app.ts routesAuthorization.ts

export const needProxy = false; // 是否开启 代理 (如果采用 cookie 校验  需要 token 设置到本站点的cookie中 )

export const allowToLogin = true; // token 失效/过期/未登录 是否允许跳转 登录页

export const needTab = true; // 是否开启 导航页

export const needSessionStorage = true; // 是否开启 sessionStorage 缓存 待开发

export const targetUrl = 'https://api.daily.xinc818.net/'; // 接口目标 url

export const timeout = 10 * 1000; // 接口请求最大时间

// export const loginUrl = process.slot_login_url; // 跳转 登录  url  (slot_login_url 打包时 动态插入变量申明并赋值)
export const loginUrl = isDev
  ? 'https://daily.xinc818.net/sso-system/'
  : //@ts-ignore
    process.slot_login_url; //

// 项目线上的 接口地址    所以 接口的 baseUrl 在 线上 默认为指定 url
// export const baseUrl = isDev ? (needProxy ? '/' : targetUrl) : '/';
export const baseUrl = isDev
  ? needProxy
    ? '/'
    : targetUrl
  : //@ts-ignore
    process.slot_api_url;

// const mapApiUrl = {
//   daily: 'https://api.daily.xinc818.net/',
//   dev: 'https://api.dev.xinc818.net/',
//   gray: 'https://api.gray.xinc818.net/',
//   prod: 'https://api.xinc818.net/',
// }

// const mapLoginUrl = {
//   daily: 'https://daily.xinc818.net/sso-system/',
//   dev: 'https://dev.xinc818.net/sso-system/',
//   gray: 'https://gray.xinc818.net/sso-system/',
//   prod: 'https://gaea.xinc818.net/',
// }
