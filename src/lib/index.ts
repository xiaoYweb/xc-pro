export const debounce = (fn: Function, delay = 300) => {
  let timer: any;
  return function func(...r: any[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, r);
    }, delay);
  };
};

export const throttle = (fn: Function, wait = 300) => {
  let lastTime = 0;
  return function(...r: any[]) {
    let currentTime = Date.now();
    if (currentTime - lastTime < wait) return;
    lastTime = currentTime;
    // @ts-ignore
    fn.apply(this, r);
  };
};

export const sleep = (time = 300) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}