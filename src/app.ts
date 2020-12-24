import { getAuthList, getUserInfo } from '@/services/user';
// import routesAuthorization from '@/utils/routesAuthorization';
// import { navToNotAuthPage } from '@/utils';
import { needAuth, isDev } from '../config';

let authList: any = [];



// 运行时配置
/**
 * 可用用于校验是否登录  (仅执行一次 优先级 1)
 * @param oldRender
 */
export async function render(oldRender: Function) {
  const { entry } = await getUserInfo().catch(() => ({}))
  if (entry) {
    const loginName = entry?.name;
    const userId = entry?.userInfo?.userId;
    // @ts-ignore
    window._userInfo = { loginName, userId, userName: loginName }
  }


  if (!needAuth) return oldRender();
  getAuthList({ appCode: 'APOLLO' }).then(({ entry }: any) => {
    isDev && console.log('getRoutes -- ', entry?.children);
    authList = entry?.children || [];
    oldRender();
  }).catch(() => {
    oldRender();
  });
}