import Mock from "mockjs"; // 引入mockjs
const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

/**
 * Mock.mock( rurl, rtype, function( options ) )
 *   =》Mock.mock( mock_URL.getSeller, "GET", seller( params ) )
 * @param params
 */
const mock_seller = function (params) {
  let list = [];

  const mock_template  = {
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
  }

  const mockData = Mock.mock(mock_template);

  list.push(mockData);
  return list;
};

export default {
  mock_seller,
};
