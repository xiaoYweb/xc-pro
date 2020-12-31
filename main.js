/**
 *  用于配合 线上部署 执行文件内部命令
 *  线上命令 env=daily publicPath=./ npm run build;
 *  前段部署 只有 dev daily gray  
 *  线上 没传 env 为 undefined 默认为 prod
 */
const child_process = require('child_process')

const env = process.env.env || 'prod';
// console.log("env", env, typeof env) 

child_process.exec(`npm run ${env}`)

