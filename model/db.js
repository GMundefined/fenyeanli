//增
/**
 * @method 向数据库保存数据的方法
 * @param {Object[]} o 需要保持的数据实例对象 
 * @param {Function} callback 回调函数
 */
exports.savedate=function(o,callback){
  o.save(function(err,docs){
    callback(err,docs)
  })
}
//查
/**
 * @method 向指定的medel查询对应的数据库的数据
 * @param {*} Msg medel的名字
 * @param {*} filter 过滤器 查询的条件
 * @param {Function} callback  回调函数
 */
exports.finddate=function(Msg,filter,callback){
  Msg.find(filter,null,function(err,docs){
    callback(err,docs)
  })
}
//改
/**
 * @method 修改数据库的对应数据的数据
 * @param {*} Msg 集合model
 * @param {*} filter 过滤的条件
 * @param {*} date  修改的数据
 * @param {*} callback  回调函数
 */
exports.update=function(Msg,filter,date,callback){
  Msg.updateOne(filter,{$set:date},function(err,docs){
    callback(err,docs)
  })
}
//删
exports.del=function(Msg,filter,callback){
  Msg.deleteOne(filter,function(err){
    callback(err)
  })
}