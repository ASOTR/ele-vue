import Mock from "mockjs"; // 引入mockjs
import seller from "./seller";

/**
 * mock方式一：支持在组件中按需import引入mock.js文件,然后axios请求mock数据
 * 方式二：nodeJs开启本地server服务：npm run mock 调用node mock_server_start.js
 */

const mock_URL = {
  getSeller : "/mock/seller",
  getGoods :"/mock/goods",
  getRatings : "/mock/ratings"
}
// mock data
// const seller_list = Mock.mock(seller.mock_seller());

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: '500-1000'
});
// mock 拦截ajax请求
Mock.mock(/\/mock\/seller/, seller.mock_seller());
