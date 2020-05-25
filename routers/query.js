var pool=require("../pool");
module.exports=function(sql,params){
  return new Promise(function(resolve,reject){
    pool.query(sql,params,(error,result)=>{
      if(error) reject(error);
      else resolve(result); 
    })
  })
} 