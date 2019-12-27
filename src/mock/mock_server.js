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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const mock_URL = {
  getSeller : "/mock/seller",
  getGoods :"/mock/goods",
  getRatings : "/mock/ratings"
}
// 接口
app.use(mock_URL.getSeller,function(req, res){
  setTimeout(()=>{
    //res.json(Mock.mock(seller.mock_seller()));
    res.json(dataJson.seller);
  },Math.random()*400+200);
})

app.use(mock_URL.getGoods,function(req, res){
  setTimeout(()=>{
    //res.json(Mock.mock(seller.mock_seller()));
    res.json(dataJson.goods);
  },Math.random()*400+200);
})

app.use(mock_URL.getRatings,function(req, res){
  setTimeout(()=>{
    //res.json(Mock.mock(seller.mock_seller()));
    res.json(dataJson.ratings);
  },Math.random()*400+200);
})


app.listen('8090', () => {
  console.log('mock监听端口 8090')
})

