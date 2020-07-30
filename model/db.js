/**
 * @method 向数据库保持数据的方法
 * @param {Object[]} o 需要保持的数据实例对象 
 * @param {Function} callback 回调函数
 */
exports.savedate=function(o,callback){
  o.save(function(err,docs){
    callback(err,docs)
  })
}
/**
 * @method 向指定的medel查询对应的数据库的数据
 * @param {*} Msg medel的名字
 * @param {*} filter 过滤器 查询的条件
 * @param {*} callback  回调函数
 */
exports.finddate=function(Msg,filter,callback){
  Msg.find(filter,function(err,docs){
    callback(err,docs)
  })
}
