const express=require('express')
const router=express.Router();
const dB = require('../model/db.js')
const {Msg}=require('../model/Schemas.js')//引入数据连接的模块
const sd=require('silly-datetime')//引入silly-datetime
//处理post 发送的/message 请求
router.post('/',function(req,res){
  var username =req.body.username
  var message=req.body.message
  var date=sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
  var o=new Msg({
    username:username,
    message:message,
    time:date
  })
  dB.savedate(o,function(err,result){
    if(err){
      console.log(err)
      res.render('error',{errMsg:'数据存储失败'})
      return ;
    }
    // console.log(result)  存储成功 result非空
    if(result.length==0){//存储失败
      res.render('error',{errMsg:'留言存储失败'})
    }else{//留言存储成功  查找数据库的数据 把所有留言显示出来
      dB.finddate(Msg,{},function(err,docs){
        if(err){
          console.log(err)
          res.render('error',{errMsg:'数据查询失败'})
          return ;
        }
        //查询成功
        if(docs.length==0){
          res.render('error',{errMsg:'数据为空'})
          return ;
        }else{//数据不为空
          res.render('message',{docs:docs})
        }
      
      }) 
      
    }   
  })
})
//处理ajax以post方式发送过来的/message/edit请求
router.post('/edit',function(req,res){
  var username =req.body.username
  var message=req.body.message
  var docs={
    username:username,
    message:message
  }
  res.render('edit',{docs:docs})
})








//暴露路由
module.exports=router;