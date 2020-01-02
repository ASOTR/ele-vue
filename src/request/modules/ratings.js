import qs from 'qs'; // 根据需求是否导入qs模块
import axios from '@/request/httpV2'; // 导入http中创建的axios实例

const ratingsURL = {
  ratingsList: '/mock/seller',
};

// 获取排行信息
function getRatingsList(params) {
  return new Promise((resolve, reject) => {
    axios.get(ratingsURL.ratingsList, {
      params,
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

export default {
  getRatingsList,
};
