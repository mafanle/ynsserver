//引入需要的模块
const express = require('express')
const bodyPaser = require('body-parser')
const pool = require('./pool')
const cors = require('cors')
const app = express()

const routeruser = require('./routers/index')
//设置cor跨域
app.use(cors({
    origin:'http://localhost:8080'
}))
//配置post请求处理中间件
app.use(bodyPaser.urlencoded({
    extended:false
}))
 app.use(routeruser)

app.get('/search',function (req,res) {
    console.log(req.query);
    res.send({"code":1})
})
app.get('/my/:id',function (req,res) {
    var yid = req.params.id
 var sql = 'select usersigna from yns_user where yid=? '
    pool.query(sql,[yid],(err,result)=>{
        if (err) throw err
        res.send(result)
    })
})
app.get('/xiugai',function (req,res) {
    var qianming = req.query.qianming
    var yid = req.query.yid
    var sql ='UPDATE yns_user SET usersigna=? WHERE yid=? '
    pool.query(sql,[qianming,yid],(err,result)=>{
        if(err)throw err
        console.log(result);
        if (result.affectedRows > 0) {
            res.send('1')
        }else{
            res.send('0')
        }
        
    })
})
app.get('/huoqu',function(req,res){
    var sql ='select * from yns_trends inner join yns_user on userYid =yns_user.yid order by trendsTime DESC'
    pool.query(sql,(err,result)=>{
       res.send(result)
    })
})
//4000端口
app.listen(4000);