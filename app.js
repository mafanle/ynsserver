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
//4000端口
app.listen(4000);