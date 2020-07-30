var mongoose=require('mongoose')
//创建Schema
var messageSchema=new mongoose.Schema({
  username:String,
  message:String,
  time:String 
})
//创建对应的model
var Msg=mongoose.model('message',messageSchema)
//连接数据库
var url='mongodb://localhost:27017/web'
var opt={useNewUrlParser:true,useUnifiedTopology:true}
mongoose.connect(url,opt);

//暴露出去
module.exports={
  Msg:Msg
}
