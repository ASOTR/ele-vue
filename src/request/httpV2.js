import axios from 'axios';
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
import { Toast } from 'vant';

/**
 * vant Toast组件弹出提示
 */
const tips = (msg, duration, forbidClick) => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true,
  });
};
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  // router.replace({
  //   path: '/login',
  //   query: {
  //     redirect: router.currentRoute.fullPath,
  //   },
  // });
};
/* 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tips('登录过期，请重新登录');
      // localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tips('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
};

// 创建axios实例
const instance = axios.create({ timeout: 1000 * 10 });
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 在第一个失败的请求之后重试该请求的次数
instance.defaults.headers.common.retry = 2;
// 在失败的请求之间等待的毫秒数（默认为1）
instance.defaults.headers.common.retryDelay = 1000;


// 拦截请求
instance.interceptors.request.use((config) => {
  // 每次发送请求之前判断vuex中是否存在token
  // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  // const token = store.state.token;
  // token && (config.headers.Authorization = token);
  // return config;
  if (process.env.NODE_ENV === 'development') {
    // console.log(`'拦截请求:'${JSON.stringify(config)}`);
  }
  return config;
}, (error) => {
  Promise.reject(error);
});

// 拦截返回
instance.interceptors.response.use((response) => {
  if (process.env.NODE_ENV === 'development') {
    // console.log(`'拦截返回:'${JSON.stringify(response)}`);
  }
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据;否则的话抛出错误
  if (response.status === 200) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
},
(error) => {
  if (error && error.config.headers.retry) { // 超时重试
    const { config } = error;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.headers.retry) return Promise.reject(error);
    // Set the variable for keeping track of the retry count
    config.headers.__retryCount = config.headers.__retryCount || 0;
    // Check if we've maxed out the total number of retries
    if (config.headers.__retryCount >= config.headers.retry) {
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        tips('请求超时，请检查网络状况稍后重试>_<', 2000);
      }
      return Promise.reject(error);
    }
    // Increase the retry count
    config.headers.__retryCount += 1;
    // Create new promise to handle exponential backoff
    const backoff = new Promise(((resolve) => {
      setTimeout(() => {
        resolve();
      }, config.headers.retryDelay || 1);
    }));
    // Return the promise in which recalls axios to retry the request
    return backoff.then(() => instance(config));
  }
  if (error && error.response && error.response.status) { // 提示错误信息
    errorHandle(error.response.status, error.response.data.message);
  } else if (!window.navigator.onLine) { // 断网处理
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    // store.commit('changeNetwork', false);
    tips('网络已断开，请重新连接网络>_<');
  }
  return Promise.reject(error.response);
});

export default instance;
