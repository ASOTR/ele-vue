import axios from 'axios';
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
import { Toast } from 'vant';

// axios 的全局设置：baseURL环境切换
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'http://localhost:8090';
} else if (process.env.NODE_ENV === 'debug') {
  // axios.defaults.baseURL = 'https://www.ceshi.com';
} else if (process.env.NODE_ENV === 'production') {
  // axios.defaults.baseURL = 'https://www.production.com';
}
// 请求超时
axios.defaults.timeout = 10000;
// 添加超时重试
axios.defaults.headers.common.retry = 2;// 在第一个失败的请求之后重试该请求的次数
axios.defaults.headers.common.retryDelay = 1000;// 在失败的请求之间等待的毫秒数（默认为1）

// 默认请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 拦截请求
axios.interceptors.request.use((config) => {
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
axios.interceptors.response.use((response) => {
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
        Toast({
          message: '请求超时，请检查网络状况稍后重试>_<',
          duration: 2000,
          forbidClick: true,
        });
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
    return backoff.then(() => axios(config));
  }
  if (error && error.response && error.response.status) { // 提示错误信息
    switch (error.response.status) {
      // 401: 未登录:未登录则跳转登录页面，并携带当前页面的路径;在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        // router.replace({
        //   path: '/login',
        //   query: {
        //     redirect: router.currentRoute.fullPath,
        //   },
        // });
        break;
      // 403 token过期:登录过期对用户进行提示;清除本地token和清空vuex中token对象;跳转登录页面
      case 403:
        Toast({
          message: '登录过期，请重新登录',
          duration: 1000,
          forbidClick: true,
        });
        // 清除token
        // localStorage.removeItem('token');
        // store.commit('loginSuccess', null);
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        // setTimeout(() => {
        //   router.replace({
        //     path: '/login',
        //     query: {
        //       redirect: router.currentRoute.fullPath,
        //     },
        //   });
        // }, 1000);
        break;
      // 404提示请求不存在
      case 404:
        Toast({
          message: '网络请求不存在',
          duration: 1500,
          forbidClick: true,
        });
        break;
      // 其他错误，直接抛出错误提示
      default:
        Toast({
          message: error.response.data.message,
          duration: 1500,
          forbidClick: true,
        });
    }
  }
  return Promise.reject(error.response);
});

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
