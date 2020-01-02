import qs from 'qs'; // 根据需求是否导入qs模块
import axios from '@/request/httpV2'; // 导入http中创建的axios实例

const sellerURL = {
  sellerList: '/mock/seller',
};

// 获取商家信息
function getSellerList(params) {
  return new Promise((resolve, reject) => {
    axios.get(sellerURL.sellerList, {
      params,
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

export default {
  getSellerList,
};
