import qs from 'qs'; // 根据需求是否导入qs模块
import axios from '@/request/httpV2'; // 导入http中创建的axios实例

const goodsURL = {
  goodsList: '/mock/seller',
};

// 获取商品信息
function getGoodsList(params) {
  return new Promise((resolve, reject) => {
    axios.get(goodsURL.goodsList, {
      params,
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

export default {
  getGoodsList,
};
