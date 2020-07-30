//创建服务器
var express=require('express')
var app=express()
app.listen(4000)
//引入路由模块
var router=require('./router')
//设置模板引擎
app.set('view engine','ejs')
//引入silly-datetime模块

//设置post请求的解析方式
app.use(express.urlencoded({extended:true}))
//设置静态资源文件的根目录
app.use(express.static('./public'))

//处理 /请求 渲染index.ejs页面
app.get('/',function(req,res){
  res.render('index')
})

//处理/message开头的请求  交由路由文件来处理
app.use('/message',router.message)

//处理其他错误地址的请求
app.use(function(req,res){
  res.render('error',{errMsg:'地址错误'})
})