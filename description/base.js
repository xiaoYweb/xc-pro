/**
 * 1.1 目录结构 
 *  /.env           -->>>   配置 port
 *  /public/        -->>>   存放静态文件 用于直接导入
 *  /src/app.ts     -->>>   运行时配置 
 *  /src/layouts/   -->>>   存放布局文件
 *  /src/pages/document.ejs html 模板
 *  /src/global.css -->>>   全局样式
 * 1.2 配置文件
 *  .umirc 或者 /config/config.ts  
 *  本地临时配置 .umirc.local.ts 或者 /config/config.local.ts  会 合并 默认配置 
 *  多环境配置/config/config.cloud.ts 指定 UMI_ENV=cloud 时会默认 取该配置
 * 
 * 1.3 运行时配置  /src/app.ts
 *  是否 渲染 react  用于权限校验 
 *  export function render(oldRender) { 
 *    oldRender() // 调用后 才会 执行 ReactDom.render
 *  } 
 *  动态修改路由
 *  export function patchRoutes({routes}) { 
 *    merge(routes, extraRoutes); 
 *  }  
 *  路由切换  用于设置标题 用于 404 及 403 跳转
 *  export function onRouteChange({ location, routes, action }) { 
 *    
 *  } 
 *  dva 运行时配置
 *  export const dva = {
      config: {
        onError(err: any) { // 监听 错误 (场景: 可以监听 yeild 后面 返回 reject promise 抛出的错误) 
          err.preventDefault(); //
          console.error(err.message);
        },
      },
    };
 *      
 * 1.4 
 */