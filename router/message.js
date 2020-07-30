const express=require('express')
const router=express.Router();
const dB = require('../model/db.js')
const {Msg}=require('../model/Schemas.js')//引入数据连接的模块
const sd=require('silly-datetime')//引入silly-datetime
const fs=require('fs');//引入文件模块
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
//处理get 发送的/message请求  确认修改成功之后的页面跳转 
router.get('/',function(req,res){
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
})
//处理ajax以post方式发送过来的/message/edit请求
router.post('/edit',function(req,res){
  var username =req.body.username
  var message=req.body.message
  var time=req.body.time
  var docs={
    username:username,
    message:message,
    time:time
  }
  docs=JSON.stringify(docs)//把前端ajax请求发送过来的数据转化成字符串
  fs.writeFileSync('temp.txt',docs)//把字符串保存到temp.txt文件当中
  res.send('数据已经保存到temp.txt中')
  /* dB.finddate(Msg,docs,function(err,docs){
    if(err){
      console.log(err)
      res.render('error',{errMsg:"数据库查询留言失败"})
      return ;
    }
    //查询成功
    if(docs.length!=0){
      fs.writeFileSync('temp.txt',docs)//把前端ajax请求发送过来的数据保存到temp.txt文件当中
    }
    res.render('error',{errMsg:"数据库无此留言"})
  }) */
});
//处理get方式的/message/edit
router.get('/edit',function(req,res){
  //读取temp.txt存储的数据 
  var liuyan=fs.readFileSync('temp.txt','utf8')//字符串
  var docs=JSON.parse(liuyan)
  // console.log(typeof docs)
  res.render('edit',{docs:docs})
})
//处理post方式的/message/modify
router.post('/modify',function(req,res){
  var liuyan=fs.readFileSync('temp.txt','utf8')//字符串
  var filter=JSON.parse(liuyan);
  date={
    message:req.body.message
  }
  dB.update(Msg,filter,date,function(err,docs){
    if(err){
      console.log(err)
      res.render('error',{errMsg:"数据库内容修改失败"})
      return ;
    }
    //修改成功
    if(docs.nModified==1){//修改成功
      res.send('数据已经修改成功')
    }else{
      res.render('error',{errMsg:'数据库留言修改失败'})
    }
  })
})
//处理post方式的/message/delete请求
router.post('/delete',function(req,res){
  dB.del(Msg,req.body,function(err){
    if(err){
      console.log(err)
      res.render('error',{errMsg:"数据库删除操作访问失败"})
      return ;   
    }
    //删除成功
    res.send('删除成功')
  })
})




//暴露路由
module.exports=router;