import { Effect, Reducer } from 'umi';
import { sleep } from '@/lib';

/**
 * 全局 模糊点选 搜索列表
 */

export interface StateType {}

export interface ModelType {
  namespace: 'search';

  state: {};

  effects: {
    requestUsernameList: Effect;
  };

  reducers: {
    updateState: Reducer<StateType>;
  };
}

const model: ModelType = {
  namespace: 'search',

  state: {},

  effects: {
    // --------------------------------------- 输入模糊搜索 请求 -----------------------------------------------------
    // 用户名称 模糊搜索 请求参数 nickName
    *requestUsernameList({ payload, success }, { call }) {
      const { entry }: any = yield call(searchUsernameList, payload)
      yield sleep(200) // 请求响应100ms 内 无法显示 loading 动画 顾延迟 200 毫秒响应
      success && success(entry || []) // status === true 约定 entry 一定有返回 不过此处还是坐下处理
    },
    
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
}

export default model;
let n = 0;
function searchUsernameList() {
  const list: any[] = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      id: ++n,
      nickName: `用户名称 ${n}`,
      userId: `用户编号 ${n}`,
    })
  }
  return api(list)
}

function api(params: any[]) {
  return new Promise(res => {
    setTimeout(() => {
      res({
        entry: params,
        totalRecordSize: 10
      })
    }, 500);
  })
}
