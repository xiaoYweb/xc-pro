//@ts-ignore
import { get } from '@/lib/http';

// 获取 用户信息
export async function getUserInfo() {
  return get('/iam/home/userInfo');
}

// 用户 退出登录
export async function logout() {
  return get('/iam/passport/logout');
}

// 获取 权限列表
export async function getAuthList(params: { appCode: string }) {
  const url = '/iam/home/menu';
  return get(url, params);
}
