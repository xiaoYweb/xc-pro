import { Effect } from 'umi';
import { Reducer } from 'redux';

export interface stateType {
  pageNum: number;
  pageSize: number;
  total: number;
  list: any[];
}

export interface modelType {
  namespace: string;

  state: stateType;

  effects: {
    requestGetList: Effect;
  };

  reducers: {
    updateState: Reducer<stateType>;
  };
}

const model: modelType = {
  namespace: 'search_options',

  state: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    list: [],
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  effects: {
    *requestGetList({ payload }, { call, put }) {
      const { entry, totalRecordSize }: any = yield call(
        getList,
        payload,
      );

      yield put({
        type: 'updateState',
        payload: {
          list: entry || [],
          total: +totalRecordSize,
        },
      });
    },
  },
};

export default model;

function getList() {
  const list = []
  for (let i = 0; i < 10; i++) {
    const n = i + 1;
    list.push({
      id: n,
      key1: `XXXXX名称 ${n}`,
      key3: `xxxx编号 ${n}`,
      type: Math.random() - 0.5 > 0 ? 1 : 2,
      gmtCreate: Date.now(),
      creator: `创建人 ${n}`,
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
