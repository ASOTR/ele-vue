let express = require('express');   //引入express
import Mock from "mockjs"; // 引入mockjs
import seller from "./seller";

const path = require('path'); //系统路径模块
const fs = require('fs'); //文件模块

// 直接读取json文件并返回数据
const file = path.resolve(__dirname,"./data.json");
let dataJson = null;
fs.readFile(file,'utf-8',function(err,data){
  if (err) {
    console.log("mock数据读取json文件失败");
  } else {
    dataJson = JSON.parse(data);
  }
});


let app = express();        //实例化express
// app.all('*',function(req, res, next) { // 设置允许跨域
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });

const mock_URL = {
  getSeller : "/mock/seller",
  getGoods :"/mock/goods",
  getRatings : "/mock/ratings"
}
const delay = Math.random()*400+1000;
// 接口
app.use(mock_URL.getSeller,function(req, res){
  setTimeout(()=>{
    //res.json(Mock.mock(seller.mock_seller()));
    res.json({
      code: 0,
      data: dataJson.seller
    });
  },delay);
})

app.use(mock_URL.getGoods,function(req, res){
  setTimeout(()=>{
    //res.json(Mock.mock(goods.mock_goods()));
    res.json({
      code: 0,
      data: dataJson.goods
    });
  },delay);
})

app.use(mock_URL.getRatings,function(req, res){
  setTimeout(()=>{
    //res.json(Mock.mock(ratings.mock_ratings()));
    res.json({
      code: 0,
      data: dataJson.ratings
    });
  },delay);
})


app.listen('8090', () => {
  console.log('mock监听端口：8090')
})

