//引入需要的模块
const express = require('express')
const bodyPaser = require('body-parser')
const cors = require('cors')
const app = express()

//设置cor跨域
app.use(cors({
    origin:'http://localhost:8080'
}))
//配置post请求处理中间件
app.use(bodyPaser.urlencoded({
    extended:false
}))
//4000端口
app.listen(4000);