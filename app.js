//引入需要的模块
const express = require('express')
const bodyPaser = require('body-parser')
const pool = require('./pool')
const cors = require('cors')

const app = express()




var routeruser = require('./routers/index')
var routermy = require('./routers/my')
var routerupload = require('./routers/upload')
var routerjz = require('./routers/jiazai')
var routerother = require('./routers/herother')

//设置cor跨域
app.use(cors({
    origin: 'http://localhost:8080'
}))
//配置post请求处理中间件
app.use(bodyPaser.urlencoded({
    extended: false
}))
app.use(routeruser)
app.use(routermy)
app.use(routerupload)
app.use(routerjz)
app.use(routerother)
app.use(express.static('upload'))




app.get('/search', function (req, res) {
    console.log(req.query);
    res.send({
        "code": 1
    })
})
// app.get('/my/:id', function (req, res) {
//     var yid = req.params.id
//     var sql = 'select usersigna from yns_user where yid=? '
//     pool.query(sql, [yid], (err, result) => {
//         if (err) throw err
//         res.send(result)
//     })
// })
app.get('/shiyan', function (req, res) {
    var yid = '1,2'

    var sql = "select  yns_trends.tid  from yns_trends,yns_user  where userYid=yns_user.yid ; "
    pool.query(sql, (err, result) => {
        var yid = ''
        for (var key of result) {
            yid += key.yid + ','
        }
        yid = yid.substr(0, yid.length - 1);
        var sql = 'select *from yns_trends where  FIND_IN_SET(tid,?)';
         pool.query(sql,[yid],(err,result)=>{
             console.log(result);
             
         })
    })
})


//4000端口
app.listen(4000);